import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainRouter from './componnets/router/Router'

function App() {
  const [count, setCount] = useState(0)

  return (
 <div>
      <MainRouter></MainRouter>
 </div>
  )
}

export default App
