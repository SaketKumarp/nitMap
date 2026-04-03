"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { createRoot } from "react-dom/client";
import { nodes } from "@/data/nodes";
import { edges } from "@/data/edges";
import { dijkstra } from "@/lib/dijkistra";
import { drawRoute } from "@/lib/drawRoutes";
import MapMarker from "./Mapmarker";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function MapView({ routeStart, routeEnd }: any) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<any[]>([]);

  // Create map only once
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapRef.current) return;

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

      // Add markers only once
      Object.values(nodes).forEach((node) => {
        const el = document.createElement("div");
        el.id = `marker-${node.id}`;

        const root = createRoot(el);
        root.render(<MapMarker active={false} type={node.type} />);

        const marker = new mapboxgl.Marker({
          element: el,
          anchor: "bottom",
        })
          .setLngLat([node.lng, node.lat])
          .setPopup(new mapboxgl.Popup().setText(node.name))
          .addTo(map);

        markersRef.current.push(marker);
      });
    });
  }, []);

  // Draw route when start/end changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (!routeStart || !routeEnd) return;

    const path = dijkstra(edges, routeStart, routeEnd);
    drawRoute(map, path, nodes);

    // Auto zoom to route
    const bounds = new mapboxgl.LngLatBounds();
    path.forEach((id) => {
      bounds.extend([nodes[id].lng, nodes[id].lat]);
    });
    map.fitBounds(bounds, { padding: 120, duration: 2000 });

    // Animate markers
    Object.values(nodes).forEach((node) => {
      const el = document.getElementById(`marker-${node.id}`);
      if (el) el.classList.remove("active-marker");
    });

    path.forEach((nodeId, index) => {
      setTimeout(() => {
        const el = document.getElementById(`marker-${nodeId}`);
        if (el) el.classList.add("active-marker");
      }, index * 500);
    });
  }, [routeStart, routeEnd]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
}
