export type UserDto = {
    id: number
    email: string
    password: string
}

export type UpdateUserData = {
    email?: string;
    password?: string;
};

export type SafeUser = {
    id: number;
    email: string;
}

export type LoginProvider = {
    id: string;
    name: Providers;
}

type Providers = "google"