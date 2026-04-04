export type NodeType = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: "gate" | "block" | "library" | "hostel" | "junction";
  // images:"string"
};

export type EdgeType = {
  node: string;
  distance: number;
};

export type GraphType = Record<string, EdgeType[]>;
