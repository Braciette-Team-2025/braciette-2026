"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  refreshAccessToken,
  getCurrentUser,
} from "@/src/feature/auth/services/authApi";
import { useAuthStore } from "@/src/feature/auth/store/authStore";

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    let mounted = true;

    async function initializeAuthentication() {
      try {
        const status = searchParams.get("status");

        if (status !== "success") {
          router.replace("/login");
          return;
        }

        const accessToken = await refreshAccessToken();

        const userResponse = await getCurrentUser();

        useAuthStore.getState().setAuth(accessToken, userResponse.data);

        router.replace("/");
      } catch (error) {
        console.error("OAuth authentication failed:", error);

        if (mounted) {
          router.replace("/login");
        }
      }
    }

    initializeAuthentication();

    return () => {
      mounted = false;
    };
  }, [router, searchParams]);

  return (
    <main>
      <p>Signing you in...</p>
    </main>
  );
}
