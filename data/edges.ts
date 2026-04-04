export const edges: Record<string, any[]> = {
  /* 🔹 MAIN GRAPH */
  gate: [{ node: "j5", distance: 40, accessible: true }],

  blockA: [{ node: "j5", distance: 50, accessible: true }],

  j5: [
    { node: "gate", distance: 40, accessible: true },
    { node: "blockA", distance: 50, accessible: true },
    { node: "j4", distance: 30, accessible: false },
    { node: "g5", distance: 25, accessible: true }, // 🔥 CONNECT HOSTEL
  ],

  admin: [{ node: "j4", distance: 20, accessible: true }],
  library: [{ node: "j4", distance: 25, accessible: true }],

  j4: [
    { node: "j5", distance: 30, accessible: false },
    { node: "admin", distance: 20, accessible: true },
    { node: "library", distance: 25, accessible: true },
    { node: "j3", distance: 35, accessible: true },
  ],

  blockC: [{ node: "j3", distance: 30, accessible: true }],

  j3: [
    { node: "j4", distance: 35, accessible: true },
    { node: "blockC", distance: 30, accessible: true },
    { node: "j2", distance: 30, accessible: false },
  ],

  blockD: [{ node: "j2", distance: 25, accessible: true }],

  j2: [
    { node: "j3", distance: 30, accessible: false },
    { node: "blockD", distance: 25, accessible: true },
    { node: "j1", distance: 25, accessible: true },
  ],

  j1: [{ node: "j2", distance: 25, accessible: true }],

  /* 🔥 HOSTEL CONNECTION (FULLY CONNECTED PATH) */

  boysHostel: [{ node: "j6", distance: 40, accessible: true }],

  j6: [
    { node: "boysHostel", distance: 40, accessible: true },
    { node: "g2", distance: 30, accessible: true },
  ],

  g2: [
    { node: "j6", distance: 30, accessible: true },
    { node: "g3", distance: 35, accessible: true },
  ],

  g3: [
    { node: "g2", distance: 35, accessible: true },
    { node: "g4", distance: 40, accessible: true },
  ],

  g4: [
    { node: "g3", distance: 40, accessible: true },
    { node: "g5", distance: 20, accessible: true },
  ],

  g5: [
    { node: "g4", distance: 20, accessible: true },
    { node: "j5", distance: 25, accessible: true }, // 🔥 KEY LINK
  ],
};

/* =======================
   ♿ WHEELCHAIR GRAPH
======================= */

export const wheelchairEdges: any = {};

Object.keys(edges).forEach((node) => {
  wheelchairEdges[node] = edges[node].filter(
    (edge: any) => edge.accessible === true,
  );
});
