import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CreateAccount from './pages/CreateAccount';
import CreateCharacter from './pages/CreateCharacter';
import CreateEncounter from './pages/CreateEncounter';
import EncounterList from './pages/EncounterList';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<EncounterList />} />
        <Route exact path="/createAccount" element={<CreateAccount />} />
        <Route exact path="/createCharacter" element={<CreateCharacter />} />
        <Route exact path="/createEncounter" element={<CreateEncounter />} />
      </Routes>
    </Router>
  );
}

export default App;
