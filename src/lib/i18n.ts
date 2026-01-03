
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          nav: {
            categories: "Categories",
            how_it_works: "How it Works",
            list_item: "List an Item",
            login: "Login",
            signup: "Sign Up"
          },
          hero: {
            title: "Rent Everything, Own Nothing.",
            subtitle: "The most trusted centralized marketplace to rent tools, gear, vehicles and more.",
            search_placeholder: "What do you need today?",
            search_button: "Search"
          },
          features: {
            title: "Why Arentzo?",
            secure: "Secure Payments",
            secure_desc: "Your transactions are protected by industry-leading security.",
            verified: "Verified Users",
            verified_desc: "We verify every member to ensure a safe rental community.",
            insurance: "Rental Insurance",
            insurance_desc: "All rentals are covered by our comprehensive insurance policy."
          },
          footer: {
            about: "About Us",
            contact: "Contact",
            privacy: "Privacy Policy",
            terms: "Terms of Service"
          }
        }
      }
    }
  });

export default i18n;
