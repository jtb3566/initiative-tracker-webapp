import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Characters from './components/pages/Characters'
import EncounterList from './components/pages/EncounterList'
import Encounter from './components/pages/Encounter'
import NavBar from './components/NavBar'
import IniativeTracker from './components/pages/InitiativeTracker'
import Footer from './components/Footer'
import React from 'react'

function App () {
  return (
    <div>
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<EncounterList />} />
        <Route exact path="/Characters" element={<Characters />} />
        <Route exact path="/encounter" element={<Encounter />} />
        <Route exact path="/InitiativeTracker" element={<IniativeTracker />} />
      </Routes>
    </Router>
    <Footer />
    </div>
  )
}

export default App
