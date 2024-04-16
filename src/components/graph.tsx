import { useEffect, useRef } from "react";
import * as d3 from 'd3'

import { WeightedAdjacencyList } from "@/lib/types";
import { convertDataForD3 } from "@/lib/utils";

interface GraphProps {
  graphData: WeightedAdjacencyList
}

const Graph: React.FC<GraphProps> = ({ graphData }) => {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!graphData || !graphData.length) {
      return
    }

    const { vertices, links } = convertDataForD3(graphData)

    const simulation = d3.forceSimulation(vertices)
      .force('charge', d3.forceManyBody())
      .force(
        'link',
        d3.forceLink(links)
          .id(function(d: any) {
            return d.id
          })
      )
      .on('tick', ticked);

    const svg = d3.select(svgRef.current)

    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke-width', d => d.weight)
      .style('stroke', 'pink')

    const node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(vertices)
      .enter().append('circle')
      .attr('r', 5)
      .call(d3.drag<SVGCircleElement, any>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))

    const svgWidth = 800
    const svgHeight = 600
    const centerX = svgWidth / 2
    const centerY = svgHeight / 2

    simulation.nodes().forEach(node => {
      node.x = centerX
      node.y = centerY
    })

    svg.attr('transform', `translate(${centerX}, ${centerY})`)

    function ticked() {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    }

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop()
    }
  }, [graphData])

  return <svg ref={svgRef} className="border border-black" width='800' height='600'></svg>
}

export default Graph
