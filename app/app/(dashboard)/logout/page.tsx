"use client";
import { logout } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
    window.location.reload();
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return null;
}
