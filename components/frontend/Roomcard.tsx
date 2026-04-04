"use client";

import { MapPin, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Room = {
  name: string;
  block: string;
  status: "FREE" | "OCCUPIED";
  note: string;
};

export default function RoomCard({ room }: { room: Room }) {
  return (
    <Card
      className="
        bg-white/10 
        backdrop-blur-xl 
        border border-white/20 
        shadow-lg 
        rounded-2xl 
        hover:bg-white/15 
        hover:shadow-xl 
        transition-all duration-200
      "
    >
      <CardContent className="p-4 space-y-3">
        {/* Title + Status */}
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg text-white">{room.name}</h2>

          <Badge
            variant="outline"
            className={`flex items-center gap-1 px-3 py-1 text-xs font-medium ${
              room.status === "FREE"
                ? "border-green-400 text-green-400"
                : "border-red-400 text-red-400"
            }`}
          >
            {room.status === "FREE" ? (
              <CheckCircle2 size={14} />
            ) : (
              <XCircle size={14} />
            )}
            {room.status}
          </Badge>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <MapPin size={14} />
          {room.block}
        </div>

        {/* Note */}
        <p className="text-sm text-gray-400">{room.note}</p>
      </CardContent>
    </Card>
  );
}
