"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut as signOutRequest } from "@/api/auth-api";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  const router = useRouter();

  async function signOut() {
    await signOutRequest();
    router.push("/");
    router.refresh();
  }

  return (
    <Button type="button" variant="outline" onClick={signOut}>
      <LogOut size={16} />
      Sign Out
    </Button>
  );
}
