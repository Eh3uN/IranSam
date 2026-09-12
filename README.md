# Iran Sam Football Academy

### وب‌سایت معرفی آکادمی فوتبال ایران سام

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-ff7800?style=flat-square)](https://eh3un.github.io/IranSam/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-f7df1e?style=flat-square&logo=javascript&logoColor=111827)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

> A cinematic, RTL-first, single-page experience for Iran Sam Football Academy — designed to turn a QR scan into a guided journey from the academy entrance to the player’s next step.

**[مشاهدهٔ دمو / View Live Demo](https://eh3un.github.io/IranSam/)** · **[مخزن GitHub / Repository](https://github.com/Eh3uN/IranSam)**

---

## فارسی

### معرفی پروژه

ایران سام یک وب‌سایت معرفی تک‌صفحه‌ای برای آکادمی فوتبال ایران سام است؛ با هدف تبدیل یک صفحهٔ معرفی معمولی به تجربه‌ای داستان‌محور و قابل‌تعامل.

کاربر از طریق QR Code وارد یک مسیر هدایت‌شده می‌شود: ابتدا صفحهٔ لودینگ و شروع داستان را می‌بیند، سپس وارد فضای آکادمی، رختکن و سالن تمرین می‌شود و در ادامه با برنامهٔ رشد، امکانات، کارنامهٔ پیشرفت، معرفی آکادمی و راه‌های ارتباطی آشنا می‌شود.

این پروژه برای ردهٔ سنی **۵ تا ۱۸ سال** طراحی شده و هویت بصری آن بر پایهٔ ترکیب **سرمه‌ای، نارنجی و سفید** شکل گرفته است.

### ارزش پروژه برای رزومه

این پروژه نمونه‌ای از تبدیل یک بریف واقعی کارفرما به یک تجربهٔ دیجیتال کامل است و مهارت‌های زیر را نشان می‌دهد:

- طراحی و پیاده‌سازی یک landing page مشتری‌محور با روایت بصری مشخص
- ساخت تجربهٔ RTL و فارسی با تمرکز بر خوانایی و واکنش‌گرایی
- تبدیل محتوای ثابت به ساختار داده‌محور با JSON و Fetch API
- طراحی صحنه‌های مستقل برای دسکتاپ و موبایل
- پیاده‌سازی لودینگ، ناوبری مرحله‌ای، وضعیت پیشرفت اسکرول و تعامل‌های صفحه
- ساخت پنل‌های شناور برای ارتباط، پرسش‌های متداول و معرفی آکادمی
- آماده‌سازی workflow انتشار خودکار روی GitHub Pages

### مسیر تجربهٔ کاربر

| مرحله | توضیح |
| --- | --- |
| لودینگ | ورود از QR Code با یک شروع کوتاه و کنجکاوکننده |
| شروع داستان | معرفی هویت ایران سام و دعوت کاربر به ورود |
| ورودی آکادمی | ادامهٔ روایت با CTAهای مرحله‌ای |
| رختکن | معرفی کیت‌های سرمه‌ای، نارنجی و سفید و آماده‌شدن برای تمرین |
| سالن فوتسال | نمایش فضای تمرین و معرفی محورهای آموزشی |
| مسیر رشد | ارائهٔ مسیر جامع آموزش و امکانات همراه بازیکن |
| کارنامهٔ پیشرفت | توضیح شیوهٔ قابل‌مشاهده‌کردن رشد بازیکن |
| دربارهٔ ایران سام | معرفی آکادمی، مدیریت و نگاه آموزشی مجموعه |
| ارتباط و پرسش‌های متداول | هدایت خانواده به گفت‌وگوی مستقیم و حضوری |

### قابلیت‌های کلیدی

- رابط کاملاً فارسی و راست‌به‌چپ
- طراحی واکنش‌گرا برای موبایل، تبلت و دسکتاپ
- تصویر پس‌زمینهٔ مستقل برای نسخهٔ موبایل و دسکتاپ
- لایه‌های تیرهٔ جداگانه برای حفظ کنتراست متن روی تصاویر
- لودینگ اولیه با امکان ورود مستقیم و پشتیبانی از `prefers-reduced-motion`
- ناوبری مرحله‌ای با نشانگر بخش فعال و progress bar اسکرول
- رندر محتوای صفحه از فایل محلی `public/data/site.json`
- پنل‌های `dialog` برای ارتباط و پرسش‌های متداول با بستن از طریق دکمه، Escape و کلیک بیرون پنل
- لینک مستقیم تماس تلفنی و WhatsApp بدون نیاز به بک‌اند
- فونت فارسی محلی و توکن‌های رنگی یکپارچه برای هویت برند
- بررسی ساختار پروژه، تصاویر و لینک‌ها با اسکریپت‌های داخلی

### تکنولوژی‌ها

| تکنولوژی | کاربرد |
| --- | --- |
| HTML5 | ساختار معنایی صفحه و محتوای فارسی |
| CSS3 | طراحی صحنه‌ها، لایه‌های تصویری، انیمیشن و واکنش‌گرایی |
| Tailwind CSS 4 | توکن‌های طراحی و کلاس‌های پایهٔ رابط |
| Vanilla JavaScript | رندر کامپوننت‌ها و مدیریت تعامل‌ها |
| Fetch API | دریافت و اعتبارسنجی محتوای `site.json` |
| Vite | محیط توسعه، build و آماده‌سازی خروجی استاتیک |
| GitHub Actions | build و انتشار خودکار روی GitHub Pages |

این پروژه به‌صورت استاتیک اجرا می‌شود و به بک‌اند، دیتابیس، CMS یا کلید API نیاز ندارد.

### ساختار اصلی پروژه

```text
iran-sam-vite/
├── public/
│   ├── data/site.json          # متن‌ها، ناوبری و تنظیمات تجربه
│   └── images/                 # لوگو و تصاویر موبایل، دسکتاپ و مسیر رشد
├── src/
│   ├── components/             # header، صحنه‌ها، footer، درباره و تماس
│   ├── features/               # رفتار لودینگ، اسکرول و پنل‌های شناور
│   ├── services/               # Fetch و اعتبارسنجی داده‌ها
│   ├── styles/                 # Tailwind و استایل‌های اختصاصی پروژه
│   ├── utils/                  # مسیر فایل‌ها و توابع کمکی
│   └── main.js                 # نقطهٔ ورود برنامه
├── scripts/                    # اسکریپت‌های بررسی پروژه
├── docs/                       # یادداشت‌های پروژه و پرامپت تصاویر
├── index.html
├── vite.config.js
└── package.json
```

### اجرای محلی

به Node.js نسخهٔ ۲۲.۱۲ یا بالاتر نیاز است؛ Node.js 24 برای این پروژه پیشنهاد می‌شود.

```bash
npm install
npm run dev
```

برای نصب دقیق نسخه‌های ثبت‌شده در lockfile:

```bash
npm ci
```

### بررسی و build

```bash
npm run check
npm run build
npm run preview
```

دستور `npm run check` محتوای صفحه، همهٔ تصاویر و مقصدهای دسترس‌پذیری، اعتبارسنجی داده‌های ناقص، لینک‌های ارتباطی و رفتار اسکرول را بررسی می‌کند. همین مجموعه بررسی‌ها پیش از انتشار خودکار اجرا می‌شود.

خروجی قابل انتشار داخل پوشهٔ `dist/` ساخته می‌شود. بازکردن مستقیم `index.html` با دوبار کلیک توصیه نمی‌شود؛ زیرا داده‌ها با JavaScript و Fetch API بارگذاری می‌شوند.

### انتشار

انتشار پروژه با GitHub Actions انجام می‌شود. پس از push روی شاخهٔ `main`، workflow پروژه نصب وابستگی‌ها، بررسی، build و انتشار پوشهٔ `dist/` را انجام می‌دهد.

برای انتقال به هاست استاتیک دیگر، کافی است بعد از اجرای `npm run build` محتویات پوشهٔ `dist/` را در ریشهٔ هاست، معمولاً `public_html`، قرار دهید.

### یادداشت طراحی

تصاویر محیط و صحنه‌های تمرین برای ساخت فضای بصری پروژه تولید و بازسازی شده‌اند و لزوماً عکس مستند از امکانات واقعی آکادمی نیستند. زمان و محل دقیق تمرین عمداً در سایت نمایش داده نمی‌شود تا جزئیات در گفت‌وگوی مستقیم با خانواده بررسی شود.

---

## English

### Project Overview

Iran Sam is a client-facing, single-page introduction website for Iran Sam Football Academy. The goal was to replace a conventional informational page with a guided, story-driven digital experience.

Visitors arrive through a QR Code and move through a sequence of visual chapters: an opening loader, the academy entrance, the locker room, the futsal training hall, the player-development journey, the progress report, the academy profile, and direct contact panels.

The experience is designed for players aged **5–18** and uses a focused brand system built around **navy, orange and white**.

### Portfolio Highlights

- Translated a real client brief into a complete narrative landing-page experience
- Built an RTL-first Persian interface with responsive behavior across screen sizes
- Separated content from presentation with local JSON data and the Fetch API
- Created independent mobile and desktop image compositions
- Implemented loading, chapter navigation, scroll progress and interactive panels
- Added contact, WhatsApp and FAQ flows without introducing a backend
- Prepared an automated GitHub Pages deployment workflow
- Organized the project as maintainable, reusable Vanilla JavaScript modules

### User Journey

| Chapter | Purpose |
| --- | --- |
| Loading | A short, branded entry state triggered by the QR journey |
| Story opening | Introduces Iran Sam and invites the visitor inside |
| Academy entrance | Extends the narrative through guided calls to action |
| Locker room | Presents the navy, orange and white kits |
| Futsal training hall | Introduces the training environment and learning focus |
| Development journey | Maps the broader player-development path and supporting facilities |
| Progress report | Explains how player growth becomes visible and understandable |
| About Iran Sam | Presents the academy, its management and educational perspective |
| Contact and FAQ | Encourages direct conversation with the player’s family |

### Technical Stack

- **HTML5** — semantic page structure and Persian content
- **CSS3** — scenes, image overlays, animation and responsive layout
- **Tailwind CSS 4** — design tokens and shared utility styles
- **Vanilla JavaScript** — rendering, navigation and interaction logic
- **Fetch API** — loading and validating `public/data/site.json`
- **Vite** — local development and static production builds
- **GitHub Actions** — automated build and GitHub Pages deployment

The site is fully static: it does not require a backend, database, CMS or API key.

### Project Structure

```text
iran-sam-vite/
├── public/
│   ├── data/site.json          # Content, navigation and experience settings
│   └── images/                 # Logo, scene images and development journey assets
├── src/
│   ├── components/             # Header, scenes, footer, about and contact UI
│   ├── features/               # Loading, scroll behavior and floating panels
│   ├── services/               # Fetch and content validation
│   ├── styles/                 # Tailwind entry and project-specific CSS
│   ├── utils/                  # Path helpers and shared utilities
│   └── main.js                 # Application entry point
├── scripts/                    # Project validation scripts
├── docs/                       # Project notes and image prompts
├── index.html
├── vite.config.js
└── package.json
```

### Getting Started

Requires Node.js **22.12+**. Node.js 24 is recommended for this project.

```bash
npm install
npm run dev
```

For a clean lockfile-based installation:

```bash
npm ci
```

### Validation and Build

```bash
npm run check
npm run build
npm run preview
```

`npm run check` verifies rendered content, all image assets and accessibility references, malformed content rejection, contact links, and scroll behavior. The deployment workflow runs the same complete suite before publishing.

The production-ready output is generated in `dist/`. Use Vite or another local server instead of opening `index.html` directly, because the application loads its content through JavaScript and the Fetch API.

### Deployment

The repository includes a GitHub Actions workflow that installs dependencies, validates the project, builds `dist/` and publishes it to GitHub Pages whenever the `main` branch is updated.

The same `dist/` output can be uploaded to any static host. For a cPanel-based host, upload the contents of `dist/` directly into the document root, usually `public_html`.

### Design Notes

The visual direction uses a dark, premium football identity with navy, orange and white as the core colors. Background scenes are conceptually produced for the experience and should not be interpreted as documentary photographs of the academy’s real facilities. Training time and location are intentionally kept for direct conversation with families.

### Demo

**Live website:** [eh3un.github.io/IranSam](https://eh3un.github.io/IranSam/)

### Project Role

**Design direction · Front-end implementation · Responsive UI · Interaction design · GitHub Pages deployment**

---

## Official References

- [Vite Documentation](https://vite.dev/guide/)
- [Tailwind CSS with Vite](https://tailwindcss.com/docs/installation/using-vite)
- [Vite Static Deployment](https://vite.dev/guide/static-deploy.html)
- [GitHub Pages Custom Workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
