import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import plCommon from "./locales/pl/common.json";
import plHome from "./locales/pl/home.json";
import plBlog from "./locales/pl/blog.json";
import plContact from "./locales/pl/contact.json";
import plAbout from "./locales/pl/about.json";
import plHistory from "./locales/pl/history.json";
import plPrivacy from "./locales/pl/privacy.json";
import plSeo from "./locales/pl/seo.json";
import enCommon from "./locales/en/common.json";
import enHome from "./locales/en/home.json";
import enBlog from "./locales/en/blog.json";
import enContact from "./locales/en/contact.json";
import enAbout from "./locales/en/about.json";
import enHistory from "./locales/en/history.json";
import enPrivacy from "./locales/en/privacy.json";
import enSeo from "./locales/en/seo.json";
import deCommon from "./locales/de/common.json";
import deHome from "./locales/de/home.json";
import deBlog from "./locales/de/blog.json";
import deContact from "./locales/de/contact.json";
import deAbout from "./locales/de/about.json";
import deHistory from "./locales/de/history.json";
import dePrivacy from "./locales/de/privacy.json";
import deSeo from "./locales/de/seo.json";
import csCommon from "./locales/cs/common.json";
import csHome from "./locales/cs/home.json";
import csBlog from "./locales/cs/blog.json";
import csContact from "./locales/cs/contact.json";
import csAbout from "./locales/cs/about.json";
import csHistory from "./locales/cs/history.json";
import csPrivacy from "./locales/cs/privacy.json";
import csSeo from "./locales/cs/seo.json";
import skCommon from "./locales/sk/common.json";
import skHome from "./locales/sk/home.json";
import skBlog from "./locales/sk/blog.json";
import skContact from "./locales/sk/contact.json";
import skAbout from "./locales/sk/about.json";
import skHistory from "./locales/sk/history.json";
import skPrivacy from "./locales/sk/privacy.json";
import skSeo from "./locales/sk/seo.json";
import ukCommon from "./locales/uk/common.json";
import ukHome from "./locales/uk/home.json";
import ukBlog from "./locales/uk/blog.json";
import ukContact from "./locales/uk/contact.json";
import ukAbout from "./locales/uk/about.json";
import ukHistory from "./locales/uk/history.json";
import ukPrivacy from "./locales/uk/privacy.json";
import ukSeo from "./locales/uk/seo.json";
import { SUPPORTED_LANGUAGES } from "./shared/languages";

const resources = {
  pl: {
    common: plCommon,
    home: plHome,
    blog: plBlog,
    contact: plContact,
    about: plAbout,
    history: plHistory,
    privacy: plPrivacy,
    seo: plSeo,
  },
  en: {
    common: enCommon,
    home: enHome,
    blog: enBlog,
    contact: enContact,
    about: enAbout,
    history: enHistory,
    privacy: enPrivacy,
    seo: enSeo,
  },
  de: {
    common: deCommon,
    home: deHome,
    blog: deBlog,
    contact: deContact,
    about: deAbout,
    history: deHistory,
    privacy: dePrivacy,
    seo: deSeo,
  },
  cs: {
    common: csCommon,
    home: csHome,
    blog: csBlog,
    contact: csContact,
    about: csAbout,
    history: csHistory,
    privacy: csPrivacy,
    seo: csSeo,
  },
  sk: {
    common: skCommon,
    home: skHome,
    blog: skBlog,
    contact: skContact,
    about: skAbout,
    history: skHistory,
    privacy: skPrivacy,
    seo: skSeo,
  },
  uk: {
    common: ukCommon,
    home: ukHome,
    blog: ukBlog,
    contact: ukContact,
    about: ukAbout,
    history: ukHistory,
    privacy: ukPrivacy,
    seo: ukSeo,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "pl",
    supportedLngs: SUPPORTED_LANGUAGES.map(({ code }) => code),
    defaultNS: "common",
    ns: ["common", "home", "blog", "contact", "about", "history", "privacy", "seo"],
    interpolation: { escapeValue: false },
  });

const setHtmlLang = (lng) => {
  document.documentElement.lang = lng || i18n.language;
};
i18n.on("initialized", () => setHtmlLang());
i18n.on("languageChanged", setHtmlLang);

export default i18n;
