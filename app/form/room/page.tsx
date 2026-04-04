"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Home, MapPin, FileText, ArrowLeft } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import Image from "next/image";

export default function RoomFormPage() {
  const router = useRouter();
  const createRoom = useMutation(api.room.createRoom);

  const [loading, setLoading] = useState(false);

  const [room, setRoom] = useState({
    name: "",
    block: "",
    status: "FREE",
    note: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!room.name || !room.block) {
      toast.error("Fill required fields ⚠️");
      return;
    }

    try {
      setLoading(true);

      await createRoom({
        name: room.name,
        block: room.block,
        status: room.status as "FREE" | "OCCUPIED",
        note: room.note,
      });

      toast.success("Room added 🏠");

      setTimeout(() => {
        router.push("/");
      }, 800);
    } catch (err) {
      console.error(err);
      toast.error("Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-10">
      {/* 🌌 Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/nitm.png"
          alt="bg"
          fill
          priority
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>
 
      <button
        onClick={() => router.push("/")}
        className="
          absolute top-6 left-6 flex items-center gap-2
          px-4 py-2 rounded-xl
          bg-white/10 backdrop-blur-xl
          border border-white/20
          text-white text-sm
          hover:bg-white/20 transition-all
        "
      >
        <ArrowLeft size={16} />
        Back
      </button>
 
      <div className="w-full max-w-xl">
        <Card className="p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
          <h2 className="text-white text-lg font-semibold flex items-center gap-2 mb-4">
            <Home className="text-green-400" />
            Add Room
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              icon={<Home size={14} />}
              label="Room Name"
              placeholder="e.g. Room 101"
              value={room.name}
              onChange={(v) => setRoom({ ...room, name: v })}
            />

            <FormField
              icon={<MapPin size={14} />}
              label="Block"
              placeholder="e.g. CS Block"
              value={room.block}
              onChange={(v) => setRoom({ ...room, block: v })}
            />

            {/* Status */}
            <div>
              <Label className="text-gray-300 text-sm">Status</Label>
              <select
                value={room.status}
                onChange={(e) => setRoom({ ...room, status: e.target.value })}
                className="w-full mt-1 p-2 rounded-lg bg-black/30 text-white border border-white/10"
              >
                <option value="FREE">FREE</option>
                <option value="OCCUPIED">OCCUPIED</option>
              </select>
            </div>

            <FormField
              icon={<FileText size={14} />}
              label="Note"
              placeholder="e.g. Projector available"
              value={room.note}
              onChange={(v) => setRoom({ ...room, note: v })}
            />

            {/* 🚀 Premium Button */}
            <Button
              type="submit"
              disabled={loading}
              className="
                relative w-full mt-2 rounded-xl
                bg-gradient-to-r from-green-500 to-emerald-600
                hover:from-green-600 hover:to-emerald-700
                text-white font-medium
                shadow-lg
                transition-all duration-300
                hover:scale-[1.02]
                disabled:opacity-60
              "
            >
              {/* Glow */}
              <span className="absolute inset-0 rounded-xl border border-green-400/30 blur-sm"></span>

              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Saving...
                </span>
              ) : (
                "Save Room"
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

 
function FormField({ label, value, onChange, icon, placeholder }: any) {
  return (
    <div>
      <Label className="text-gray-300 text-sm flex items-center gap-2">
        {icon} {label}
      </Label>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 bg-black/30 border-white/10 text-white rounded-lg"
      />
    </div>
  );
}
