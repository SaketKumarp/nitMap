"use client";

import Sidebar from "@/components/frontend/SideBar";
import DirectionsCard from "@/components/frontend/DirectionCard";
import Navbar from "@/components/frontend/Navbar";

import { useState } from "react";
import { dijkstra } from "@/lib/dijkistra";
import { edges, wheelchairEdges } from "@/data/edges";
import { getDirections } from "@/lib/getdirection";
import MapView from "@/components/frontend/MapView";

export default function Page() {
  const [activeTab, setActiveTab] = useState("navigate");
  const [routeStart, setRouteStart] = useState("gate");
  const [routeEnd, setRouteEnd] = useState("");
  const [wheelchair, setWheelchair] = useState(false);

  const graph = wheelchair ? wheelchairEdges : edges;

  const path = routeEnd ? dijkstra(graph, routeStart, routeEnd) : [];
  const steps = getDirections(path);
  const [selectedNode, setSelectedNode] = useState(null);

  return (
    <div className="min-h-screen bg-[#0b1220] text-white p-6 space-y-6">
      {/* ✅ Navbar */}
      <Navbar />

      {/* 🔷 Main Layout */}
      <div className="flex gap-6 h-[calc(100vh-110px)]">
        {/* Sidebar */}
        <div className="w-80 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            routeStart={routeStart}
            setRouteStart={setRouteStart}
            routeEnd={routeEnd}
            setRouteEnd={setRouteEnd}
            wheelchair={wheelchair}
            setWheelchair={setWheelchair}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
          />
        </div>

        {/* Map */}
        <div className="flex-1 relative rounded-2xl overflow-hidden border border-white/10 shadow-xl">
          <MapView
            routeStart={routeStart}
            routeEnd={routeEnd}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
          />

          {/* Directions overlay */}
          <div className="absolute right-4 top-24 z-10">
            <DirectionsCard steps={steps} />
          </div>
        </div>
      </div>
    </div>
  );
}
