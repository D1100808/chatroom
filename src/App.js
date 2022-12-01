import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar'
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const {user, authIsReady} = useAuthContext()
  return (
    <div className="App">
      {authIsReady && <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/home" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/home" />}
          />
        </Routes>
      </BrowserRouter>}
    </div>
  );
}

export default App;
