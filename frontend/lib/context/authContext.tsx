"use client";

import {createContext, ReactNode, useEffect, useState} from "react";
import {API_URL} from "@/constants/apiUrl";

type AuthContextType = {
    userId: number | null;
    setUserId: (userId: number | null) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        async function loadUser() {
            try {
                const response = await fetch(`${API_URL}/auth/me`, {
                    credentials: "include",
                });

                if (!response.ok) {
                    setUserId(null);
                    return;
                }

                const user = await response.json();
                setUserId(user.id);
            } catch {
                setUserId(null);
            }
        }

        loadUser();

    }, []);

    async function logout() {
        await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
        });

        setUserId(null);
    }

    return (
        <AuthContext.Provider value={{ userId, setUserId, logout }}>
            {children}
        </AuthContext.Provider>
    );
}