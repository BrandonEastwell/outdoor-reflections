import {AuthUser, User} from "@/types/userTypes";
import {API_URL} from "@/constants/apiUrl";
import {Provider} from "react";
import {Providers} from "@/types/authTypes";

export async function getCurrentUser(): Promise<AuthUser | null> {
    const res = await fetch(`${API_URL}/api/auth/me`, {
        method: "GET",
        credentials: "include"
    })

    if (res.status === 401) return null;
    if (!res.ok) throw new Error("Failed to fetch current user")
    return await res.json() as Promise<AuthUser>
}

export async function login(user: User) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (!res.ok) throw new Error("Unable to sign in");
    return res.json();
}

export async function loginWithProvider(provider: Providers) {
    const res = await fetch(`${API_URL}/api/auth/google`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) throw new Error("Unable to sign in");
    return res.json();
}

export async function logout(): Promise<void> {}