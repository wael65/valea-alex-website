class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem("language") || "ar";
        this.init();
    }

    init() {
        this.setLanguage(this.currentLang);

        const langToggle = document.getElementById("langToggle");
        if (langToggle) {
            langToggle.addEventListener("click", () => this.toggleLanguage());
        }
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem("language", lang);

        document.documentElement.lang = lang;
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

        this.updateToggleButton();
        this.updatePageText();
    }

    toggleLanguage() {
        const nextLang = this.currentLang === "ar" ? "en" : "ar";
        this.setLanguage(nextLang);
    }

    updateToggleButton() {
        const toggle = document.getElementById("langToggle");
        if (toggle) {
            toggle.textContent = this.currentLang === "ar" ? "EN" : "AR";
        }
    }

    updatePageText() {
        document.querySelectorAll("[data-i18n]").forEach(element => {
            const key = element.getAttribute("data-i18n");
            const translated = t(key, this.currentLang);

            if (translated !== key) {
                element.textContent = translated;
            }
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
            const key = element.getAttribute("data-i18n-placeholder");
            const translated = t(key, this.currentLang);

            if (translated !== key) {
                element.setAttribute("placeholder", translated);
            }
        });

        document.querySelectorAll("[data-i18n-html]").forEach(element => {
            const key = element.getAttribute("data-i18n-html");
            const translated = t(key, this.currentLang);

            if (translated !== key) {
                element.innerHTML = translated;
            }
        });

        this.updateDocumentTitle();
    }

    updateDocumentTitle() {
        if (this.currentLang === "ar") {
            document.title = "Valea";
        } else {
            document.title = "Valea";
        }
    }
}

function slideFacilities(direction) {
    const slider = document.getElementById("facilitiesSlider");
    if (!slider) return;

    const firstCard = slider.querySelector(".facility-card");
    const cardWidth = firstCard ? firstCard.offsetWidth : 300;
    const gap = 25;
    const scrollAmount = cardWidth + gap;

    if (direction === "next") {
        slider.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
        });
    } else {
        slider.scrollBy({
            left: -scrollAmount,
            behavior: "smooth"
        });
    }
}

function initNavbarScroll() {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
}

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navLinks = document.getElementById("navLinks");

    if (!mobileMenuBtn || !navLinks) return;

    mobileMenuBtn.addEventListener("click", () => {
        mobileMenuBtn.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll("#navLinks a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenuBtn.classList.remove("active");
            navLinks.classList.remove("active");
        });
    });
}

function initContactForm() {
    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const currentLang = document.documentElement.lang || "ar";

        alert(
            currentLang === "ar"
                ? "شكراً لتواصلك معنا! سيتم التواصل معك قريباً."
                : "Thank you for contacting us! We will contact you soon."
        );

        contactForm.reset();
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 70;

                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    new LanguageManager();
    initNavbarScroll();
    initMobileMenu();
    initContactForm();
    initSmoothScroll();
});