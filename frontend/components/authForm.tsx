"use client"
import {Button} from "@/components/ui/button";
import DrawIcon from "@/components/DrawIcon";
import {SVG_PATHS} from "@/constants/svgPaths";
import {useState} from "react";
import * as z from "zod";

const UserSchema = z.object({
    email: z.email().trim(),
    password: z.string().min(7),
});

type User = z.infer<typeof UserSchema>;
const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL ?? "http://localhost:8000";

export default function AuthForm() {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const result = UserSchema.safeParse({email, password});
        if (!result.success) {
            setIsSubmitting(false);
            return setError(result.error.issues[0]?.message ?? "Invalid credentials");
        }
        const user: User = result.data;

        try {
            const response = await fetch(`${backendApiUrl}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            if (!response.ok) {
                throw new Error("Unable to sign in");
            }
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : "Unable to sign in");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mt-8 grid gap-4 font-mono">
            <label className="grid gap-2">
                <span className="text-sm font-medium text-blue-slate">Email</span>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="name@example.com"
                    className="h-12 rounded-2xl border border-border bg-white/90 px-4 text-sm text-blue-slate outline-none transition-shadow placeholder:text-blue-slate/35 focus:border-rose/40 focus:shadow-[0_0_0_3px_rgba(206,121,107,0.12)]"
                />
            </label>

            <label className="grid gap-2">
                <span className="text-sm font-medium text-blue-slate">Password</span>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="h-12 rounded-2xl border border-border bg-white/90 px-4 text-sm text-blue-slate outline-none transition-shadow placeholder:text-blue-slate/35 focus:border-rose/40 focus:shadow-[0_0_0_3px_rgba(206,121,107,0.12)]"
                />
            </label>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <div className="flex items-center justify-between gap-4">
                <label className="flex items-center gap-2 text-sm text-blue-slate/80">
                    <input
                        type="checkbox"
                        name="remember"
                        className="h-4 w-4 rounded border-border text-rose focus:ring-rose/30"
                    />
                    remember me
                </label>
                <button type="button" className="text-sm text-rose transition-colors hover:text-camel">
                    forgot password
                </button>
            </div>

            <Button type="submit" disabled={isSubmitting} className="h-12 rounded-2xl bg-rose text-background hover:bg-rose/90">
                sign in
                <DrawIcon fill={"white"} svgPaths={SVG_PATHS.signInIcon} />
            </Button>

            <Button type="button" variant="outline" className="h-12 rounded-2xl border-white/70 bg-white/70">
                continue with google
            </Button>

            <p className="pt-2 text-sm text-blue-slate/70">
                New here?{" "}
                <button type="button" className="font-medium text-rose transition-colors hover:text-camel">
                    create account
                </button>
            </p>
        </form>
    )
}
