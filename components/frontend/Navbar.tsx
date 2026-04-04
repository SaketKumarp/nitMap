"use client";

import Image from "next/image";
import { Bell, Home, Plus, Search } from "lucide-react";
import UserProfileButton from "../user/UserProfile";
import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const { user } = useUser();
  return (
    <div
      className="flex items-center justify-between px-6 py-4 rounded-2xl 
      bg-white/10 backdrop-blur-2xl border border-white/10 shadow-xl"
    >
      {/* 🔷 LEFT: Logo + Name */}
      <div className="flex items-center gap-4">
        {/* 🔥 Image Logo */}
        <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-md border border-white/10">
          <Image src="/nit.webp" alt="NIT Logo" fill className="object-cover" />
        </div>

        <div>
          <h1 className="text-lg font-semibold text-white tracking-tight">
            NIT Flow
          </h1>
          <p className="text-xs text-gray-400">Navigate inside campus</p>
        </div>
      </div>

      {/* 🔷 CENTER: Search */}
      <div
        className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl 
        bg-white/5 border border-white/10 w-80"
      >
        <Search size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search rooms, blocks..."
          className="bg-transparent outline-none text-sm text-white w-full placeholder:text-gray-500"
        />
      </div>

      {/* 🔷 RIGHT: Actions */}
      <div className="flex items-center gap-4">
        {/* Plan Badge */}
        <div
          className="hidden md:flex text-xs px-3 py-1 rounded-full 
          bg-blue-500/20 text-blue-400 border border-blue-500/30"
        >
          <Button
            onClick={() => router.replace("/form/sc")}
            className="
    relative flex items-center gap-2 px-4 py-2 rounded-xl
    bg-white/10 backdrop-blur-xl
    border border-white/20
    text-white text-sm font-medium
    shadow-lg
    hover:bg-white/20
    transition-all duration-300
    hover:scale-105
  "
          >
            {/* Neon border glow */}
            <span className="absolute inset-0 rounded-xl border border-blue-400/30 blur-sm"></span>
            <Plus size={16} className="text-blue-400" />
            Add Schedule
          </Button>
        </div>
        <div className="hidden md:flex">
          <Button
            onClick={() => router.replace("/form/room")}
            className="
        relative flex items-center gap-2 px-4 py-2 rounded-xl
        bg-white/10 backdrop-blur-xl
        border border-white/20
        text-white text-sm font-medium
        shadow-lg
        hover:bg-white/20
        transition-all duration-300
        hover:scale-105
      "
          >
            <span className="absolute inset-0 rounded-xl border border-green-400/30 blur-sm"></span>
            <Home size={16} className="text-green-400" />
            Add Room
          </Button>
        </div>
        <div
          className="hidden md:flex text-xs px-3 py-1 rounded-full 
          bg-blue-500/20 text-blue-400 border border-blue-500/30"
        >
          🚀 Pro
        </div>

        {/* Notification */}
        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
          <Bell size={18} />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
          <UserProfileButton />
          <span className="text-sm text-gray-300 hidden sm:block">
            {user?.firstName || "user"}
          </span>
        </div>
      </div>
    </div>
  );
}
