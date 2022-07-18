import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Characters from './components/pages/Characters'
import EncounterList from './components/pages/EncounterList'
import Encounter from './components/pages/Encounter'
import NavBar from './components/page_elements/NavBar'
import IniativeTracker from './components/pages/InitiativeTracker'
import Footer from './components/page_elements/Footer'
import { React, useState } from 'react'
import Login from './components/pages/Login'
import CreateAccount from './components/pages/CreateAccount'

function App () {
  const [token, setToken] = useState()

  if (!token) {
    return (
      <div>
        <Router>
          <Routes>
            <Route exact path="/initiative-tracker-webapp" element={<Login setToken={setToken} />} />
            <Route exact path="/initiative-tracker-webapp/createAccount" element={<CreateAccount />} />
          </Routes>
        </Router>
        <Footer />
      </div>
    )
  }

  return (
    <div>
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/initiative-tracker-webapp" element={<EncounterList />} />
        <Route exact path="/initiative-tracker-webapp/Characters" element={<Characters />} />
        <Route exact path="/initiative-tracker-webapp/encounter" element={<Encounter />} />
        <Route exact path="/initiative-tracker-webapp/InitiativeTracker" element={<IniativeTracker />} />
      </Routes>
    </Router>
    <Footer />
    </div>
  )
}

export default App
