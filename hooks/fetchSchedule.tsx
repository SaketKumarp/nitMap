"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";

export const useSchedules = () => {
  const { isLoaded, isSignedIn } = useAuth();

  // 🚫 Don't call query until auth is ready
  const schedules = useQuery(
    api.schedules.getUserSchedules,
    isLoaded && isSignedIn ? {} : "skip",
  );

  return {
    schedules,
    isLoading: !isLoaded || schedules === undefined,
  };
};
