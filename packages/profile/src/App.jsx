import { useState } from 'react'
import { Navbar, Welcome, Games } from './components'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h=screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Games /> 
    </div>
  )
}

export default App
