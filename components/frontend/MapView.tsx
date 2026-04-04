"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { createRoot } from "react-dom/client";
import { nodes } from "@/data/nodes";
import { edges } from "@/data/edges";
import { dijkstra } from "@/lib/dijkistra";
import { drawRoute } from "@/lib/drawRoutes";
import MapMarker from "./Mapmarker";
import { heatmapData } from "@/data/heatmap";
import TopBar from "./TopBar";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function MapView({ routeStart, routeEnd }: any) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<any[]>([]);
  const [showHeatmap, setShowHeatmap] = useState(true);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [91.7425, 25.2569],
      zoom: 17.5,
      pitch: 45,
    });

    mapRef.current = map;

    map.on("load", () => {
      map.resize();

      Object.values(nodes).forEach((node) => {
        const el = document.createElement("div");
        el.id = `marker-${node.id}`;

        const root = createRoot(el);
        root.render(<MapMarker active={false} type={node.type} />);

        const marker = new mapboxgl.Marker({ element: el, anchor: "bottom" })
          .setLngLat([node.lng, node.lat])
          .setPopup(new mapboxgl.Popup().setText(node.name))
          .addTo(map);

        markersRef.current.push(marker);
      });

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

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const visibility = showHeatmap ? "visible" : "none";

    if (map.getLayer("crowd-heatmap")) {
      map.setLayoutProperty("crowd-heatmap", "visibility", visibility);
    }
  }, [showHeatmap]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !routeStart || !routeEnd) return;

    const path = dijkstra(edges, routeStart, routeEnd);
    drawRoute(map, path, nodes);

    const bounds = new mapboxgl.LngLatBounds();
    path.forEach((id) => {
      bounds.extend([nodes[id].lng, nodes[id].lat]);
    });

    map.fitBounds(bounds, { padding: 120, duration: 1500 });
  }, [routeStart, routeEnd]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* 🔷 TopBar inside map */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <TopBar />
      </div>

      {/* 🔥 Heatmap Button */}
      <button
        onClick={() => setShowHeatmap((prev) => !prev)}
        className="absolute top-20 right-4 z-10 bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10"
      >
        {showHeatmap ? "Hide Crowd" : "Show Crowd"}
      </button>
    </div>
  );
}
 