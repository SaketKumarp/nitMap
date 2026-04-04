type Edge = {
  node: string;
  distance: number;
  accessible: boolean;
};

type Graph = Record<string, Edge[]>;

export function dijkstra(graph: Graph, start: string, end: string): string[] {
  const distances: Record<string, number> = {};
  const prev: Record<string, string | null> = {};
  const visited = new Set<string>();

  /* INIT */
  Object.keys(graph).forEach((node) => {
    distances[node] = Infinity;
    prev[node] = null;
  });

  distances[start] = 0;

  while (true) {
    let closestNode: string | null = null;
    let shortestDistance = Infinity;

    /* FIND CLOSEST */
    for (const node in distances) {
      if (!visited.has(node) && distances[node] < shortestDistance) {
        shortestDistance = distances[node];
        closestNode = node;
      }
    }

    if (closestNode === null) break;
    if (closestNode === end) break;

    visited.add(closestNode);

    /* RELAX EDGES */
    const neighbors = graph[closestNode] || [];

    for (const neighbor of neighbors) {
      const newDist = distances[closestNode] + neighbor.distance;

      if (newDist < distances[neighbor.node]) {
        distances[neighbor.node] = newDist;
        prev[neighbor.node] = closestNode;
      }
    }
  }

  /* BUILD PATH */
  const path: string[] = [];
  let curr: string | null = end;

  while (curr) {
    path.unshift(curr);
    curr = prev[curr];
  }

  return path;
}
