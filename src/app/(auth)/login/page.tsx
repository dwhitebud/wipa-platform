"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"password" | "magic">("password");

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/portal/dashboard");
    router.refresh();
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/portal/dashboard`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMagicLinkSent(true);
    setLoading(false);
  }

  if (magicLinkSent) {
    return (
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
          <Mail className="h-8 w-8 text-gold" />
        </div>
        <h1 className="mt-6 text-2xl font-semibold">Check your email</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          We sent a magic link to <strong>{email}</strong>. Click the link in
          your email to sign in.
        </p>
        <Button
          variant="ghost"
          className="mt-6"
          onClick={() => {
            setMagicLinkSent(false);
            setMode("password");
          }}
        >
          Back to login
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">Member Center</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Sign in to access your WIPA member portal
      </p>

      {error && (
        <div className="mt-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {mode === "password" ? (
        <form onSubmit={handlePasswordLogin} className="mt-8 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-xs text-gold hover:text-gold-dark"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-primary"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Lock className="mr-2 h-4 w-4" />
            )}
            Sign In
          </Button>
        </form>
      ) : (
        <form onSubmit={handleMagicLink} className="mt-8 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="magic-email">Email</Label>
            <Input
              id="magic-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-primary"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Mail className="mr-2 h-4 w-4" />
            )}
            Send Magic Link
          </Button>
        </form>
      )}

      <div className="mt-6">
        <Separator />
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setMode(mode === "password" ? "magic" : "password")}
            className="text-sm text-gold hover:text-gold-dark"
          >
            {mode === "password"
              ? "Sign in with a magic link instead"
              : "Sign in with password instead"}
          </button>
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Not a member yet?{" "}
        <Link href="/membership/join" className="text-gold hover:text-gold-dark">
          Apply for membership
          <ArrowRight className="ml-1 inline h-3 w-3" />
        </Link>
      </p>
    </div>
  );
}
