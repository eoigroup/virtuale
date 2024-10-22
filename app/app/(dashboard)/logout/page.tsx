"use client";
import { logout } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  // const router = useRouter();

  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //     router.push("/login");
  //     window.location.reload();
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  // useEffect(() => {
  //   handleLogout();
  // }, []);

  return null;
}
