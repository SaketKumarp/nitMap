"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Clock,
  MapPin,
  BookOpen,
  Bell,
  Layers,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import Image from "next/image";

export default function FormPage() {
  const router = useRouter();
  const addSchedule = useMutation(api.schedules.createSchedule);

  const [loading, setLoading] = useState(false);

  const [schedule, setSchedule] = useState({
    title: "",
    time: "",
    location: "",
    block: "",
    reminder: "",
  });

  const handleSchedule = async (e: any) => {
    e.preventDefault();

    // ✅ Basic validation
    if (
      !schedule.title ||
      !schedule.time ||
      !schedule.location ||
      !schedule.block
    ) {
      toast.error("Please fill all required fields ⚠️");
      return;
    }

    try {
      setLoading(true);

      await addSchedule({
        title: schedule.title,
        time: schedule.time,
        location: schedule.location,
        block: schedule.block,
        reminder: schedule.reminder || undefined, // ✅ optional
      });

      toast.success("Schedule added 🎉");

      // ✅ Reset form
      setSchedule({
        title: "",
        time: "",
        location: "",
        block: "",
        reminder: "",
      });

      // ✅ Redirect
      setTimeout(() => {
        router.push("/");
      }, 800);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add schedule ❌");
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
          className="object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      {/* 🧊 Form */}
      <div className="w-full max-w-xl">
        <Card className="p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
          <h2 className="text-white text-lg font-semibold flex items-center gap-2 mb-4">
            <CalendarDays className="text-blue-400" />
            Add Schedule
          </h2>

          <form onSubmit={handleSchedule} className="space-y-4">
            <FormField
              icon={<BookOpen size={14} />}
              label="Title"
              placeholder="e.g. Operating Systems"
              value={schedule.title}
              onChange={(v) => setSchedule({ ...schedule, title: v })}
            />

            <FormField
              icon={<Clock size={14} />}
              label="Time"
              type="time"
              value={schedule.time}
              onChange={(v) => setSchedule({ ...schedule, time: v })}
            />

            <FormField
              icon={<MapPin size={14} />}
              label="Location"
              placeholder="e.g. CS Lecture Hall"
              value={schedule.location}
              onChange={(v) => setSchedule({ ...schedule, location: v })}
            />

            <FormField
              icon={<Layers size={14} />}
              label="Block"
              placeholder="e.g. CS Block"
              value={schedule.block}
              onChange={(v) => setSchedule({ ...schedule, block: v })}
            />

            <FormField
              icon={<Bell size={14} />}
              label="Reminder (optional)"
              placeholder="e.g. 5 mins before"
              value={schedule.reminder}
              onChange={(v) => setSchedule({ ...schedule, reminder: v })}
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 rounded-xl"
            >
              {loading ? "Saving..." : "Save Schedule"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

/* 🔹 Reusable Field */
function FormField({
  label,
  value,
  onChange,
  icon,
  type = "text",
  placeholder,
}: any) {
  return (
    <div>
      <Label className="text-gray-300 text-sm flex items-center gap-2">
        {icon} {label}
      </Label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 bg-black/30 border-white/10 text-white rounded-lg"
      />
    </div>
  );
}
