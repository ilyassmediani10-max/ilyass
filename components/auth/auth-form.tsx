"use client";

import Link from "next/link";
import { LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthForm } from "@/hooks/use-auth-form";

type IProps = {
  mode: "signin" | "signup";
};

export function AuthForm({ mode }: IProps) {
  const form = useAuthForm(mode);
  const isSignup = mode === "signup";

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-md items-center px-6 py-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{isSignup ? "Create Account" : "Sign In"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.submit} className="grid gap-4">
            {isSignup ? (
              <Label>
                Name
                <Input
                  value={form.name}
                  onChange={(event) => form.setName(event.target.value)}
                  required
                  placeholder="Your name"
                />
              </Label>
            ) : null}
            <Label>
              Email
              <Input
                type="email"
                value={form.email}
                onChange={(event) => form.setEmail(event.target.value)}
                required
                placeholder="you@example.com"
              />
            </Label>
            <Label>
              Password
              <Input
                type="password"
                value={form.password}
                onChange={(event) => form.setPassword(event.target.value)}
                required
                minLength={6}
                placeholder="At least 6 characters"
              />
            </Label>
            {form.message ? (
              <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {form.message}
              </p>
            ) : null}
            <Button type="submit" disabled={form.isSubmitting}>
              {isSignup ? <UserPlus size={16} /> : <LogIn size={16} />}
              {form.isSubmitting ? "Please wait..." : isSignup ? "Sign Up" : "Sign In"}
            </Button>
          </form>
          <p className="mt-5 text-sm text-muted-foreground">
            {isSignup ? "Already have an account?" : "Need an account?"}{" "}
            <Link className="font-medium text-foreground underline-offset-4 hover:underline" href={isSignup ? "/signin" : "/signup"}>
              {isSignup ? "Sign in" : "Sign up"}
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
