"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { nodes } from "@/data/nodes";
import { edges } from "@/data/edges";
import { dijkstra } from "@/lib/dijkistra";
import { drawRoute } from "@/lib/drawRoutes";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function MapView({ routeStart, routeEnd }: any) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

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

      // Add markers
      Object.values(nodes).forEach((node) => {
        const el = document.createElement("div");
        el.className = "marker";

        new mapboxgl.Marker({ element: el, anchor: "center" })
          .setLngLat([node.lng, node.lat])
          .setPopup(new mapboxgl.Popup().setText(node.name))
          .addTo(map);
      });

      // Draw route
      if (routeStart && routeEnd) {
        const path = dijkstra(edges, routeStart, routeEnd);
        console.log(path);
        drawRoute(map, path, nodes);
      }
    });

    return () => map.remove();
  }, [routeStart, routeEnd]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
}
