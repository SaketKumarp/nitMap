"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { nodes } from "@/data/nodes";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

function getMarkerColor(type: string) {
  switch (type) {
    case "gate":
      return "green";
    case "block":
      return "blue";
    case "library":
      return "purple";
    case "hostel":
      return "orange";
    default:
      return "red";
  }
}

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [91.7425, 25.2569],
      zoom: 17,
      attributionControl: false,
    });

    mapRef.current = map;

    map.on("load", () => {
      // IMPORTANT: resize map after load
      map.resize();

      Object.values(nodes).forEach((node) => {
        const el = document.createElement("div");
        el.style.backgroundColor = getMarkerColor(node.type);
        el.style.width = "14px";
        el.style.height = "14px";
        el.style.borderRadius = "50%";
        el.style.border = "2px solid white";

        new mapboxgl.Marker({
          element: el,
          anchor: "center", // VERY IMPORTANT
        })
          .setLngLat([node.lng, node.lat])
          .setPopup(new mapboxgl.Popup().setText(node.name))
          .addTo(map);
      });
    });

    // Fix for resize / scroll glitch
    window.addEventListener("resize", () => map.resize());

    return () => map.remove();
  }, []);

  return <div ref={mapContainerRef} className="w-full h-full" />;
}
