import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/createAccount" element={<CreateAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
