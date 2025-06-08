// import { defineStore } from "pinia";
// import { ref } from "vue";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
// }

// export const useAuthStore = defineStore("auth", () => {
//   const loadUsers = (): User[] => {
//     const storedUsers = localStorage.getItem("users");
//     return storedUsers
//       ? JSON.parse(storedUsers)
//       : [
//           {
//             id: 1,
//             name: "John Doe",
//             email: "john@example.com",
//             password: "password123",
//           },
//           {
//             id: 2,
//             name: "Jane Smith",
//             email: "jane@example.com",
//             password: "password456",
//           },
//         ];
//   };

//   const demoUsers = ref<User[]>(loadUsers());
//   const currentUser = ref<User | null>(null);
//   const isAuthenticated = ref(false);

//   // Sauvegarder les utilisateurs dans le localStorage
//   const saveUsers = () => {
//     localStorage.setItem("users", JSON.stringify(demoUsers.value));
//   };

//   const register = (name: string, email: string, password: string) => {
//     // Vérifier si l'email existe déjà
//     const emailExists = demoUsers.value.some((user) => user.email === email);
//     if (emailExists) {
//       throw new Error("Email already exists");
//     }

//     const newUser: User = {
//       id: demoUsers.value.length + 1,
//       name,
//       email,
//       password,
//     };

//     demoUsers.value.push(newUser);
//     currentUser.value = newUser;
//     saveUsers();
//     return newUser;
//   };

//   const login = (email: string, password: string) => {
//     const user = demoUsers.value.find(
//       (user) => user.email === email && user.password === password
//     );

//     if (user) {
//       currentUser.value = user;
//       isAuthenticated.value = true;
//       return user;
//     }

//     return null;
//   };

//   const logout = () => {
//     currentUser.value = null;
//     isAuthenticated.value = false;
//   };

//   return {
//     demoUsers,
//     currentUser,
//     isAuthenticated,
//     register,
//     login,
//     logout,
//   };
// });

import { defineStore } from "pinia";
import { ref, readonly } from "vue"; // Ajoutez readonly à l'import

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export const useAuthStore = defineStore("auth", () => {
  // Initialiser avec les valeurs du localStorage
  const currentUser = ref<User | null>(
    JSON.parse(localStorage.getItem("currentUser") || "null")
  );
  const isAuthenticated = ref(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const login = (email: string, password: string) => {
    const user = demoUsers.value.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      currentUser.value = user;
      isAuthenticated.value = true;
      // Persister les données
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("isAuthenticated", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    currentUser.value = null;
    isAuthenticated.value = false;
    // Nettoyer le localStorage
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isAuthenticated");
  };

  return { currentUser, isAuthenticated, login, logout };
});
