import { createContext, ReactNode, useContext, useEffect, useState } from "react";

// Create the context with a proper default value
export const AuthContext = createContext<{
    authUser: string | null;
    setAuthUser: React.Dispatch<React.SetStateAction<string | null>>;
} | null>(null);

export function AuthContextProvider({ children }: { children: ReactNode }) {
    const [authUser, setAuthUser] = useState<string | null>(() => {
        try {
            const storedRole = localStorage.getItem('role-type');
            return storedRole ? storedRole : null;
        } catch (error) {
            console.error("Error parsing localStorage item 'role-type':", error);
            return null;
        }
    });

    // Effect to sync state with localStorage changes
    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'role-type') {
                try {
                    const newRole = event.newValue ? event.newValue : null;
                    setAuthUser(newRole);
                } catch (error) {
                    console.error("Error parsing updated 'role-type' from localStorage:", error);
                    setAuthUser(null);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AuthContext);
}
