import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Home from './depression/pages/Home'
import DepressionTest from './depression/pages/Depressiontest'
import ReliefPage from './depression/pages/ReliefPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/home-Depression" element={<Home/>} />
        <Route
          path="/test"
          element={<DepressionTest/>}
        />
         <Route
          path="/relief-plan"
          element={
            <ReliefPage/>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
