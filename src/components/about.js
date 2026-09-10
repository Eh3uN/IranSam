import { escapeHtml as e, highlightBrand } from "../utils/html.js";
import { publicPath } from "../utils/paths.js";

const closeIcon =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6"/></svg>';

export function renderAbout({ about, brand }) {
  return `
    <dialog class="contact-panel about-panel" id="about-panel" aria-labelledby="about-heading" aria-describedby="about-lead">
      <div class="about-panel-header">
        <div class="about-panel-brand">
          <img src="${e(publicPath(brand.logo))}" alt="" width="56" height="56">
          <div>
            <p>${highlightBrand(about.eyebrow)}</p>
            <h2 id="about-heading">${highlightBrand(about.title)}</h2>
          </div>
        </div>
        <button class="contact-close" type="button" aria-label="بستن دربارهٔ ایران سام" autofocus>${closeIcon}</button>
      </div>
      <div class="about-panel-body contact-panel-body">
        <p class="about-lead" id="about-lead">${highlightBrand(about.lead)}</p>
        <section class="about-profile" aria-labelledby="about-profile-heading">
          <div class="about-profile-heading">
            <span class="about-profile-mark" aria-hidden="true"><img
  class="rounded-full"
  src="${e(publicPath("images/Hesam.jpg"))}"
  alt="محمد حسام خدابنده، مدیر آکادمی فوتبال ایران سام"
  width="96"
  height="96"
  loading="lazy"
/>
</span>
            <div><p>${e(about.profile.role)}</p><h3 id="about-profile-heading">${e(about.profile.name)}</h3></div>
          </div>
          <p class="about-profile-description">${e(about.profile.description)}</p>
          <ul class="about-credentials">
            ${about.profile.credentials.map((credential) => `<li>${e(credential)}</li>`).join("")}
          </ul>
        </section>
        <div class="about-pillars" aria-label="اصول مسیر ایران سام">
          ${about.highlights
            .map(
              (item, index) => `
            <article class="about-pillar">
              <span class="about-pillar-index" dir="ltr">${String(index + 1).padStart(2, "0")}</span>
              <h3>${highlightBrand(item.title)}</h3>
              <p>${highlightBrand(item.description)}</p>
            </article>`,
            )
            .join("")}
        </div>
        <div class="about-copy">
          ${about.paragraphs.map((paragraph) => `<p>${highlightBrand(paragraph)}</p>`).join("")}
        </div>
        <div class="about-panel-footer">
          <p>${highlightBrand(about.closing)}</p>
          <span class="about-signature">${e(brand.name)} <span aria-hidden="true">/</span> از اولین سؤال تا اولین قدم.</span>
        </div>
      </div>
    </dialog>`;
}
