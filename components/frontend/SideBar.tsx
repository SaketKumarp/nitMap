"use client";

import { Navigation, DoorOpen, CalendarDays, MapPin } from "lucide-react";

export default function Sidebar({
  activeTab,
  setActiveTab,
  routeStart,
  setRouteStart,
  routeEnd,
  setRouteEnd,
}: any) {
  return (
    <div className="w-80 h-full p-5 flex flex-col gap-6">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-xl">
          <MapPin />
        </div>
        <div>
          <h1 className="text-lg font-bold">CampusFlow</h1>
          <p className="text-xs text-gray-400">Smart Navigator</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setActiveTab("navigate")}
          className={`flex items-center gap-2 p-3 rounded-xl ${
            activeTab === "navigate"
              ? "bg-blue-600"
              : "bg-white/5 hover:bg-white/10"
          }`}
        >
          <Navigation size={18} /> Route
        </button>

        <button
          onClick={() => setActiveTab("rooms")}
          className={`flex items-center gap-2 p-3 rounded-xl ${
            activeTab === "rooms"
              ? "bg-blue-600"
              : "bg-white/5 hover:bg-white/10"
          }`}
        >
          <DoorOpen size={18} /> Rooms
        </button>

        <button
          onClick={() => setActiveTab("schedule")}
          className={`flex items-center gap-2 p-3 rounded-xl ${
            activeTab === "schedule"
              ? "bg-blue-600"
              : "bg-white/5 hover:bg-white/10"
          }`}
        >
          <CalendarDays size={18} /> Schedule
        </button>
      </div>

      {/* Route Panel */}
      {activeTab === "navigate" && (
        <div className="glass p-4 rounded-2xl space-y-3">
          <div>
            <label className="text-sm text-gray-300">Start</label>
            <select
              value={routeStart}
              onChange={(e) => setRouteStart(e.target.value)}
              className="w-full mt-1 p-2 rounded-lg bg-black/30 border border-white/10"
            >
              <option value="gate">Gate</option>
              <option value="admin">Admin</option>
              <option value="library">Library</option>
              <option value="blockA">Block A</option>
              <option value="blockC">Block C</option>
              <option value="blockD">Block D</option>
              <option value="boysHostel">Boys Hostel</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-300">Destination</label>
            <select
              value={routeEnd}
              onChange={(e) => setRouteEnd(e.target.value)}
              className="w-full mt-1 p-2 rounded-lg bg-black/30 border border-white/10"
            >
              <option value="">Select</option>
              <option value="admin">Admin</option>
              <option value="library">Library</option>
              <option value="blockA">Block A</option>
              <option value="blockC">Block C</option>
              <option value="blockD">Block D</option>
              <option value="boysHostel">Boys Hostel</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-300">
            <input type="checkbox" />
            Wheelchair Accessible
          </div>
        </div>
      )}
    </div>
  );
}
