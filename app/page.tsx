"use client";

import MapView from "@/components/frontend/MapView";
import Sidebar from "@/components/frontend/SideBar";
import TopBar from "@/components/frontend/TopBar";

import { useState } from "react";
import { dijkstra } from "@/lib/dijkistra";
import { edges } from "@/data/edges";
import { getDirections } from "@/lib/getdirection";
import DirectionsCard from "@/components/frontend/DirectionCard";

export default function Page() {
  const [activeTab, setActiveTab] = useState("navigate");
  const [routeStart, setRouteStart] = useState("gate");
  const [routeEnd, setRouteEnd] = useState("");

  // 🔥 THIS IS WHERE PATH IS CALCULATED
  const path = routeEnd ? dijkstra(edges, routeStart, routeEnd) : [];

  // 🔥 THIS IS WHERE DIRECTIONS ARE GENERATED
  const steps = getDirections(path);

  return (
    <div className="flex h-screen text-white">
      {/* Sidebar */}
      <div className="glass-dark m-3 rounded-2xl">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          routeStart={routeStart}
          setRouteStart={setRouteStart}
          routeEnd={routeEnd}
          setRouteEnd={setRouteEnd}
        />
      </div>

      {/* Map Area */}
      <div className="flex-1 p-3">
        <div className="w-full h-full rounded-2xl overflow-hidden relative glass">
          <TopBar />
          <MapView routeStart={routeStart} routeEnd={routeEnd} />

          {/* 🔥 DIRECTIONS CARD HERE */}
          <DirectionsCard steps={steps} />
        </div>
      </div>
    </div>
  );
}
