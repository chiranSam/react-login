import { create } from "zustand";

interface AuthState {
    isAuthenticated: boolean;
    login: (username: string, password:string)=> Promise<boolean>;
    logout: ()=> void;
}

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    login: async (username, password)=>{
        if (username === 'admin' && password === '1234'){
            set({ isAuthenticated: true});
            return true;
        }
        return false;
    },
    logout: ()=> set({ isAuthenticated: false}),
}));

export default useAuthStore;  