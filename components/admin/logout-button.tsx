"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();
  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    router.replace("/admin");
  };
  return (
    <Button variant="ghost" size="sm" onClick={logout}>
      Déconnexion
    </Button>
  );
}
