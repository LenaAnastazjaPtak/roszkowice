import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import plCommon from './locales/pl/common.json'
import plHome from './locales/pl/home.json'
import plBlog from './locales/pl/blog.json'
import plContact from './locales/pl/contact.json'
import enCommon from './locales/en/common.json'
import enHome from './locales/en/home.json'
import enBlog from './locales/en/blog.json'
import enContact from './locales/en/contact.json'
import deCommon from './locales/de/common.json'
import deHome from './locales/de/home.json'
import deBlog from './locales/de/blog.json'
import deContact from './locales/de/contact.json'

const resources = {
  pl: { common: plCommon, home: plHome, blog: plBlog, contact: plContact },
  en: { common: enCommon, home: enHome, blog: enBlog, contact: enContact },
  de: { common: deCommon, home: deHome, blog: deBlog, contact: deContact }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pl',
    supportedLngs: ['pl', 'en', 'de'],
    defaultNS: 'common',
    ns: ['common', 'home', 'blog', 'contact'],
    interpolation: { escapeValue: false }
  })

export default i18n
