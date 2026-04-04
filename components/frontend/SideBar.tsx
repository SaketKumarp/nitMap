"use client";

import { Navigation, DoorOpen, CalendarDays, Users } from "lucide-react";

import RoomsPanel from "./Room";
import ScheduleCard from "./ScheduleCard";
import FacultyCard from "./FacultyCard";
import Image from "next/image";

export default function Sidebar({
  activeTab,
  setActiveTab,
  routeStart,
  setRouteStart,
  routeEnd,
  setRouteEnd,
  wheelchair,
  setWheelchair,
}: any) {
  // 🔥 Dummy Data (replace with API later)
  const schedule = [
    {
      time: "09:00 AM",
      title: "Operating Systems",
      location: "CS Lecture Hall",
      block: "CS Block",
    },
    {
      time: "11:30 AM",
      title: "Data Structures",
      location: "EC Seminar Room",
      block: "EC Block",
      isActive: true,
      reminder: "In 5 mins",
    },
    {
      time: "02:00 PM",
      title: "Hackathon Meeting",
      location: "Discussion Room",
      block: "Library",
    },
  ];

  const facultyList = [
    {
      name: "Dr. A. Sharma",
      department: "Computer Science",
      location: "Cabin 4",
      status: "AVAILABLE",
    },
    {
      name: "Prof. V. Verma",
      department: "Electronics",
      location: "Room 201",
      status: "BUSY",
    },
    {
      name: "Dr. S. Gupta",
      department: "Mathematics",
      location: "On Leave",
      status: "ON_LEAVE",
    },
  ];

  return (
    <div className="w-80 h-full p-6 flex flex-col gap-6 border-r border-white/10 bg-black/40 backdrop-blur-xl">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-white/10 shadow-md">
          <Image
            src="/school.png"
            alt="Campus Logo"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-white">Sohra Campus</h1>
          <p className="text-xs text-gray-400">Smart Campus Navigation</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-between bg-white/10 p-1 rounded-2xl">
        <TabButton
          icon={<Navigation size={18} />}
          label="Route"
          active={activeTab === "navigate"}
          onClick={() => setActiveTab("navigate")}
        />

        <TabButton
          icon={<DoorOpen size={18} />}
          label="Rooms"
          active={activeTab === "rooms"}
          onClick={() => setActiveTab("rooms")}
        />

        <TabButton
          icon={<CalendarDays size={18} />}
          label="Schedule"
          active={activeTab === "schedule"}
          onClick={() => setActiveTab("schedule")}
        />

        <TabButton
          icon={<Users size={18} />}
          label="Faculty"
          active={activeTab === "faculty"}
          onClick={() => setActiveTab("faculty")}
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-4">
        {/* Route */}
        {activeTab === "navigate" && (
          <div className="bg-white/10 p-4 rounded-2xl space-y-4 border border-white/20">
            <SelectBox
              label="Start"
              value={routeStart}
              onChange={(e: any) => setRouteStart(e.target.value)}
              options={[
                { value: "gate", label: "Gate" },
                { value: "admin", label: "Admin" },
                { value: "library", label: "Library" },
                { value: "blockA", label: "Block A" },
                { value: "blockC", label: "Block C" },
                { value: "blockD", label: "Block D" },
                { value: "boysHostel", label: "Boys Hostel" },
              ]}
            />

            <SelectBox
              label="Destination"
              value={routeEnd}
              onChange={(e: any) => setRouteEnd(e.target.value)}
              options={[
                { value: "", label: "Select" },
                { value: "admin", label: "Admin" },
                { value: "library", label: "Library" },
                { value: "blockA", label: "Block A" },
                { value: "blockC", label: "Block C" },
                { value: "blockD", label: "Block D" },
                { value: "boysHostel", label: "Boys Hostel" },
              ]}
            />

            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={wheelchair}
                onChange={(e) => setWheelchair(e.target.checked)}
              />
              Wheelchair Accessible Route
            </label>
          </div>
        )}

        {/* Rooms */}
        {activeTab === "rooms" && <RoomsPanel />}

        {/* Schedule */}
        {activeTab === "schedule" &&
          schedule.map((item, i) => <ScheduleCard key={i} item={item} />)}

        {/* Faculty */}
        {activeTab === "faculty" &&
          facultyList.map((faculty, i) => (
            <FacultyCard key={i} faculty={faculty} />
          ))}
      </div>
    </div>
  );
}

/* 🔘 Tab Button */
function TabButton({ icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 flex-1 py-2 rounded-xl text-xs transition-all
        ${
          active
            ? "bg-blue-500/20 text-blue-400"
            : "text-gray-400 hover:text-white"
        }`}
    >
      {icon}
      {label}
    </button>
  );
}

/* 🔽 Select Box */
function SelectBox({ label, value, onChange, options }: any) {
  return (
    <div>
      <label className="text-xs text-gray-400">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full mt-1 p-2 rounded-lg bg-black/30 border border-white/10 text-white focus:outline-none"
      >
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
