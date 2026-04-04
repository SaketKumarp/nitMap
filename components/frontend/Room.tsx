"use client";

import { Zap, QrCode } from "lucide-react";
import RoomCard from "./Roomcard";

type Room = {
  name: string;
  block: string;
  status: "FREE" | "OCCUPIED";
  note: string;
};

const rooms: Room[] = [
  {
    name: "CS Lab 1",
    block: "CS Block",
    status: "FREE",
    note: "Available until 14:00",
  },
  {
    name: "CS Lecture Hall",
    block: "CS Block",
    status: "OCCUPIED",
    note: "Class until 11:30",
  },
  {
    name: "EC Electronics Lab",
    block: "EC Block",
    status: "OCCUPIED",
    note: "Class in progress",
  },
  {
    name: "EC Seminar Room",
    block: "EC Block",
    status: "FREE",
    note: "Available all day",
  },

  {
    name: "LH 1",
    block: "Academic Block",
    status: "FREE",
    note: "Available until 12:00",
  },
  {
    name: "LH 2",
    block: "Academic Block",
    status: "OCCUPIED",
    note: "Class in progress",
  },
  {
    name: "LH 3",
    block: "Academic Block",
    status: "FREE",
    note: "Available all day",
  },
  {
    name: "LH 4",
    block: "Academic Block",
    status: "OCCUPIED",
    note: "Lecture until 2:00 PM",
  },

  // 📚 Library Rooms
  {
    name: "Library Room 301",
    block: "Library",
    status: "FREE",
    note: "Silent study space",
  },
  {
    name: "Library Room 302",
    block: "Library",
    status: "OCCUPIED",
    note: "Group discussion ongoing",
  },
  {
    name: "Library Room 201",
    block: "Library",
    status: "FREE",
    note: "Available",
  },
  {
    name: "Library Room 202",
    block: "Library",
    status: "FREE",
    note: "Available",
  },

  // 💻 CS Labs
  {
    name: "CS Lab 1",
    block: "CS Block",
    status: "OCCUPIED",
    note: "Lab session running",
  },
  {
    name: "CS Lab 2",
    block: "CS Block",
    status: "FREE",
    note: "Available after 1:00 PM",
  },

  // 🌐 Language Lab
  {
    name: "Language Lab",
    block: "Humanities Block",
    status: "FREE",
    note: "Available all day",
  },
];

export default function RoomsPanel() {
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
      {rooms.map((room, index) => (
        <RoomCard key={index} room={room} />
      ))}
    </div>
  );
}
