import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Home from './depression/pages/Home'
import DepressionTest from './depression/pages/Depressiontest'


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route
          path="/"
          element={<Home/>}
        />
        <Route
          path="/test"
          element={<DepressionTest/>}
        />
         <Route
          path="/relief-plan"
          element={<DepressionTest/>}
        />
      </Routes>
    </Router>
  )
}

export default App
