import Link from "next/link";
import DrawIcon from "@/components/DrawIcon";
import {SVG_PATHS} from "@/constants/svgPaths";
import AuthForm from "@/components/AuthForm";

export const metadata = {
  title: "Sign in | outdoor reflections",
  description: "Sign in or create an account for outdoor reflections.",
};

export default function AuthPage() {
  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-6 py-10">
      <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="flex flex-col justify-between rounded-3xl border border-white/50 bg-white/18 p-8 shadow-[0_24px_70px_-42px_rgba(73,88,103,0.45)] backdrop-blur-2xl backdrop-saturate-150">
          <div className="max-w-xl">
            <DrawIcon svgPaths={SVG_PATHS.flowerIcon} strokeWidth={1.5} iconSize={64} fill={"#ce796b"} />
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-rose sm:text-5xl font-flower">
              outdoor reflections
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-6 text-blue-slate/80 sm:text-base">
              Sign in to keep your entries in sync, or create a new account to start a fresh journal.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/70 bg-white/70 p-4">
              <p className="mt-3 text-sm font-medium text-blue-slate">Private entries</p>
              <p className="mt-1 text-xs leading-5 text-blue-slate/70">Local-first storage with sync when you need it.</p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/70 p-4">
              <p className="mt-3 text-sm font-medium text-blue-slate">Offline access</p>
              <p className="mt-1 text-xs leading-5 text-blue-slate/70">Access your entries wherever you need.</p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/70 p-4">
              <p className="mt-3 text-sm font-medium text-blue-slate">Account recovery</p>
              <p className="mt-1 text-xs leading-5 text-blue-slate/70">A place to add recovery flow and verification later.</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_-40px_rgba(73,88,103,0.65)] backdrop-blur-xl sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.24em] text-blue-slate/60">Account</p>
              <h2 className="mt-2 font-flower text-3xl font-bold text-blue-slate">Sign in</h2>
            </div>
            <Link href="/" className="text-sm font-mono text-rose transition-colors hover:text-camel">
              back
            </Link>
          </div>

          <AuthForm />

        </section>
      </div>
    </main>
  );
}
