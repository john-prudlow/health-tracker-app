import { useState } from 'react'
import { Routes, Route } from 'react-router'

import Homepage from './pages/Homepage'

import './style.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
    </Routes>
  )
}

export default App