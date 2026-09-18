import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

const logoAsset = { url: "/assets/alanwar-logo.jpeg" };

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Sign In | AL-ANWAR Build & Design" },
      { name: "description", content: "Secure management sign in for AL-ANWAR Build & Design." },
      { property: "og:title", content: "Admin Sign In | AL-ANWAR Build & Design" },
      {
        property: "og:description",
        content: "Secure management sign in for AL-ANWAR Build & Design.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const values = new FormData(event.currentTarget);
    try {
      const { data: session, error: signInError } = await supabase.auth.signInWithPassword({
        email: String(values.get("email") ?? "").trim(),
        password: String(values.get("password") ?? ""),
      });
      if (signInError || !session.user) {
        setError("The email or password is incorrect.");
        return;
      }
      const { data: isAdmin, error: roleError } = await supabase.rpc("has_role", {
        _user_id: session.user.id,
        _role: "admin",
      });
      if (roleError) {
        setError("Admin access could not be verified. Please try again.");
        return;
      }
      if (!isAdmin) {
        await supabase.auth.signOut();
        setError("This account does not have admin access.");
        return;
      }
      await navigate({ to: "/dashboard" });
    } catch {
      setError("Sign in could not be completed. Please try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="grid min-h-screen place-items-center bg-ink px-4 py-16 text-primary-foreground">
      <div className="w-full max-w-md rounded-md border border-primary-foreground/15 bg-primary-foreground/5 p-8 shadow-luxury backdrop-blur-xl">
        <img
          src={logoAsset.url}
          alt="AL-ANWAR Build & Design"
          className="mx-auto mb-6 h-24 w-24 rounded-full object-cover"
        />
        <p className="eyebrow text-center">Private access</p>
        <h1 className="mt-3 text-center text-3xl">Admin sign in</h1>
        <form onSubmit={submit} className="mt-8 space-y-5">
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="username"
                className="pl-10 text-foreground"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-2">
              <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="pl-10 text-foreground"
              />
            </div>
          </div>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
          <Button type="submit" variant="luxury" size="luxury" className="w-full" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </main>
  );
}
