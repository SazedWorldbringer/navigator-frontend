import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { WeightedAdjacencyList } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertDataForD3(rawData: WeightedAdjacencyList) {
  const vertices: any[] = [];
  const links: any[] = [];

  rawData.forEach((nodeData, idx) => {
    vertices.push({ id: idx, idx })

    nodeData.forEach(edge => {
      links.push({
        source: vertices[idx],
        target: vertices[edge.To],
        weight: edge.Weight
      })
    })
  })
  return { vertices, links }
}
