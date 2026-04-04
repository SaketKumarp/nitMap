export function dijkstra(graph: any, start: string, end: string) {
  const distances: any = {};
  const prev: any = {};
  const visited = new Set();

  Object.keys(graph).forEach((node) => {
    distances[node] = Infinity;
  });

  distances[start] = 0;

  while (true) {
    let closestNode = null;
    let shortestDistance = Infinity;

    for (const node in distances) {
      if (!visited.has(node) && distances[node] < shortestDistance) {
        shortestDistance = distances[node];
        closestNode = node;
      }
    }

    if (closestNode === null) break;
    if (closestNode === end) break;

    visited.add(closestNode);

    for (let neighbor of graph[closestNode] || []) {
      const newDist = distances[closestNode] + neighbor.distance;

      if (newDist < distances[neighbor.node]) {
        distances[neighbor.node] = newDist;
        prev[neighbor.node] = closestNode;
      }
    }
  }

  const path = [];
  let curr = end;

  while (curr) {
    path.unshift(curr);
    curr = prev[curr];
  }

  return path;
}
