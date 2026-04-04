export function findNearestNode(lat: number, lng: number, nodes: any) {
  let closestNode = null;
  let minDistance = Infinity;

  Object.values(nodes).forEach((node: any) => {
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
