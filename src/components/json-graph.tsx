import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react"

const JsonGraph = () => {
  const [vertices, setVertices] = useState<number>(0)
  const [source, setSource] = useState(null)
  const [sink, setSink] = useState(null)
  const [graphData, setGraphData] = useState<string>('')
  const [path, setPath] = useState<number[]>([])

  const handleInputChange = (e) => {
    setVertices(e.target.value)
    console.log(vertices)
  }

  const handleSourceChange = (e) => {
    setSource(e.target.value)
    console.log(vertices)
  }

  const handleSinkChange = (e) => {
    setSink(e.target.value)
    console.log(vertices)
  }

  const getGraph = () => {
    const data = {
      vertices: Number(vertices)
    }
    fetch('http://localhost:8080/graph', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json()
      })
      .then((data) => {
        setGraphData(JSON.stringify(data, null, 2))
        console.log('Graph data:', data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  const getPath = () => {
    const data = {
      source: Number(source),
      sink: Number(sink),
      graph: graphData
    }
    fetch('http://localhost:8080/path', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        setPath(data)
        console.log('Shortest path: ', data)
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation: ', error)
      });
  }

  return (
    <Card className="container md:w-5/6 lg:w-3/4 h-max backdrop-blur-sm bg-card ">
      <CardHeader>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center">
          Graph
        </h4>
      </CardHeader>
      <CardContent>
        <Card className="h-64 overflow-auto">
          <CardContent>
            <pre>
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                {`AdjacencyList = ${graphData}`}
              </code>
            </pre>
          </CardContent>
        </Card>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="flex items-center">
          <Input onChange={handleInputChange} placeholder="Vertices" />
          <Button onClick={getGraph}>Get Graph</Button>
        </div>
        <div className="flex flex-row">
          <Input id="source" onChange={handleSourceChange} placeholder="Source" />
          <Input id="sink" onChange={handleSinkChange} placeholder="Sink" />
          <Input id="points" placeholder="Intermediate Points" />
          <Button onClick={getPath}>Get Path</Button>
        </div>
        <div>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center">
            Path
          </h4>
          <p>
            {path.map((node, k) => (
              <span>{node} {k < path.length ? '->' : ''}</span>
            ))}
          </p>
        </div>
      </CardFooter>
    </Card>
  )
}

export default JsonGraph
