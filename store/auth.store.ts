import {create} from 'zustand';
import {User} from "@/type";
import {getCurrentUser} from "@/lib/appwrite";

type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;

    setIsAuthenticated: (value: boolean) => void;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;

    fetchAuthenticatedUser: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: true,

    setIsAuthenticated: (value) => set({isAuthenticated: value}),
    setUser: (user) => set({user}),
    setLoading: (value) => set({isLoading: value}),

    fetchAuthenticatedUser: async () => {
        set({isLoading: true});
        console.log('[Auth] Checking if user is authenticated...');

        try {
            const user = await getCurrentUser();

            if (user) {
                console.log('[Auth] User is authenticated');
                set({isAuthenticated: true, user: user as User});
            } else {
                console.log('[Auth] No user found, not authenticated');
                set({isAuthenticated: false, user: null});
            }
        } catch (e) {
            console.log('[Auth] Error checking user auth:', e);
            set({isAuthenticated: false, user: null});
        } finally {
            set({isLoading: false});
        }
    }
}))

export default useAuthStore;