<template>
  <div class="flex bg-white w-screen h-screen relative p-12">
    <div class="w-full sm:w-1/2 flex flex-col h-full relative">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div
            class="text-white bg-[#5A67BA] flex items-center justify-center w-8 h-8 rounded-full text-xs"
          >
            G
          </div>
          <h1 class="text-xs font-bold text-[#5A67BA]">GOODFOOD</h1>
        </div>
        <div class="flex items-center gap-4">
          <p class="text-[#273240] text-xs max-sm:hidden">
            {{ t('login.new_to_good_food') }}
          </p>
          <button
            type="button"
            class="py-2.5 px-5 text-xs text-[#273240] outline-none rounded-lg border border-[#273240] cursor-pointer"
          >
            <router-link to="/register">{{ t('login.register') }}</router-link>
          </button>
        </div>
      </div>
      <div class="flex-1 flex flex-col items-center justify-center">
        <div class="flex items-center justify-center border border-gray-200 rounded-full p-8">
          <CircleUserRound class="text-[#273240] w-12 h-12" />
        </div>
        <h1 class="text-3xl mt-8">{{ t('login.title') }}</h1>
        <p class="text-xs text-[#273240] mt-4">{{ t('login.subtitle') }}</p>
        <form class="flex flex-col items-center w-1/2 max-sm:w-full" @submit.prevent="handleLogin">
          <div class="w-full mt-8">
            <label
              for="username"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Username</label
            >
            <div class="relative mb-6">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <Mail class="text-gray-900 w-4 h-4" />
              </div>
              <input
                id="username"
                v-model="form.username"
                type="text"
                autocomplete="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
                placeholder="arolle11"
                @input="clearUsernameError"
                @focus="clearUsernameError"
              />
            </div>
            <p v-if="errors.username" class="text-xs text-red-500 mt-1">
              {{ errors.username }}
            </p>
          </div>
          <div class="w-full">
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >{{ t('login.password') }}</label
            >
            <div class="relative mb-6">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3.5">
                <LockKeyhole class="text-gray-900 w-4 h-4" />
              </div>
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
                placeholder="........"
                @input="clearPasswordError"
                @focus="clearPasswordError"
              />
              <div
                class="absolute inset-y-0 end-0 flex items-center px-3.5 cursor-pointer"
                @click="togglePassword"
              >
                <EyeOff v-if="!showPassword" class="text-gray-900 w-4 h-4" />
                <Eye v-else class="text-gray-900 w-4 h-4" />
              </div>
            </div>
            <p v-if="errors.password" class="text-xs text-red-500 mt-1">
              {{ errors.password }}
            </p>
          </div>
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center gap-2">
              <input
                id="remember"
                v-model="form.remember"
                type="checkbox"
                class="w-4 h-4 text-[#5A67BA] bg-gray-100 border-gray-300 rounded-sm outline-none"
              />
              <label for="default-checkbox" class="text-xs text-[#273240]">{{
                t('login.remember_me')
              }}</label>
            </div>
            <p class="text-xs text-[#273240] cursor-pointer">
              {{ t('login.forgot_password') }}
            </p>
          </div>
          <button
            type="submit"
            class="bg-[#5A67BA] w-full px-4 py-2 rounded text-white mt-8"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">{{ t('login.loader') }}</span>
            <span v-else>{{ t('login.login_button') }}</span>
          </button>
          <p v-if="loginError" class="text-xs text-red-500 mt-2">
            {{ loginError }}
          </p>
        </form>
      </div>
      <div class="flex max-sm:flex-col max-sm:gap-2 items-center justify-between">
        <p class="text-sm text-[#273240]">©2025 {{ t('login.all_rights_reserved') }}</p>
        <p class="flex gap-2 items-center">
          <Globe class="text-[#273240]" />
          <select
            v-model="currentLocale"
            class="text-[#273240] text-sm block w-full p-2.5 outline-none"
            @change="changeLanguage"
          >
            <option v-for="loc in supportedLocales" :key="loc" :value="loc">
              {{ loc.toUpperCase() }}
            </option>
          </select>
        </p>
      </div>
    </div>
    <div class="absolute top-0 right-0 w-1/2 h-full hidden sm:block p-12">
      <div class="w-full h-full overflow-hidden rounded-3xl">
        <img
          src="@/assets/images/bg_image.jpg"
          alt="background_image"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Globe, CircleUserRound, Mail, LockKeyhole, Eye, EyeOff } from 'lucide-vue-next';
  import { ref, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useAppStore } from '@/stores/app';
  import { useAuthStore } from '@/stores/auth';
  import { useRouter } from 'vue-router';

  const { t, locale } = useI18n();
  const appStore = useAppStore();

  const authStore = useAuthStore();
  const router = useRouter();

  const showPassword = ref(false);
  const isSubmitting = ref(false);
  const loginError = ref('');

  const currentLocale = ref(appStore.currentLocale);
  const supportedLocales = computed(() => appStore.supportedLocales);

  const changeLanguage = () => {
    locale.value = currentLocale.value;
    appStore.setLocale(currentLocale.value);
  };

  const form = ref({
    username: '',
    password: '',
    remember: false,
  });

  const errors = ref({
    username: '',
    password: '',
  });

  const togglePassword = () => {
    showPassword.value = !showPassword.value;
  };

  const clearUsernameError = () => {
    errors.value.username = '';
    loginError.value = '';
  };

  const clearPasswordError = () => {
    errors.value.password = '';
    loginError.value = '';
  };

  const validateForm = () => {
    let isValid = true;
    errors.value = { username: '', password: '' };

    if (!form.value.username) {
      errors.value.username = 'Username is required';
      isValid = false;
    }
    // Uncomment the following lines if you want to validate the email format
    //  else if (!/^\S+@\S+\.\S+$/.test(form.value.email)) {
    //   errors.value.email = 'Please enter a valid email';
    //   isValid = false;
    // }

    if (!form.value.password) {
      errors.value.password = 'Password is required';
      isValid = false;
    } else if (form.value.password.length < 6) {
      errors.value.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    isSubmitting.value = true;
    loginError.value = '';
    try {
      isSubmitting.value = true;
      loginError.value = '';
      await authStore.login(form.value);
      router.push('/home');
    } catch {
      loginError.value = 'Invalid username or password';
    } finally {
      isSubmitting.value = false;
    }
  };
</script>
