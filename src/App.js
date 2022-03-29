import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login';
import CreateCharacter from './pages/CreateCharacter';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/createAccount" element={<CreateAccount />} />
        <Route exact path="/createCharacter" element={<CreateCharacter />} />
      </Routes>
    </Router>
  );
}

export default App;
