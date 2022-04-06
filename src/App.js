import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
import CreateAccount from './pages/CreateAccount';
import Characters from './pages/Characters';
import EncounterList from './pages/EncounterList';
import Encounter from './pages/Encounter'
import NavBar from './pages/NavBar';
import IniativeTracker from './pages/InitiativeTracker';
import Footer from './pages/Footer';


function App() {
  return (
    <div> 
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<EncounterList />} />
        <Route exact path="/createAccount" element={<CreateAccount />} />
        <Route exact path="/Characters" element={<Characters />} />
        <Route exact path="/encounter" element={<Encounter />} />
        <Route exact path="/InitiativeTracker" element={<IniativeTracker />} />
      </Routes>
    </Router>
    <Footer />
    </div>
  );
}

export default App;
