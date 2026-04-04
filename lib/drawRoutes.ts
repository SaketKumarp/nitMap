export function drawRoute(
  map: any,
  path: string[],
  nodes: any,
  wheelchair?: boolean,
) {
  const coordinates = path.map((id) => [nodes[id].lng, nodes[id].lat]);

  const routeColor = wheelchair ? "#3b82f6" : "#22c55e";

  if (map.getLayer("route-line")) {
    map.removeLayer("route-line");
    map.removeSource("route");
  }

  map.addSource("route", {
    type: "geojson",
    lineMetrics: true,
    data: {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: coordinates,
      },
    },
  });

  map.addLayer({
    id: "route-line",
    type: "line",
    source: "route",
    layout: {
      "line-cap": "butt",
      "line-join": "miter",
    },
    paint: {
      "line-width": 6,
      "line-color": routeColor,
      "line-opacity": 0.9,
    },
  });

  // Snake animation (unchanged, only color variable used)
  let progress = 0;

  function animate() {
    progress += 0.005; // slower animation

    map.setPaintProperty("route-line", "line-gradient", [
      "interpolate",
      ["linear"],
      ["line-progress"],
      0,
      routeColor,
      progress,
      routeColor,
      progress + 0.02,
      "rgba(0,0,0,0)", // transparent tail
    ]);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // Make full line visible after animation
      map.setPaintProperty("route-line", "line-gradient", [
        "interpolate",
        ["linear"],
        ["line-progress"],
        0,
        routeColor,
        1,
        routeColor,
      ]);
    }
  }

  animate();
}
