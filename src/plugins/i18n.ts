import { createI18n } from "vue-i18n";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

function getInitialLocale() {
  const savedLocale = localStorage.getItem("locale");
  if (savedLocale) return savedLocale;

  const browserLang = navigator.language.split("-")[0];
  const supportedLangs = ["en", "fr"];
  if (supportedLangs.includes(browserLang)) return browserLang;

  return import.meta.env.VITE_FALLBACK_LOCALE || "fr";
}

export const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE || "fr",
  messages: { en, fr },
  sync: true,
  silentTranslationWarn: true,
});

export function setI18nLanguage(locale: string) {
  i18n.global.locale.value = locale;
  document.querySelector("html")?.setAttribute("lang", locale);
  localStorage.setItem("locale", locale);
}

export default i18n;
