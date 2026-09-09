export function initializeExperience() {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const loader = document.getElementById('arrival-loader');
  const heroImage = document.getElementById('hero-image');
  const loaderProgress = document.getElementById('loader-progress');
  let hasVisited = false;
  try { hasVisited = sessionStorage.getItem('iran-sam-visited') === '1'; } catch (_) { /* Optional storage. */ }
  const showLoader = !hasVisited && !reducedMotion && !window.location.hash && heroImage && !heroImage.complete;
  if (showLoader) {
    loader.hidden = false;
    document.body.classList.add('loader-active');
    loaderProgress.style.width = '25%';
    const previousFocus = document.activeElement;
    const skipButton = document.getElementById('skip-loader');
    let dismissed = false;
    let maxWait;
    const finishLoading = () => {
      if (dismissed) return;
      dismissed = true;
      window.clearTimeout(maxWait);
      loaderProgress.style.width = '100%';
      document.body.classList.remove('loader-active');
      loader.classList.add('is-done');
      if (document.activeElement === skipButton) {
        document.querySelector('.hero-copy .button')?.focus({ preventScroll: true });
      }
      window.setTimeout(() => { loader.hidden = true; }, 420);
      try { sessionStorage.setItem('iran-sam-visited', '1'); } catch (_) { /* Optional preference. */ }
    };
    // Follow image readiness. Never impose a long simulated wait.
    heroImage.addEventListener('load', finishLoading, { once: true });
    heroImage.addEventListener('error', finishLoading, { once: true });
    skipButton.addEventListener('click', finishLoading, { once: true });
    loader.addEventListener('keydown', event => {
      if (event.key === 'Escape') finishLoading();
      if (event.key === 'Tab') { event.preventDefault(); skipButton.focus(); }
    });
    if (previousFocus === document.body) skipButton.focus({ preventScroll: true });
    maxWait = window.setTimeout(finishLoading, 2600);
    if (heroImage.complete) finishLoading();
  }
  const scenes = [...document.querySelectorAll('[data-scene]')];
  const links = [...document.querySelectorAll('[data-chapter]')];
  const progress = document.getElementById('journey-progress');
  let framePending = false;
  function updateJourney() {
    const focusLine = window.scrollY + window.innerHeight * 0.46;
    let active = scenes[0]?.id;
    for (const scene of scenes) if (scene.offsetTop <= focusLine) active = scene.id;
    for (const link of links) {
      const selected = link.dataset.chapter === active;
      link.classList.toggle('is-active', selected);
      if (selected) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = `${scrollable > 0 ? Math.min(100, Math.max(0, window.scrollY / scrollable * 100)) : 100}%`;
    framePending = false;
  }
  function scheduleUpdate() {
    if (framePending) return;
    framePending = true;
    window.requestAnimationFrame(updateJourney);
  }
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate, { passive: true });
  window.addEventListener('load', scheduleUpdate, { once: true });
  updateJourney();

  if (!reducedMotion && 'IntersectionObserver' in window) {
    const reveal = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('scene-entered');
        reveal.unobserve(entry.target);
      }
    }, { threshold: 0.12 });
    for (const scene of scenes.slice(1)) reveal.observe(scene);
  }

  // Native details remain usable even with JavaScript disabled.
  const drills = [...document.querySelectorAll('.drill-list details')];
  for (const detail of drills) {
    detail.addEventListener('toggle', () => {
      if (detail.open) for (const other of drills) if (other !== detail) other.open = false;
      scheduleUpdate();
    });
  }
}
