import JsonGraph from "./components/json-graph"
import Nav from "./components/nav"

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40">
        <Nav />
      </header>
      <main className="flex-1">
        <JsonGraph />
      </main>
    </div>
  )
}

export default App
