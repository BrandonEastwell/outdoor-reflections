import {AuthUser, User} from "@/types/userTypes";
import {API_URL} from "@/constants/apiUrl";

export async function getCurrentUser(): Promise<AuthUser | null> {
    const res = await fetch(`${API_URL}/api/auth/me`, {
        method: "GET",
        credentials: "include"
    })

    if (res.status === 401) return null;
    if (!res.ok) throw new Error("Failed to fetch current user")
    return res.json()
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