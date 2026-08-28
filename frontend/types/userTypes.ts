import * as z from "zod";

export const UserSchema = z.object({
    email: z.email({ error: "Email is not valid" }).trim(),
    password: z.string({ error: "Password must be a string" }).min(7, { error: "Password must be over 6 characters" }),
});

export type User = z.infer<typeof UserSchema>;

export type AuthUser = {
    id: number;
    email: string;
    createdAt: string;
    updatedAt: string;
}