import { useState } from 'react'
import '../../../styles/App.css'
import Navbar from '../../component/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <div className ="bg-blue-400">
          HOLA MUNDO CON TAILWIND!
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  )
}

export default App
