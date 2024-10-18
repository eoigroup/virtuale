"use client";

import Loader from "@/components/loader/loader";
import { checkAuthToken } from "@/lib/api/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function SocialPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = searchParams.get("token");
    if (!token) {
      router.push("/login");
      toast.error("Failed to login by google.");
    } else {
      try {
        await checkAuthToken({ token });
        toast.success("You are successfully logged in.");

        setTimeout(() => {
          router.push("/");
          window.location.reload();
        }, 500);
      } catch (err: any) {
        toast.error(err.message || "Failed to login by google.");

        setTimeout(() => {
          router.push("/login");
        }, 500);
      }
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader />
    </div>
  );
}
