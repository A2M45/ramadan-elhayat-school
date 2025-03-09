// Données de traduction
const translations = {
  ar: {
    // Général
    headerTitle: "مرحبًا بكم في مدرسة الحياة",
    footerText: "© 2025 موقع رمضان. جميع الحقوق محفوظة. Abdalmalik Dahane",

    // Navigation
    navHome: "الرئيسية",
    navPrayerTimes: "أوقات الصلاة",
    navMosques: "المساجد",
    navAdvice: "نصائح رمضانية",
    navRecipes: "فئات متنوعة",
    navContact: "اتصل بنا",

    // Page d'accueil (index.html)
    homeTitle: "رمضان كريم",
    homeDescription: "موقع شامل لكل ما يتعلق برمضان في وهران.",

    // Page des conseils (advice.html)
    adviceTitle: "نصائح رمضانية",
    adviceDescription: "نصائح مفيدة لصيام صحي ومثمر.",
    ramadanAdvice: [
      "١. حدد نواياك الروحية وكن مستعدًا لتحقيق أهدافك في هذا الشهر الكريم.",
      "٢. تناول وجبة السحور المتوازنة وتجنب الأطعمة الدسمة على الإفطار.",
      "٣. اقرأ القرآن بانتظام وحاول ختمه خلال الشهر.",
      "٤. تصدق ومساعدة المحتاجين، سواء بالمال أو الوقت.",
      "٥. تحكم في غضبك وتجنب الغيبة والنميمة.",
      "٦. استغل العشر الأواخر للاجتهاد في العبادة والبحث عن ليلة القدر.",
      "٧. نم جيدًا ومارس نشاطًا بدنيًا خفيفًا للحفاظ على طاقتك.",
      "٨. خطط ليومك لتوازن بين العمل والعبادة والراحة.",
      "٩. شارك في صلاة الجماعة واقضِ وقتًا مع عائلتك وأصدقائك.",
      "١٠. بعد رمضان، حافظ على العادات الجيدة التي اكتسبتها."
    ]
  },
  fr: {
    // Général
    headerTitle: "Bienvenue à ELHAYAT-SCHOOL",
    footerText: "© 2025 Site Ramadan. Tous droits réservés. Abdalmalik Dahane",

    // Navigation
    navHome: "Accueil",
    navPrayerTimes: "Heures de prière",
    navMosques: "Mosquées",
    navAdvice: "Conseils",
    navRecipes: "Catégories variées",
    navContact: "Contact",

    // Page d'accueil (index.html)
    homeTitle: "Ramadan Mubarak",
    homeDescription: "Site complet sur le Ramadan à Oran.",

    // Page des conseils (advice.html)
    adviceTitle: "Conseils pour le Ramadan",
    adviceDescription: "Conseils utiles pour un jeûne sain et productif.",
    ramadanAdvice: [
      "1. Fixez des intentions spirituelles et soyez prêt à atteindre vos objectifs ce mois sacré.",
      "2. Prenez un Suhoor équilibré et évitez les aliments gras à l'Iftar.",
      "3. Lisez le Coran régulièrement et essayez de le terminer pendant le mois.",
      "4. Faites la charité et aidez les nécessiteux, que ce soit par de l'argent ou du temps.",
      "5. Contrôlez votre colère et évitez les commérages et les mensonges.",
      "6. Profitez des dix derniers jours pour intensifier vos prières et rechercher la Nuit du Destin.",
      "7. Dormez suffisamment et faites de l'exercice léger pour maintenir votre énergie.",
      "8. Planifiez votre journée pour équilibrer travail, adoration et repos.",
      "9. Participez aux prières en groupe et passez du temps avec votre famille et vos amis.",
      "10. Après le Ramadan, maintenez les bonnes habitudes que vous avez acquises."
    ]
  }
};

// Fonction pour charger les conseils
function loadAdvice(lang) {
  const ramadanAdviceList = document.getElementById("ramadan-advice-list");
  if (ramadanAdviceList) {
    ramadanAdviceList.innerHTML = ""; // Effacer la liste actuelle
    translations[lang].ramadanAdvice.forEach(advice => {
      const li = document.createElement("li");
      li.textContent = advice;
      ramadanAdviceList.appendChild(li);
    });
  }
}

// Fonction pour changer la langue
function changeLanguage(lang) {
  // Changer la langue et la direction du document
  const htmlElement = document.querySelector("html");
  htmlElement.setAttribute("lang", lang);
  htmlElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

  // Traduire les éléments communs
  translateElement("header-title", translations[lang].headerTitle);
  translateElement("footer-text", translations[lang].footerText);

  // Traduire la navigation
  translateElement("nav-home", translations[lang].navHome);
  translateElement("nav-prayer-times", translations[lang].navPrayerTimes);
  translateElement("nav-mosques", translations[lang].navMosques);
  translateElement("nav-advice", translations[lang].navAdvice);
  translateElement("nav-recipes", translations[lang].navRecipes);
  translateElement("nav-contact", translations[lang].navContact);

  // Traduire les éléments spécifiques à chaque page
  const pageTitle = document.title;
  if (pageTitle.includes("الرئيسية") || pageTitle.includes("Accueil")) {
    // Page d'accueil (index.html)
    translateElement("home-title", translations[lang].homeTitle);
    translateElement("home-description", translations[lang].homeDescription);
  } else if (pageTitle.includes("نصائح رمضانية") || pageTitle.includes("Conseils")) {
    // Page des conseils (advice.html)
    translateElement("advice-title", translations[lang].adviceTitle);
    translateElement("advice-description", translations[lang].adviceDescription);
    loadAdvice(lang); // Charger les conseils
  }
}

// Fonction utilitaire pour traduire un élément
function translateElement(id, text) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = text;
  } else {
    console.warn(`Élément non trouvé : ${id}`); // Avertissement en cas d'élément manquant
  }
}

// Fonction pour récupérer les heures de prière
async function getPrayerTimes(city, country) {
  const apiUrl = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.code === 200) {
      const timings = data.data.timings;
      document.getElementById("fajr-time").textContent = timings.Fajr;
      document.getElementById("dhuhr-time").textContent = timings.Dhuhr;
      document.getElementById("asr-time").textContent = timings.Asr;
      document.getElementById("maghrib-time").textContent = timings.Maghrib;
      document.getElementById("isha-time").textContent = timings.Isha;
    } else {
      console.error("Erreur lors de la récupération des heures de prière.");
    }
  } catch (error) {
    console.error("Erreur :", error);
  }
}

// Gestionnaire d'événement pour le bouton de changement de langue
document.addEventListener("DOMContentLoaded", function() {
  const languageToggle = document.getElementById("language-toggle");
  if (languageToggle) {
    languageToggle.addEventListener("click", function() {
      const currentLang = document.querySelector("html").getAttribute("lang");
      const newLang = currentLang === "ar" ? "fr" : "ar";
      changeLanguage(newLang);
      this.textContent = newLang === "ar" ? "Français" : "العربية";
    });
  } else {
    console.error("Bouton de changement de langue non trouvé !"); // Erreur si le bouton est manquant
  }

  // Initialiser la langue par défaut (arabe)
  changeLanguage("ar");

  // Récupérer les heures de prière pour Oran, Algérie
  getPrayerTimes("Oran", "Algeria");
});
