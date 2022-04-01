import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
import CreateAccount from './pages/CreateAccount';
import Characters from './pages/Characters';
import EncounterList from './pages/EncounterList';
import Encounter from './pages/Encounter'


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<EncounterList />} />
        <Route exact path="/createAccount" element={<CreateAccount />} />
        <Route exact path="/Characters" element={<Characters />} />
        <Route exact path="/encounter" element={<Encounter />} />
      </Routes>
    </Router>
  );
}

export default App;
