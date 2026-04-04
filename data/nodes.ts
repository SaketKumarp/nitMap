import { NodeType } from "@/types/map";

export const nodes: Record<string, NodeType> = {
  gate: {
    id: "gate",
    name: "Main Gate",
    lat: 25.25694430630656,
    lng: 91.74122008748355,
    type: "gate",
    image: "/gate.png",
  },

  admin: {
    id: "admin",
    name: "Admin Block",
    lat: 25.25672147770643,
    lng: 91.7421980329775,
    type: "block",
    image: "/admin.png",
  },

  library: {
    id: "library",
    name: "Library",
    lat: 25.25670776516384,
    lng: 91.7429826636645,
    type: "library",
    image: "/library.png",
  },

  blockA: {
    id: "blockA",
    name: "Block A",
    lat: 25.255558791693822,
    lng: 91.74233413606792,
    type: "block",
    image: "/blockA.png",
  },

  blockC: {
    id: "blockC",
    name: "Block C",
    lat: 25.257521393997802,
    lng: 91.74237858609402,
    type: "block",
    image: "/blockC.png",
  },

  blockD: {
    id: "blockD",
    name: "Block D",
    lat: 25.257939621772792,
    lng: 91.74261759895757,
    type: "block",
    image: "/blockD.png",
  },

  boysHostel: {
    id: "boysHostel",
    name: "Boys Hostel",
    lat: 25.253616954851577,
    lng: 91.74357645724491,
    type: "hostel",
    image: "/boyshostel.png",
  },

  j1: {
    id: "j1",
    name: "Junction",
    lat: 25.2579,
    lng: 91.7419,
    type: "junction",
  },
  j2: {
    id: "j2",
    name: "Junction",
    lat: 25.2575,
    lng: 91.7429,
    type: "junction",
  },
  j3: {
    id: "j3",
    name: "Junction",
    lat: 25.2571,
    lng: 91.7424,
    type: "junction",
  },
  j4: {
    id: "j4",
    name: "Junction",
    lat: 25.2568,
    lng: 91.7425,
    type: "junction",
  },
  j5: {
    id: "j5",
    name: "Junction",
    lat: 25.2563,
    lng: 91.7425,
    type: "junction",
  },
  j6: {
    id: "j6",
    name: "Junction",
    lat: 25.255,
    lng: 91.7451,
    type: "junction",
  },
  // hostel to block a 

  g2: {
    id: "g2",
    name: "Junction",
    lat: 25.253699256557255,
    lng: 91.74348465107815,
    type: "junction",
  },
  g3: {
    id: "g3",
    name: "Junction",
    lat: 25.254140402134208,
    lng: 91.74316840908253,
    type: "junction",
  },
  g4: {
    id: "g4",
    name: "Junction",
    lat: 25.255061470151823,
    lng: 91.74260560553101,
    type: "junction",
  },
  g5: {
    id: "g5",
    name: "Junction",
    lat: 25.255415693649685,
    lng: 91.74254650619726,
    type: "junction",
  },
};
