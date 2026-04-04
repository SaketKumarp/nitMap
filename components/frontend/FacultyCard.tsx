"use client";

import { MapPin, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Faculty {
  name: string;
  department: string;
  location: string;
  room?: string;
  status?: string;
}

export const FacultyCard = ({ faculty }: { faculty: Faculty }) => {
  return (
    <Card
      className="
        bg-white/10 backdrop-blur-xl 
        border border-white/20 
        rounded-2xl shadow-md 
        hover:bg-white/15 hover:shadow-lg 
        transition-all duration-200
      "
    >
      <CardContent className="p-4 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <User className="text-white" size={20} />
          </div>

          <div>
            <h2 className="text-white font-semibold text-base">
              {faculty.name}
            </h2>

            <p className="text-sm text-gray-300">{faculty.department}</p>

            <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
              <MapPin size={12} />
              {faculty.location}
              {faculty.room && ` • ${faculty.room}`}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col items-end gap-2">
          {faculty.status && (
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                faculty.status === "AVAILABLE"
                  ? "bg-green-500/20 text-green-400"
                  : faculty.status === "BUSY"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              {faculty.status}
            </span>
          )}

          <Button
            size="sm"
            variant="outline"
            className="text-blue-400 border-blue-400 hover:bg-blue-500/10"
          >
            Find
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
