import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { businessPagesEn } from '../features/business-pages/ui/translations/en';
import { franchiseEn } from '../features/business-pages/ui/translations/franchiseEn';
import { sellerEn } from '../features/business-pages/ui/translations/sellerEn';
import { warehouseEn } from '../features/business-pages/ui/translations/warehouseEn';
import { deliverEn } from '../features/business-pages/ui/translations/deliverEn';
import { resourcesEn } from '../features/business-pages/ui/translations/resourcesEn';
import { careersEn } from '../features/business-pages/ui/translations/careersEn';
import { blogEn } from '../features/business-pages/ui/translations/blogEn';

const isBrowser = typeof window !== 'undefined';

if (isBrowser) {
  i18n.use(LanguageDetector);
}

i18n.use(initReactI18next).init({
  debug: process.env.NODE_ENV === 'development',
  lng: isBrowser ? undefined : 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        nav: {
          categories: 'Categories',
          how_it_works: 'How it Works',
          list_item: 'List an Item',
          login: 'Login',
          signup: 'Sign Up',
        },
        hero: {
          title: 'Rent Everything, Own Nothing.',
          subtitle:
            'The most trusted centralized marketplace to rent tools, gear, vehicles and more.',
          search_placeholder: 'What do you need today?',
          search_button: 'Search',
        },
        features: {
          title: 'Why Arentzo?',
          secure: 'Secure Payments',
          secure_desc:
            'Your transactions are protected by industry-leading security.',
          verified: 'Verified Users',
          verified_desc:
            'We verify every member to ensure a safe rental community.',
          insurance: 'Rental Insurance',
          insurance_desc:
            'All rentals are covered by our comprehensive insurance policy.',
        },
        footer: {
          about: 'About Us',
          contact: 'Contact',
          privacy: 'Privacy Policy',
          terms: 'Terms of Service',
        },
        ...businessPagesEn,
        ...franchiseEn,
        ...sellerEn,
        ...warehouseEn,
        ...deliverEn,
        ...resourcesEn,
        ...careersEn,
        ...blogEn,
      },
    },
  },
});

export default i18n;
