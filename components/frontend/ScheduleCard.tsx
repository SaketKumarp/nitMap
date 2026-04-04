"use client";

import { MapPin, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ScheduleItem = {
  time: string;
  title: string;
  location: string;
  block: string;
  isActive?: boolean;
  reminder?: string; // e.g. "In 5 mins"
};

export default function ScheduleCard({ item }: { item: ScheduleItem }) {
  return (
    <div className="flex items-start gap-4">
      {/* Timeline Dot */}
      <div className="flex flex-col items-center">
        <div
          className={`w-3 h-3 rounded-full ${
            item.isActive ? "bg-blue-500" : "bg-gray-400"
          }`}
        />
        <div className="w-[2px] flex-1 bg-gray-300 mt-1" />
      </div>

      {/* Card */}
      <Card
        className={`
          w-full rounded-2xl shadow-md transition-all duration-200
          ${
            item.isActive
              ? "bg-blue-50 border-blue-200 shadow-lg"
              : "bg-white border-gray-200"
          }
        `}
      >
        <CardContent className="p-4 space-y-2">
          {/* Time + Reminder */}
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-500">
              {item.time}
            </span>

            {item.reminder && (
              <span className="flex items-center gap-1 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                <Bell size={12} />
                {item.reminder}
              </span>
            )}
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin size={14} />
            {item.location} ({item.block})
          </div>

          {/* CTA (only if active) */}
          {item.isActive && (
            <Button className="w-full mt-2 rounded-xl">
              Show Route to Class
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
