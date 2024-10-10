import { defineStore } from 'pinia';
import { ref } from 'vue';
import Cookies from 'js-cookie';
import { router } from './src/Approutes'
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    username: string;
    role: string;
    exp: number;
}

export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(null);
    const username = ref<string | null>(null);
    const role = ref<string | null>(null);
    const isLoggedIn = ref(false);
    const error = ref<string | null>(null);

    async function login(usernameInput: string, password: string) {
        try {
            const response = await fetch(`http://${import.meta.env.VITE_SERVER_URL}/v1/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: usernameInput, password }),
            });

            const data = await response.json();

            if (response.ok) {
                const decodedToken = jwtDecode<DecodedToken>(data.token);

                token.value = data.token;
                username.value = decodedToken.username;
                role.value = decodedToken.role;
                isLoggedIn.value = true;
                error.value = null;

                Cookies.set('authToken', data.token);
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
            try {
                const decodedToken = jwtDecode<DecodedToken>(savedToken);
                const isTokenExpired = decodedToken.exp * 1000 < Date.now();

                if (isTokenExpired) {
                    logout();
                    return;
                }

                token.value = savedToken;
                username.value = decodedToken.username;
                role.value = decodedToken.role;
                isLoggedIn.value = true;
            } catch (error) {
                console.error('Invalid token:', error);
                logout();
            }
        }

        return !!savedToken
    }

    function isAdmin() {
        return role.value === "admin";
    }

    function isFacilityManager() {
        return role.value === "manager";
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
        isAdmin,
        isFacilityManager,
    };
});
