// Données de traduction
const translations = {
  ar: {
    welcome: "مرحبًا بكم في موقع رمضان",
    categories_title: "فئات متنوعة",
    categories: {
      quran: "شيوخ يتلون القرآن بشكل جميل",
      algerian_reciters: "قراء جزائريون",
      recipes: "فئات متنوعة",
      mecca_live: "بث مباشر من مكة المكرمة"
    }
  },
  fr: {
    welcome: "Bienvenue sur le site de Ramadan",
    categories_title: "Catégories variées",
    categories: {
      quran: "Cheikhs qui lisent bien le Coran",
      algerian_reciters: "Récitateurs algériens",
      recipes: "Catégories variées",
      mecca_live: "La Mecque en direct"
    }
  }
};

// Fonction pour changer la langue
function changeLanguage(lang) {
  document.querySelector("html").setAttribute("lang", lang);
  document.querySelector("html").setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

  const elementsToTranslate = {
    "#header-title": "welcome",
    "#categories-title": "categories_title",
    ".category h3": "categories"
  };

  for (const [selector, key] of Object.entries(elementsToTranslate)) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
      if (element) {
        const translationKey = Object.keys(translations[lang].categories)[index];
        element.textContent = translations[lang].categories[translationKey];
      }
    });
  }
}

// Initialiser la langue par défaut (arabe)
changeLanguage("ar");
