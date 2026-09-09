import './styles/main.css';
import { fetchSiteData } from './services/api.js';
import { renderHeader, renderLoader, renderMobileNavigation } from './components/header.js';
import { renderSections } from './components/sections.js';
import { renderFooter } from './components/footer.js';
import { initializeExperience } from './features/experience.js';
import { publicPath } from './utils/paths.js';

const app = document.querySelector('#app');
let loading = false;

async function startApp() {
  if (loading) return;
  loading = true;
  app.setAttribute('aria-busy', 'true');
  app.innerHTML = `
    <div class="app-state" role="status">
      <img class="app-state-logo" src="${publicPath('images/iran-sam-logo.webp')}" alt="ایران سام" width="96" height="96">
      <p class="app-state-title">اولین روز تو در ایران سام</p>
      <span class="app-spinner" aria-hidden="true"></span>
      <p class="app-state-message">داریم در رو برات باز می‌کنیم…</p>
    </div>`;
  try {
    const data = await fetchSiteData();
    document.title = data.meta.title;
    document.querySelector('meta[name="description"]').content = data.meta.description;
    app.innerHTML = `
      ${renderLoader(data)}
      ${renderHeader(data)}
      <main id="main-content">${renderSections(data)}${renderFooter(data)}</main>
      ${renderMobileNavigation(data.navigation)}`;
    app.setAttribute('aria-busy', 'false');
    initializeExperience();
    if (window.location.hash) {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ behavior: 'auto' });
    }
  } catch (error) {
    document.body.classList.remove('loader-active');
    app.setAttribute('aria-busy', 'false');
    app.innerHTML = `
      <div class="app-state" role="alert">
        <img class="app-state-logo" src="${publicPath('images/iran-sam-logo.webp')}" alt="ایران سام" width="96" height="96">
        <h1 class="app-state-title">صفحه بارگذاری نشد.</h1>
        <p class="app-state-message">اتصال اینترنتت رو بررسی کن و دوباره تلاش کن.</p>
        <button class="button button-primary" id="retry-loading" type="button">تلاش دوباره</button>
      </div>`;
    document.getElementById('retry-loading').addEventListener('click', startApp, { once: true });
    console.error('Unable to load academy content:', error);
  } finally {
    loading = false;
  }
}

startApp();
