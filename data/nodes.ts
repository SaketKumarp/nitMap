import { NodeType } from "@/types/map";

export const nodes: Record<string, NodeType> = {
  gate: {
    id: "gate",
    name: "Main Gate",
    lat: 25.25694430630656,
    lng: 91.74122008748355,
    type: "gate",
  },
  admin: {
    id: "admin",
    name: "Admin Block",
    lat: 25.25672147770643,
    lng: 91.7421980329775,
    type: "block",
  },
  library: {
    id: "library",
    name: "Library",
    lat: 25.25670776516384,
    lng: 91.7429826636645,
    type: "library",
  },
  blockA: {
    id: "blockA",
    name: "Block A",
    lat: 25.255558791693822,
    lng: 91.74233413606792,
    type: "block",
  },
  blockC: {
    id: "blockC",
    name: "Block C",
    lat: 25.257521393997802,
    lng: 91.74237858609402,
    type: "block",
  },
  blockD: {
    id: "blockD",
    name: "Block D",
    lat: 25.257939621772792,
    lng: 91.74261759895757,
    type: "block",
  },
  boysHostel: {
    id: "boysHostel",
    name: "Boys Hostel",
    lat: 25.255042060950156,
    lng: 91.74702187479586,
    type: "hostel",
  },
  girlsHostel: {
    id: "girlsHostel",
    name: "Girls Hostel",
    lat: 25.257652089930424,
    lng: 91.7457377067367,
    type: "hostel",
  },
};
