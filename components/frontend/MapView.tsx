"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { createRoot } from "react-dom/client";
import { useUser } from "@clerk/nextjs";

import { nodes } from "@/data/nodes";
import { edges } from "@/data/edges";
import { dijkstra } from "@/lib/dijkistra";
import { drawRoute } from "@/lib/drawRoutes";
import { findNearestNode } from "@/lib/nearestNodes";

import MapMarker from "./Mapmarker";
import { heatmapData } from "@/data/heatmap";
import TopBar from "./TopBar";
import { createUserMarker } from "../user/UserMarker";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function MapView({ routeStart, routeEnd }: any) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<any[]>([]);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);

  const [showHeatmap, setShowHeatmap] = useState(true);
  const [userLocation, setUserLocation] = useState<any>(null);

  const { user } = useUser();

  /* 🗺️ INIT MAP */
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [91.7425, 25.2569],
      zoom: 17.5,
      pitch: 55, // 🔥 more 3D feel
      bearing: -10,
    });

    mapRef.current = map;

    map.on("load", () => {
      map.resize();

      /* 📍 STATIC MARKERS WITH PREMIUM POPUP */
      Object.values(nodes).forEach((node) => {
        const el = document.createElement("div");

        const root = createRoot(el);
        root.render(<MapMarker active={false} type={node.type} />);

        /* 🔥 GLASS POPUP */
        const popupContent = document.createElement("div");
        popupContent.className = "popup-3d";

        popupContent.innerHTML = `
          <div class="glass-card">
            ${
              node.image
                ? `<div class="img-wrap">
                     <img src="${node.image}" />
                   </div>`
                : ""
            }
            <div class="title">${node.name}</div>
          </div>
        `;

        /* 🎯 TILT EFFECT */
        popupContent.addEventListener("mousemove", (e: any) => {
          const card = popupContent.querySelector(".glass-card") as HTMLElement;
          const rect = card.getBoundingClientRect();

          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const rotateX = (y / rect.height - 0.5) * 10;
          const rotateY = (x / rect.width - 0.5) * -10;

          card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        popupContent.addEventListener("mouseleave", () => {
          const card = popupContent.querySelector(".glass-card") as HTMLElement;
          card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
        });

        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
        }).setDOMContent(popupContent);

        const marker = new mapboxgl.Marker({
          element: el,
          anchor: "bottom",
        })
          .setLngLat([node.lng, node.lat])
          .setPopup(popup)
          .addTo(map);

        markersRef.current.push(marker);
      });

      /* 🔥 HEATMAP */
      map.addSource("crowd-heat", {
        type: "geojson",
        data: heatmapData,
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
  }, []);

  /* 🔥 HEATMAP TOGGLE */
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const visibility = showHeatmap ? "visible" : "none";

    if (map.getLayer("crowd-heatmap")) {
      map.setLayoutProperty("crowd-heatmap", "visibility", visibility);
    }
  }, [showHeatmap]);

  /* 📍 REAL-TIME LOCATION */
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !user) return;

    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        setUserLocation({ lat: latitude, lng: longitude });

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

    let startNode = routeStart;

    if (routeStart === "myLocation" && userLocation) {
      startNode = findNearestNode(userLocation.lat, userLocation.lng, nodes);
    }

    if (!routeStart && userLocation) {
      startNode = findNearestNode(userLocation.lat, userLocation.lng, nodes);
    }

    if (!startNode) return;

    const path = dijkstra(edges, startNode, routeEnd);
    drawRoute(map, path, nodes);

    const bounds = new mapboxgl.LngLatBounds();

    if (userLocation) {
      bounds.extend([userLocation.lng, userLocation.lat]);
    }

    path.forEach((id) => {
      bounds.extend([nodes[id].lng, nodes[id].lat]);
    });

    map.fitBounds(bounds, { padding: 120, duration: 1500 });
  }, [routeStart, routeEnd, userLocation]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainerRef} className="w-full h-full" />

      <div className="absolute top-4 left-4 right-4 z-10">
        <TopBar />
      </div>

      <button
        onClick={() => setShowHeatmap((prev) => !prev)}
        className="absolute top-20 right-4 z-10 bg-black/70 px-4 py-2 rounded-xl text-white"
      >
        {showHeatmap ? "Hide Crowd" : "Show Crowd"}
      </button>

      {/* 🔥 STYLES */}
      <style jsx global>{`
        .popup-3d {
          perspective: 1000px;
        }

        .glass-card {
          width: 200px;
          border-radius: 16px;
          overflow: hidden;
          backdrop-filter: blur(14px);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          transform-style: preserve-3d;
          transition: all 0.2s ease;
          animation: popIn 0.3s ease;
        }

        .img-wrap img {
          width: 100%;
          height: 120px;
          object-fit: cover;
        }

        .title {
          padding: 10px;
          font-size: 14px;
          font-weight: 600;
          color: white;
        }

        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
