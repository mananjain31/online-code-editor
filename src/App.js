import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './pages/RequireAuth';
import { Editor, Login, Signup } from './pages';
import { Landing } from './pages/Landing';

function App() {
  return (
    <Routes>

      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<RequireAuth>
        <Route exact path="/editor" element={<Editor />} />
      </RequireAuth>} />


    </Routes>
  );
}

export default App;