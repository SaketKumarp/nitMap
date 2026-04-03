import { GraphType } from "@/types/map";

export const edges: GraphType = {
  gate: [
    { node: "admin", distance: 120 },
    { node: "blockA", distance: 100 },
  ],
  admin: [
    { node: "gate", distance: 120 },
    { node: "library", distance: 60 },
    { node: "blockC", distance: 150 },
  ],
  library: [{ node: "admin", distance: 60 }],
  blockA: [
    { node: "gate", distance: 100 },
    { node: "blockC", distance: 140 },
  ],
  blockC: [
    { node: "blockA", distance: 140 },
    { node: "admin", distance: 150 },
    { node: "blockD", distance: 60 },
    { node: "girlsHostel", distance: 250 },
  ],
  blockD: [{ node: "blockC", distance: 60 }],
  boysHostel: [{ node: "girlsHostel", distance: 300 }],
  girlsHostel: [
    { node: "blockC", distance: 250 },
    { node: "boysHostel", distance: 300 },
  ],
};
