import {API_URL} from "@/constants/apiUrl";
import type {AuthUser, User} from "@/types/userTypes";
import type {Providers} from "@/types/authTypes";

type AuthTokenResponse = {
    access_token: string;
    refresh_token: string;
};

async function readJsonError(res: Response, fallback: string) {
    try {
        const body = await res.json();
        return body?.message ?? fallback;
    } catch {
        return fallback;
    }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
    const res = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        credentials: "include",
    });

    if (res.status === 401) return null;
    if (!res.ok) throw new Error("Failed to fetch current user");

    return (await res.json()) as AuthUser;
}

export async function login(user: User): Promise<AuthTokenResponse> {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
    });

    if (!res.ok) throw new Error(await readJsonError(res, "Unable to sign in"));
    return (await res.json()) as AuthTokenResponse;
}

export async function createAccount(user: User): Promise<AuthTokenResponse> {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
    });

    if (!res.ok) throw new Error(await readJsonError(res, "Unable to create account"));
    return (await res.json()) as AuthTokenResponse;
}

export function loginWithProvider(provider: Providers): void {
    window.location.href = `${API_URL}/auth/${provider}`;
}

