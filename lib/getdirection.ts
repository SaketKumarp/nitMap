import { nodes } from "@/data/nodes";

export function getDirections(path: string[]) {
  if (!path || path.length === 0) return [];

  const steps: string[] = [];

  for (let i = 0; i < path.length; i++) {
    const node = nodes[path[i]];

    if (i === 0) {
      steps.push(`Start at ${node.name}`);
    } else if (i === path.length - 1) {
      steps.push(`Arrive at ${node.name}`);
    } else {
      if (node.type === "junction") {
        steps.push(`Continue straight`);
      } else {
        steps.push(`Pass ${node.name}`);
      }
    }
  }

  return steps;
}
