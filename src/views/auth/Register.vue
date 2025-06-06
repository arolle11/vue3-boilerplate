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
            Already have an account?
          </p>
          <button
            type="button"
            class="py-2.5 px-5 text-xs text-[#273240] outline-none rounded-lg border border-[#273240]"
          >
            <router-link to="/">Login</router-link>
          </button>
        </div>
      </div>
      <div class="flex-1 flex flex-col items-center justify-center">
        <div
          class="flex items-center justify-center border border-gray-200 rounded-full p-8"
        >
          <CircleUserRound class="text-[#273240] w-12 h-12" />
        </div>
        <h1 class="text-3xl mt-8">Create a new account</h1>
        <p class="text-xs text-[#273240] mt-4">
          Enter your details to register.
        </p>
        <form
          class="flex flex-col items-center w-1/2 max-sm:w-full"
          @submit.prevent="handleRegister"
        >
          <div class="w-full mt-8">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Full Name*</label
            >
            <div class="relative mb-6">
              <div
                class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
              >
                <User class="text-gray-900 w-4 h-4" />
              </div>
              <input
                type="text"
                id="name"
                v-model="form.name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
                placeholder="arolle fona"
              />
            </div>
            <p v-if="errors.name" class="text-xs text-red-500 mt-1">
              {{ errors.name }}
            </p>
          </div>
          <div class="w-full">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Email*</label
            >
            <div class="relative mb-6">
              <div
                class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
              >
                <Mail class="text-gray-900 w-4 h-4" />
              </div>
              <input
                type="text"
                id="email"
                v-model="form.email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
                placeholder="arollefona11@gmail.com"
              />
            </div>
            <p v-if="errors.email" class="text-xs text-red-500 mt-1">
              {{ errors.email }}
            </p>
          </div>
          <div class="w-full">
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Password*</label
            >
            <div class="relative mb-6">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3.5">
                <LockKeyhole class="text-gray-900 w-4 h-4" />
              </div>
              <input
                id="password"
                :type="showPassword ? 'text' : 'password'"
                v-model="form.password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
                placeholder="........"
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
          <div class="flex items-center w-full gap-2">
            <input
              id="terms"
              type="checkbox"
              v-model="form.terms"
              class="w-4 h-4 text-[#5A67BA] bg-gray-100 border-gray-300 rounded-sm outline-none"
            />
            <label for="terms" class="text-xs text-[#273240]"
              >I agree to the Terms and Conditions</label
            >
          </div>
          <p v-if="errors.terms" class="text-xs text-red-500 w-full mt-1">
            {{ errors.terms }}
          </p>
          <button
            type="submit"
            class="bg-[#5A67BA] w-full px-4 py-2 rounded text-white mt-8"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting">Creating account...</span>
            <span v-else>Create an account</span>
          </button>
          <p v-if="registerError" class="text-xs text-red-500 mt-2">
            {{ registerError }}
          </p>
        </form>
      </div>
      <div
        class="flex max-sm:flex-col max-sm:gap-2 items-center justify-between"
      >
        <p class="text-sm text-[#273240]">
          ©2025 MonEntreprise. Tous droits réservés.
        </p>
        <p class="flex gap-2 items-center">
          <Globe class="text-[#273240]" />
          <select
            class="text-[#273240] text-sm block w-full p-2.5 outline-none"
          >
            <option selected>ENG</option>
            <option value="FR">FR</option>
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
import {
  Globe,
  CircleUserRound,
  User,
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
} from "lucide-vue-next";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const showPassword = ref(false);
const isSubmitting = ref(false);
const registerError = ref("");

const form = ref({
  name: "",
  email: "",
  password: "",
  terms: false,
});

const errors = ref({
  name: "",
  email: "",
  password: "",
  terms: "",
});

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const validateForm = () => {
  let isValid = true;
  errors.value = { name: "", email: "", password: "", terms: "" };

  if (!form.value.name) {
    errors.value.name = "Full name is required";
    isValid = false;
  }

  if (!form.value.email) {
    errors.value.email = "Email is required";
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(form.value.email)) {
    errors.value.email = "Please enter a valid email";
    isValid = false;
  }

  if (!form.value.password) {
    errors.value.password = "Password is required";
    isValid = false;
  } else if (form.value.password.length < 6) {
    errors.value.password = "Password must be at least 6 characters";
    isValid = false;
  }

  if (!form.value.terms) {
    errors.value.terms = "You must accept the terms and conditions";
    isValid = false;
  }

  return isValid;
};

const handleRegister = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  registerError.value = "";

  try {
    const emailExists = authStore.demoUsers.some(
      (user) => user.email === form.value.email
    );
    if (emailExists) {
      registerError.value = "Email already registered";
      return;
    }

    authStore.register(form.value.name, form.value.email, form.value.password);
    router.push("/");
  } finally {
    isSubmitting.value = false;
  }
};
</script>
