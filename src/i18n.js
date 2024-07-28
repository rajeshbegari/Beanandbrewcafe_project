import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Welcome!": "Welcome!",
      "Home": "Home",
      "Virtual Coffee Tasting": "Virtual Coffee Tasting",
      "Special Offers": "Special Offers",
      "Events": "Events",
      "Make Your Coffee": "Make Your Coffee",
      "About": "About",
      "Contact Us": "Contact Us",
      "Gallery": "Gallery",
      "My Account": "My Account",
      "Orders": "Orders",
      "Wishlist": "Wishlist",
      "Logout": "Logout",
    }
  },
  fr: {
    translation: {
      "Welcome!": "Bienvenue!",
      "Home": "Accueil",
      "Virtual Coffee Tasting": "Dégustation de café virtuel",
      "Special Offers": "Offres spéciales",
      "Events": "Événements",
      "Make Your Coffee": "Faites votre café",
      "About": "À propos",
      "Contact Us": "Nous contacter",
      "Gallery": "Galerie",
      "My Account": "Mon compte",
      "Orders": "Commandes",
      "Wishlist": "Liste de souhaits",
      "Logout": "Déconnexion",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;