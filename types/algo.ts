import { GraphType } from "./map";

export function dijkstra(
  graph: GraphType,
  start: string,
  end: string,
): string[] {
  const distances: Record<string, number> = {};
  const prev: Record<string, string | null> = {};
  const visited = new Set<string>();
  const queue: { node: string; distance: number }[] = [];

  for (const node in graph) {
    distances[node] = Infinity;
    prev[node] = null;
  }

  distances[start] = 0;
  queue.push({ node: start, distance: 0 });

  while (queue.length > 0) {
    queue.sort((a, b) => a.distance - b.distance);
    const current = queue.shift();

    if (!current) break;
    const { node } = current;

    if (visited.has(node)) continue;
    visited.add(node);

    for (const neighbor of graph[node]) {
      const newDist = distances[node] + neighbor.distance;

      if (newDist < distances[neighbor.node]) {
        distances[neighbor.node] = newDist;
        prev[neighbor.node] = node;
        queue.push({ node: neighbor.node, distance: newDist });
      }
    }
  }

  // Build path
  const path: string[] = [];
  let curr: string | null = end;

  while (curr) {
    path.unshift(curr);
    curr = prev[curr];
  }

  return path;
}
