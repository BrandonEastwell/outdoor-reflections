export type UserDto = {
    id: number
    email: string
    password: string
}

export type UpdateUserData = {
    email?: string;
    password?: string;
};