export const edges = {
  // ENTRY
  gate: [{ node: "j5", distance: 40 }],

  // LOWER AREA
  blockA: [{ node: "j5", distance: 50 }],
  j5: [
    { node: "gate", distance: 40 },
    { node: "blockA", distance: 50 },
    { node: "j4", distance: 30 },
  ],

  // CENTER
  admin: [{ node: "j4", distance: 20 }],
  library: [{ node: "j4", distance: 25 }],

  j4: [
    { node: "j5", distance: 30 },
    { node: "admin", distance: 20 },
    { node: "library", distance: 25 },
    { node: "j3", distance: 35 },
  ],

  // UPPER MID
  blockC: [{ node: "j3", distance: 30 }],

  j3: [
    { node: "j4", distance: 35 },
    { node: "blockC", distance: 30 },
    { node: "j2", distance: 30 },
  ],

  // TOP AREA
  blockD: [{ node: "j2", distance: 25 }],

  j2: [
    { node: "j3", distance: 30 },
    { node: "blockD", distance: 25 },
    { node: "j1", distance: 25 },
  ],

  // EXTRA CONNECTIVITY
  j1: [{ node: "j2", distance: 25 }],

  // HOSTELS SIDE
  girlsHostel: [{ node: "j6", distance: 60 }],
  boysHostel: [{ node: "j6", distance: 40 }],

  j6: [
    { node: "girlsHostel", distance: 60 },
    { node: "boysHostel", distance: 40 },
  ],
};
