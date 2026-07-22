import * as z from "zod";

export const UserSchema = z.object({
    email: z.email().trim(),
    password: z.string().min(7),
});

export type User = z.infer<typeof UserSchema>;

export type AuthUser = {
    id: number;
    email: string;
    createdAt: string;
    updatedAt: string;
}