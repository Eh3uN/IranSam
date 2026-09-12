import assert from 'node:assert/strict';
import { initializeExperience } from '../src/features/experience.js';

// Small DOM doubles exercise the real event handlers without a browser dependency.
const operations = [];
const frames = [];
const events = new Map();
const chapters = ['intro', 'training', 'progress'];
const offsets = [0, 1000, 2000];
let pageHeight = 3000;
const scenes = chapters.map((id, index) => ({
  id,
  get offsetTop() { operations.push('read'); return offsets[index]; },
}));
const links = [...chapters, ...chapters].map(chapter => ({
  dataset: { chapter },
  current: false,
  attributes: new Map(),
  classList: {
    toggle(name, selected) { operations.push('navigation'); this.owner.current = selected; },
  },
  setAttribute(name, value) { operations.push('navigation'); this.attributes.set(name, value); },
  removeAttribute(name) { operations.push('navigation'); this.attributes.delete(name); },
}));
for (const link of links) link.classList.owner = link;
const progress = { style: {
  set transform(value) { operations.push('progress'); this.value = value; },
} };
const drills = [true, false].map(open => ({
  open,
  addEventListener(type, handler) { this[type] = handler; },
}));

const originalGlobals = Object.fromEntries(['window', 'document', 'sessionStorage'].map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
try {
  globalThis.window = {
    scrollY: 0,
    innerHeight: 500,
    location: { hash: '' },
    matchMedia: () => ({ matches: true }),
    addEventListener: (type, handler) => events.set(type, handler),
    requestAnimationFrame: handler => frames.push(handler),
  };
  globalThis.document = {
    getElementById: id => id === 'journey-progress' ? progress : null,
    querySelectorAll: selector => ({ '[data-scene]': scenes, '[data-chapter]': links, '.drill-list details': drills })[selector],
    documentElement: { get scrollHeight() { operations.push('read'); return pageHeight; } },
  };
  globalThis.sessionStorage = { getItem: () => '1' };

  function assertActive(chapter) {
    for (const link of links) {
      assert.equal(link.current, link.dataset.chapter === chapter);
      assert.equal(link.attributes.get('aria-current'), link.current ? 'location' : undefined);
    }
  }
  function flushFrame() {
    assert.equal(frames.length, 1, 'Events before a repaint must share one animation frame');
    operations.length = 0;
    frames.shift()();
    const firstWrite = operations.findIndex(operation => operation !== 'read');
    if (firstWrite !== -1) assert.ok(!operations.slice(firstWrite).includes('read'), 'Layout reads must precede DOM writes');
  }

  initializeExperience();
  assertActive('intro');
  assert.equal(progress.style.value, 'scaleX(0)');

  window.scrollY = 100;
  events.get('scroll')();
  events.get('scroll')();
  events.get('resize')();
  flushFrame();
  assert.equal(progress.style.value, 'scaleX(0.04)');
  assert.ok(!operations.includes('navigation'), 'Scrolling within a chapter must not rewrite navigation');

  window.scrollY = 900;
  events.get('scroll')();
  flushFrame();
  assertActive('training');
  assert.equal(progress.style.value, 'scaleX(0.36)');

  events.get('resize')();
  flushFrame();
  assert.ok(operations.every(operation => operation === 'read'), 'Unchanged state must not rewrite DOM');

  // Reflow (for example after an accordion opens) must use current section offsets.
  offsets[1] = 1500;
  drills[1].open = true;
  drills[1].toggle();
  assert.equal(drills[0].open, false, 'Opening another drill must close the previous drill');
  flushFrame();
  assertActive('intro');

  window.scrollY = 4000;
  events.get('scroll')();
  flushFrame();
  assertActive('progress');
  assert.equal(progress.style.value, 'scaleX(1)', 'Overscroll must not exceed full progress');

  window.scrollY = -100;
  events.get('scroll')();
  flushFrame();
  assertActive('intro');
  assert.equal(progress.style.value, 'scaleX(0)', 'Negative overscroll must not reverse progress');

  pageHeight = window.innerHeight;
  events.get('resize')();
  flushFrame();
  assert.equal(progress.style.value, 'scaleX(1)', 'A non-scrollable page must show complete progress');
} finally {
  for (const [key, descriptor] of Object.entries(originalGlobals)) {
    if (descriptor) Object.defineProperty(globalThis, key, descriptor);
    else delete globalThis[key];
  }
}

console.log('Journey chapter tracking, scroll batching, progress bounds and accordion checks passed.');
