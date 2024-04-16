export type Edge = {
  To: number;
  Weight: number;
}

export type WeightedAdjacencyList = Edge[][]

export type Vertex = { id: number }
export interface Link {
  source: number;
  target: number;
}
