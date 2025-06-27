import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Home from './depression/pages/Home'
import DepressionTest from './depression/pages/Depressiontest'
import ReliefPage from './depression/pages/ReliefPage'
import LetterToFutureMe from './depression/components/LetterToFutureMe'
import EmotionalTimeMachine from './depression/components/EmotionalTimeMachine'
import ReframeNegativeThought from './depression/components/ReframeNegativeThought'
import MoodCheckAI from './depression/components/MoodCheckAI'

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
          <Route
          path="/tools/letter"
          element={
            <LetterToFutureMe/>
          }
        />
          <Route
          path="/tools/time-machine"
          element={
            <EmotionalTimeMachine/>
          }
        />
          <Route
          path="/tools/reframe"
          element={
            <ReframeNegativeThought/>
          }
        />
         <Route
          path="/tools/mood-ai"
          element={
            <MoodCheckAI/>
          }
        />
        
      </Routes>
    </Router>
  )
}

export default App
