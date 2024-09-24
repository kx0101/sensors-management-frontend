import { defineStore } from 'pinia';
import { ref } from 'vue';
import Cookies from 'js-cookie';
import { router } from './src/AppRoutes'

export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(null);
    const username = ref<string | null>(null);
    const role = ref<string | null>(null);
    const isLoggedIn = ref(false);
    const error = ref<string | null>(null);

    async function login(usernameInput: string, password: string) {
        try {
            const response = await fetch('http://localhost:3000/v1/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: usernameInput, password }),
            });

            const data = await response.json();

            if (response.ok) {
                token.value = data.token;
                username.value = data.username;
                role.value = data.role;
                isLoggedIn.value = true;
                error.value = null;

                Cookies.set('authToken', data.token, { sameSite: 'None', secure: true, expires: 1 });
            } else {
                error.value = data.message || 'Login failed';
                return { error: error.value }
            }
        } catch (err) {
            error.value = 'An error occurred during login';
            console.error(err);
            return { error: error.value }
        }
    }

    function logout() {
        token.value = null;
        username.value = null;
        role.value = null;
        isLoggedIn.value = false;
        Cookies.remove('authToken');

        router.push('/login');
    }

    function initializeAuth() {
        const savedToken = Cookies.get('authToken');

        if (savedToken) {
            token.value = savedToken;
            isLoggedIn.value = true;
        }

        return !!savedToken
    }

    return {
        token,
        username,
        role,
        isLoggedIn,
        error,
        login,
        logout,
        initializeAuth,
    };
});
