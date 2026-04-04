"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useUser } from "@clerk/nextjs";
import type { FeatureCollection, Point } from "geojson"; // ✅ FIX

import { nodes } from "@/data/nodes";
import { edges } from "@/data/edges";
import { dijkstra } from "@/lib/dijkistra";
import { drawRoute } from "@/lib/drawRoutes";
import { findNearestNode } from "@/lib/nearestNodes";

import { heatmapData } from "@/data/heatmap";
import TopBar from "./TopBar";
import { createUserMarker } from "../user/UserMarker";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

/* ✅ TYPES */
type NodeType = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type?: string;
  image?: string;
  floors?: { label: string; value: string }[];
};

type UserLocation = {
  lat: number;
  lng: number;
};

type Props = {
  routeStart: string;
  routeEnd: string;
  selectedNode: NodeType | null;
  setSelectedNode: (node: NodeType | null) => void;
};

export default function MapView({
  routeStart,
  routeEnd,
  setSelectedNode,
}: Props) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);

  const [showHeatmap, setShowHeatmap] = useState(true);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  const { user } = useUser();

  /* 🗺️ INIT MAP */
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [91.7425, 25.2569],
      zoom: 17.5,
      pitch: 55,
      bearing: -10,
    });

    mapRef.current = map;

    map.on("load", () => {
      map.resize();

      /* 📍 MARKERS */
      Object.values(nodes).forEach((node: NodeType) => {
        if (node.type === "junction") return;

        const el = document.createElement("div");

        el.innerHTML = `
          <div class="flex flex-col items-center bg-black/60 backdrop-blur-md rounded-xl p-1 border border-white/20 shadow-lg hover:scale-105 transition">
            ${
              node.image
                ? `<img src="${node.image}" class="w-10 h-10 object-cover rounded-md" />`
                : ""
            }
            <div class="text-[10px] text-white mt-1 text-center">${node.name}</div>
          </div>
        `;

        new mapboxgl.Marker({
          element: el,
          anchor: "bottom",
        })
          .setLngLat([node.lng, node.lat])
          .addTo(map);

        el.addEventListener("click", () => {
          setSelectedNode(node);
        });
      });

      /* 🔥 HEATMAP (FIXED TYPE) */
      map.addSource("crowd-heat", {
        type: "geojson",
        data: heatmapData as FeatureCollection<Point>, // ✅ FIX
      });

      map.addLayer({
        id: "crowd-heatmap",
        type: "heatmap",
        source: "crowd-heat",
        paint: {
          "heatmap-intensity": 1.2,
          "heatmap-opacity": 0.6,
        },
      });
    });
  }, [setSelectedNode]);

  /* 🔥 TOGGLE */
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const visibility = showHeatmap ? "visible" : "none";

    if (map.getLayer("crowd-heatmap")) {
      map.setLayoutProperty("crowd-heatmap", "visibility", visibility);
    }
  }, [showHeatmap]);

  /* 📍 LOCATION */
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !user) return;

    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos: GeolocationPosition) => {
        const { latitude, longitude } = pos.coords;

        const location: UserLocation = {
          lat: latitude,
          lng: longitude,
        };

        setUserLocation(location);

        if (userMarkerRef.current) {
          userMarkerRef.current.setLngLat([longitude, latitude]);
        } else {
          const el = createUserMarker(user.imageUrl || "/default-avatar.png");

          const marker = new mapboxgl.Marker({
            element: el,
            anchor: "center",
          })
            .setLngLat([longitude, latitude])
            .addTo(map);

          userMarkerRef.current = marker;
        }

        map.easeTo({
          center: [longitude, latitude],
          duration: 800,
        });
      },
      console.error,
      { enableHighAccuracy: true },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [user]);

  /* 🧭 ROUTING */
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !routeEnd) return;

    let startNode: string | null = routeStart || null;

    if (routeStart === "myLocation" && userLocation) {
      startNode = findNearestNode(userLocation.lat, userLocation.lng, nodes);
    }

    if (!routeStart && userLocation) {
      startNode = findNearestNode(userLocation.lat, userLocation.lng, nodes);
    }

    // ✅ SAFE CHECK
    if (!startNode) return;

    const path = dijkstra(edges, startNode, routeEnd);
    drawRoute(map, path, nodes);

    const bounds = new mapboxgl.LngLatBounds();

    if (userLocation) {
      bounds.extend([userLocation.lng, userLocation.lat]);
    }

    path.forEach((id) => {
      const node = nodes[id];
      if (node) {
        bounds.extend([node.lng, node.lat]);
      }
    });

    map.fitBounds(bounds, { padding: 120, duration: 1500 });
  }, [routeStart, routeEnd, userLocation]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Top Bar */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <TopBar />
      </div>

      {/* Toggle */}
      <button
        onClick={() => setShowHeatmap((prev) => !prev)}
        className="absolute top-20 right-4 z-10 bg-black/70 px-4 py-2 rounded-xl text-white backdrop-blur-md"
      >
        {showHeatmap ? "Hide Crowd" : "Show Crowd"}
      </button>
    </div>
  );
}
