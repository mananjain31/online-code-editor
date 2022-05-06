import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './pages/RequireAuth';
import { EditorPage, LoginPage, SignupPage, LandingPage } from './pages';
import { useSelector } from 'react-redux';
import React from 'react';
import { updateUserToLocalStorage } from './store/user.slice';
import { updateEditorToLocalStorage } from './store/editor.slice';

function App() {

  const user = useSelector(state => state.user);
  const editor = useSelector(state => state.editor);
  console.log(editor);

  React.useEffect(() => {
    updateUserToLocalStorage(user);
  }, [user]);



  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />
      <Route exact path="/editor" element={<EditorPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route element={<RequireAuth>
      </RequireAuth>} />


    </Routes>
  );
}

export default App;