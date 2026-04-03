export type NodeType = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: "block" | "room" | "gate" | "facility" |"hostel"|"library"|"canteen";
};

export type EdgeType = {
  node: string;
  distance: number;
  wheelchair?: boolean;
};

export type GraphType = {
  [key: string]: EdgeType[];
};
