"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";

export const useRooms = () => {
  const { isLoaded, isSignedIn } = useAuth();

 
  const rooms = useQuery(
    api.room.getUserRooms,
    isLoaded && isSignedIn ? {} : "skip",
  );

  return {
    rooms: rooms ?? [], // fallback
    isLoading: !isLoaded || rooms === undefined,
  };
};
