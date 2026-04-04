import { nodes } from "./nodes";

const crowdIntensity: any = {
  library: 0.9,
  block: 0.6,
  hostel: 0.4,
  gate: 0.5,
  junction: 0.3,
};

function generateHeatPoints() {
  const features: any[] = [];

  Object.values(nodes).forEach((node: any) => {
    const intensity = crowdIntensity[node.type] || 0.3;

    for (let i = 0; i < 5; i++) {
      const offsetLat = (Math.random() - 0.5) * 0.0003;
      const offsetLng = (Math.random() - 0.5) * 0.0003;

      features.push({
        type: "Feature",
        properties: { intensity },
        geometry: {
          type: "Point",
          coordinates: [node.lng + offsetLng, node.lat + offsetLat],
        },
      });
    }
  });

  return {
    type: "FeatureCollection",
    features,
  };
}

export const heatmapData = generateHeatPoints();
