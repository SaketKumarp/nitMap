type NodeType = {
  id: string;
  lat: number;
  lng: number;
};

export function findNearestNode(
  lat: number,
  lng: number,
  nodes: Record<string, NodeType>,
): string | null {
  let closestNode: string | null = null;
  let minDistance = Infinity;

  Object.values(nodes).forEach((node) => {
    const dist = Math.sqrt(
      Math.pow(lat - node.lat, 2) + Math.pow(lng - node.lng, 2),
    );

    if (dist < minDistance) {
      minDistance = dist;
      closestNode = node.id;
    }
  });

  return closestNode;
}
