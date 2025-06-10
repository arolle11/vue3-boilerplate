import { defineStore } from 'pinia';
import { ref } from 'vue';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export const useAuthStore = defineStore('auth', () => {
  const loadUsers = (): User[] => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers
      ? JSON.parse(storedUsers)
      : [
          {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
          },
          {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            password: 'password456',
          },
        ];
  };

  const demoUsers = ref<User[]>(loadUsers());
  const currentUser = ref<User | null>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
  const isAuthenticated = ref(!!localStorage.getItem('isAuthenticated'));

  const saveUsers = () => {
    localStorage.setItem('users', JSON.stringify(demoUsers.value));
  };

  const register = (name: string, email: string, password: string) => {
    const emailExists = demoUsers.value.some((user) => user.email === email);
    if (emailExists) {
      throw new Error('Email already exists');
    }

    const newUser: User = {
      id: demoUsers.value.length + 1,
      name,
      email,
      password,
    };

    demoUsers.value.push(newUser);
    currentUser.value = newUser;
    isAuthenticated.value = true;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    localStorage.setItem('isAuthenticated', 'true');
    saveUsers();
    return newUser;
  };

  const login = (email: string, password: string) => {
    const user = demoUsers.value.find((user) => user.email === email && user.password === password);

    if (user) {
      currentUser.value = user;
      isAuthenticated.value = true;
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
      return user;
    }

    return null;
  };

  const logout = () => {
    currentUser.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
  };

  return {
    demoUsers,
    currentUser,
    isAuthenticated,
    register,
    login,
    logout,
  };
});
