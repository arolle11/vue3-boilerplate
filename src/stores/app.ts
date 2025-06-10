import { defineStore } from 'pinia';
import { ref } from 'vue';
import { setI18nLanguage } from '@/plugins/i18n';

export const useAppStore = defineStore('app', () => {
  const initialLocale =
    localStorage.getItem('locale') || import.meta.env.VITE_DEFAULT_LOCALE || 'fr';
  const currentLocale = ref(initialLocale);
  const supportedLocales = ref((import.meta.env.VITE_SUPPORTED_LOCALES || 'en,fr').split(','));

  const setLocale = (locale: string) => {
    if (supportedLocales.value.includes(locale)) {
      currentLocale.value = locale;
      setI18nLanguage(locale);
    }
  };

  return {
    currentLocale,
    supportedLocales,
    setLocale,
  };
});
