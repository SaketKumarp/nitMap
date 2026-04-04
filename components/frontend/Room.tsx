"use client";

import { Zap, QrCode } from "lucide-react";
import RoomCard from "./Roomcard";

type Room = {
  _id: string;
  name: string;
  block: string;
  status: "FREE" | "OCCUPIED";
  note: string;
};

export default function RoomsPanel({ rooms }: { rooms: Room[] }) {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {/* 🔥 Top Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          className="
            flex items-center justify-center gap-2
            p-4 rounded-2xl
            bg-gradient-to-r from-blue-500 to-indigo-600
            text-white font-semibold
            shadow-lg hover:scale-[1.03]
            transition-all
          "
        >
          <Zap size={18} />
          Nearest Free
        </button>

        <button
          className="
            flex items-center justify-center gap-2
            p-4 rounded-2xl
            bg-slate-800
            text-white font-semibold
            shadow-lg hover:bg-slate-700
            transition-all
          "
        >
          <QrCode size={18} />
          Admin QR
        </button>
      </div>

      {/* 📦 Room List */}
      {rooms.map((room) => (
        <RoomCard key={room._id} room={room} />
      ))}
    </div>
  );
}
