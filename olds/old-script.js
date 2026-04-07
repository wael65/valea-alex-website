// سكريبت إدارة اللغات والتبديل - script.js

class LanguageManager {
  constructor() {
    this.currentLang = localStorage.getItem('language') || 'ar';
    this.init();
  }

  init() {
    // تعيين اللغة الحالية
    this.setLanguage(this.currentLang);

    // تفعيل الاستماع لزر التبديل
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
      langToggle.addEventListener('click', () => this.toggleLanguage());
    }
  }

  setLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('language', lang);

    // تغيير اتجاه الصفحة
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('lang-en', lang === 'en');

    // تحديث زر التبديل
    this.updateToggleButton();

    // تحديث جميع النصوص
    this.updatePageText();
  }

  toggleLanguage() {
    const nextLang = this.currentLang === 'ar' ? 'en' : 'ar';
    this.setLanguage(nextLang);
  }

  updateToggleButton() {
    const toggle = document.getElementById('langToggle');
    if (toggle) {
      // الزر الديناميكي (يتغير حسب اللغة الحالية)
      toggle.textContent = this.currentLang === 'ar' ? 'EN' : 'AR';

      // أو إذا أردت الزر الثابت (يعرض EN دائماً)
      // toggle.textContent = 'EN';
    }
  }

  updatePageText() {
    // تحديث جميع العناصر التي لها data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = t(key, this.currentLang);
    });

    // تحديث placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      element.placeholder = t(key, this.currentLang);
    });

    // تحديث data-i18n-html (للنصوص الغنية بـ HTML)
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
      const key = element.getAttribute('data-i18n-html');
      element.innerHTML = t(key, this.currentLang);
    });
  }
}

// بدء تشغيل Language Manager عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  new LanguageManager();
});

// دالة لتحريك السلايدر (Facilities)
function slideFacilities(direction) {
  const slider = document.getElementById('facilitiesSlider');
  if (slider) {
    const cardWidth = slider.querySelector('.facility-card')?.offsetWidth || 300;
    const gap = 25;
    const scrollAmount = cardWidth + gap;
    
    if (direction === 'next') {
      slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  }
}

// التعامل مع فورم التواصل
// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.getElementById('contactForm');
//   if (form) {
//     form.addEventListener('submit', (e) => {
//       e.preventDefault();
//       const formData = new FormData(form);
//       const data = Object.fromEntries(formData);
      
//       console.log('Form Data:', data);
//       alert(t('contact.form.submit', document.documentElement.lang) + ' ✓');
//       form.reset();
//     });
//   }
// });
document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    const val = getNestedValue(translations, key); // دالة استخراج النص من JSON
    if (val) {
        el.setAttribute("placeholder", val);
    }
});

// تسهيل الـ Navbar على الأجهزة الصغيرة
// function toggleMobileMenu() {
//   const navLinks = document.querySelector('.nav-links');
//   if (navLinks) {
//     navLinks.classList.toggle('active');
//   }
// }

// Smooth scroll للروابط الداخلية
// document.addEventListener('DOMContentLoaded', () => {
//   document.querySelectorAll('a[href^="#"]').forEach(link => {
//     link.addEventListener('click', (e) => {
//       const href = link.getAttribute('href');
//       if (href !== '#') {
//         e.preventDefault();
//         const target = document.querySelector(href);
//         if (target) {
//           target.scrollIntoView({ behavior: 'smooth', block: 'start' });
//         }
//       }
//     });
//   });
// });

// إضافة scroll effect للـ Navbar
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
});


//  function slideFacilities(direction) {
//         const slider = document.getElementById('facilitiesSlider');
//         const scrollAmount = 325;

//         if (direction === 'next') {
//             slider.scrollBy({
//                 left: -scrollAmount,
//                 behavior: 'smooth'
//             });
//         } else {
//             slider.scrollBy({
//                 left: scrollAmount,
//                 behavior: 'smooth'
//             });
//         }
//     }



    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navLinks = document.getElementById("navLinks");

    mobileMenuBtn.addEventListener("click", function () {
        mobileMenuBtn.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    // إغلاق القائمة عند الضغط على أي لينك
    document.querySelectorAll("#navLinks a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenuBtn.classList.remove("active");
            navLinks.classList.remove("active");
        });
    });

