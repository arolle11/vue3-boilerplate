import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("app", () => {
  const currentLocale = ref(import.meta.env.VITE_DEFAULT_LOCALE || "en");
  const supportedLocales = ref(
    (import.meta.env.VITE_SUPPORTED_LOCALES || "en,fr").split(",")
  );

  const setLocale = (locale: string) => {
    if (supportedLocales.value.includes(locale)) {
      currentLocale.value = locale;
    }
  };

  return {
    currentLocale,
    supportedLocales,
    setLocale,
  };
});
