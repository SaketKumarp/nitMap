import mapboxgl from "mapbox-gl";
import { NodeType } from "@/types/map";

export function drawRoute(
  map: mapboxgl.Map,
  path: string[],
  nodes: Record<string, NodeType>,
) {
  const coordinates: [number, number][] = path.map((node) => [
    nodes[node].lng,
    nodes[node].lat,
  ]);

  if (map.getSource("route")) {
    (map.getSource("route") as mapboxgl.GeoJSONSource).setData({
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates,
      },
      properties: {},
    });
    return;
  }

  map.addSource("route", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates,
      },
      properties: {},
    },
  });

  map.addLayer({
    id: "route",
    type: "line",
    source: "route",
    paint: {
      "line-color": "#3b82f6",
      "line-width": 5,
    },
  });
}
