"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import { signIn, signUp } from "@/api/auth-api";

type AuthMode = "signin" | "signup";

export function useAuthForm(mode: AuthMode) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      if (mode === "signin") {
        await signIn({ email, password });
      } else {
        await signUp({ email, name, password });
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Authentication failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    email,
    isSubmitting,
    message,
    name,
    password,
    setEmail,
    setName,
    setPassword,
    submit,
  };
}
