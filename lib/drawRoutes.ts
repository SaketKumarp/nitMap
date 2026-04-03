export function drawRoute(map: any, path: string[], nodes: any) {
  const coordinates = path.map((id) => [nodes[id].lng, nodes[id].lat]);

  if (map.getLayer("route-line")) {
    map.removeLayer("route-line");
    map.removeSource("route");
  }

  map.addSource("route", {
    type: "geojson",
    lineMetrics: true, // IMPORTANT for animation
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
      "line-color": "#22c55e",
      "line-opacity": 0.9,
      "line-gradient": [
        "interpolate",
        ["linear"],
        ["line-progress"],
        0,
        "rgba(34,197,94,0)",
        0.1,
        "#22c55e",
        1,
        "#22c55e",
      ],
    },
  });

  // Animate snake
  let progress = 0;

  function animate() {
    progress += 0.01;

    map.setPaintProperty("route-line", "line-gradient", [
      "interpolate",
      ["linear"],
      ["line-progress"],
      0,
      "rgba(34,197,94,0)",
      progress,
      "#22c55e",
      progress + 0.02,
      "rgba(34,197,94,0)",
    ]);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}
