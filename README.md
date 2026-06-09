# ◈ Prime Real Estate | برايم للعقارات

<div align="center">

![Prime Real Estate](https://img.shields.io/badge/Prime-Real%20Estate-B8952A?style=for-the-badge&logo=home&logoColor=white)
![Version](https://img.shields.io/badge/version-1.0.0-8A6F1E?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-1a8a3a?style=for-the-badge)
![Status](https://img.shields.io/badge/status-Production%20Ready-c0392b?style=for-the-badge)

**موقع عقارات فاخر ثنائي اللغة | Luxury Bilingual Real Estate Website**

[🌐 عرض الموقع](https://primerealestate.com) · [📖 Documentation](#) · [🐛 Report Bug](../../issues) · [✨ Request Feature](../../issues)

</div>

---

## 🌍 Overview | نظرة عامة

**Prime Real Estate** is a premium, fully responsive bilingual (Arabic/English) real estate website designed for luxury property showcasing. Built with modern web technologies, it delivers an exceptional user experience with smooth animations, interactive property filtering, and seamless language switching.

**برايم للعقارات** هو موقع عقارات فاخر ومتجاوب بالكامل، ثنائي اللغة (العربية/الإنجليزية)، مصمم لعرض العقارات الفاخرة. مبني بأحدث تقنيات الويب، يقدم تجربة مستخدم استثنائية مع رسوم متحركة سلسة، وتصفية عقارات تفاعلية، وتبديل لغة سلس.

---

## ✨ Features | المميزات

### 🎨 Design & UI | التصميم والواجهة
- **Bilingual Support** — Full Arabic/English switching with RTL/LTR layout adaptation
- **Dark Luxury Theme** — Elegant black & gold color palette inspired by premium real estate branding
- **Fully Responsive** — Optimized for all devices from mobile to desktop
- **Smooth Animations** — Scroll-triggered reveals, parallax effects, and micro-interactions
- **Custom Cursor Glow** — Desktop-only golden cursor trail effect
- **Canvas Particles** — Subtle animated gold particles in hero section

### 🏠 Property Features | مميزات العقارات
- **Advanced Search** — Filter by city, type, price range, and bedrooms
- **Property Filtering** — Tab-based filtering (All, Apartments, Villas, Penthouses)
- **Favorite System** — Heart toggle for saving preferred properties
- **Property Cards** — Rich cards with images, pricing, location, and metadata
- **Interactive Details** — Click-to-view property summary with alert modal

### 🛠️ Technical Features | المميزات التقنية
- **Intersection Observer API** — Performance-optimized scroll animations
- **Animated Counters** — Number counting animation on scroll
- **Testimonials Slider** — Touch-enabled carousel with autoplay
- **Contact Form** — Real-time validation with bilingual error messages
- **Google Maps Integration** — Embedded location map
- **Schema.org Structured Data** — SEO-optimized JSON-LD markup
- **Open Graph & Twitter Cards** — Social media optimization

---

## 🚀 Tech Stack | التقنيات المستخدمة

| Category | Technology |
|----------|------------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| **Styling** | CSS Custom Properties, Flexbox, CSS Grid |
| **Fonts** | Playfair Display, Tajawal, Cormorant Garamond |
| **Icons** | Font Awesome 6.5 |
| **Images** | Unsplash API (high-quality property photos) |
| **Maps** | Google Maps Embed API |
| **Storage** | LocalStorage (language preference) |

---

## 📁 Project Structure | هيكل المشروع

```
prime-real-estate/
│
├── 📄 index.html          # Main HTML structure (Arabic default, RTL)
├── 📄 style.css           # Complete stylesheet with CSS variables
├── 📄 script.js           # All JavaScript functionality
│
├── 📁 assets/             # Static assets (if added later)
│   ├── images/
│   ├── fonts/
│   └── icons/
│
├── 📄 README.md           # Project documentation
├── 📄 LICENSE             # MIT License
└── 📄 .gitignore          # Git ignore rules
```

---

## 🎯 Sections | الأقسام

| Section | Description | File |
|---------|-------------|------|
| **Header** | Fixed navigation with language toggle & mobile menu | `index.html` |
| **Hero** | Full-screen hero with parallax background & stats | `index.html` |
| **Search** | Advanced property search form with tabs | `index.html` |
| **Properties** | Filterable property grid with 6 luxury listings | `index.html` |
| **About** | Company story with overlapping images & experience badge | `index.html` |
| **Counters** | Animated statistics strip (500+ properties, 2000+ clients) | `index.html` |
| **Services** | 6 service cards with hover effects | `index.html` |
| **Testimonials** | Client reviews slider with touch support | `index.html` |
| **Contact** | Bilingual contact form with validation | `index.html` |
| **Map** | Embedded Google Maps location | `index.html` |
| **Footer** | Multi-column footer with social links | `index.html` |

---

## 🛠️ Installation | التثبيت

### Prerequisites | المتطلبات
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local server (recommended for full functionality)

### Quick Start | البدء السريع

```bash
# Clone the repository
$ git clone https://github.com/yourusername/prime-real-estate.git

# Navigate to project directory
$ cd prime-real-estate

# Open with live server (VS Code extension)
# OR simply open index.html in your browser
```

### Deployment | النشر

The project is static and can be deployed on any platform:

```bash
# Deploy to Netlify
drag & drop folder to https://app.netlify.com/drop

# Deploy to Vercel
$ npx vercel --prod

# Deploy to GitHub Pages
# Go to Settings → Pages → Select branch
```

---

## 🎨 Customization | التخصيص

### Color Palette | لوحة الألوان

```css
:root {
  --gold: #B8952A;           /* Primary brand color */
  --gold-light: #D4AF58;     /* Hover states */
  --gold-dark: #8A6F1E;      /* Active states */
  --dark: #0D0D0D;           /* Primary background */
  --dark-2: #161616;         /* Secondary background */
  --light: #F5F0E8;          /* Light sections */
  --white: #FFFFFF;          /* Text on dark */
}
```

### Adding New Properties | إضافة عقارات جديدة

```html
<div class="prop-card" data-type="villa">
  <div class="prop-img-wrap">
    <img src="your-image-url" alt="Property" loading="lazy"/>
    <div class="prop-badge">Featured</div>
    <button class="prop-fav">♡</button>
  </div>
  <div class="prop-body">
    <div class="prop-price">
      <span class="price-num">5,000,000</span>
      <span class="price-cur">SAR</span>
    </div>
    <h3 class="prop-name">Property Name</h3>
    <!-- ... -->
  </div>
</div>
```

---

## 📱 Responsive Breakpoints | نقاط التوقف

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| **Desktop** | > 1100px | 3-column grid, full navigation |
| **Tablet** | 900-1100px | 2-column grid, simplified layout |
| **Mobile** | 768-900px | Single column, hamburger menu |
| **Small** | < 480px | Compact cards, stacked counters |

---

## 🔍 SEO & Performance | تحسين محركات البحث

- ✅ Semantic HTML5 structure
- ✅ Schema.org RealEstateAgent structured data
- ✅ Open Graph & Twitter Card meta tags
- ✅ Lazy loading images (`loading="lazy"`)
- ✅ CSS custom properties for maintainability
- ✅ Intersection Observer for efficient animations
- ✅ LocalStorage for language persistence
- ✅ Responsive images with `srcset` ready

---

## 🌐 Language System | نظام اللغة

The website supports seamless Arabic/English switching:

```javascript
// Language toggle functionality
function applyLanguage(lang) {
  const isAr = lang === 'ar';
  document.documentElement.dir = isAr ? 'rtl' : 'ltr';
  document.documentElement.lang = isAr ? 'ar' : 'en';

  // Translate all data-ar / data-en elements
  document.querySelectorAll('[data-ar]').forEach(el => {
    el.textContent = isAr ? el.dataset.ar : el.dataset.en;
  });
}
```

---

## 🤝 Contributing | المساهمة

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License | الترخيص

Distributed under the MIT License. See `LICENSE` for more information.

```
MIT License

Copyright (c) 2024 Prime Real Estate | برايم للعقارات

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 📞 Contact | تواصل معنا

**Prime Real Estate | برايم للعقارات**

- 📍 King Fahd Road, Kingdom Tower, Riyadh, Saudi Arabia
- 📞 +966 11 000 0000
- 📧 info@primerealestate.com
- 🌐 [www.primerealestate.com](https://primerealestate.com)

---

<div align="center">

**Made with ❤️ in Riyadh | صُنع بحب في الرياض**

[⬆ Back to Top](#-prime-real-estate--برايم-للعقارات)

</div>
