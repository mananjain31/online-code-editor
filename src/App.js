import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './pages/RequireAuth';
import { EditorPage, LoginPage, SignupPage, LandingPage } from './pages';
import { useDispatch, useSelector } from 'react-redux';
import React, { createContext } from 'react';
import { updateUserToLocalStorage } from './store/user.slice';
import { updateEditorToLocalStorage } from './store/editor.slice';
import { LoginSignupModal } from './components/LoginSignupModal';
import { Alert, Slide, Snackbar } from '@mui/material';
import { alertActions } from './store/alert.slice';

export const AppContext = createContext();

function App() {

  const user = useSelector(state => state.user);
  const alert = useSelector(state => state.alert);
  const editor = useSelector(state => state.editor);
  console.log(editor);

  const [loginModalOpen, setLoginModalOpen] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    updateUserToLocalStorage(user);
  }, [user]);

  const toggleLoginModal = () => setLoginModalOpen(state => !state);
  const closeAlert = () => dispatch(alertActions.close())

  return (
    <AppContext.Provider value={{ toggleLoginModal }}>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route exact path="/editor" element={<EditorPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route element={<RequireAuth>
        </RequireAuth>} />


      </Routes>
      <LoginSignupModal open={loginModalOpen} onClose={toggleLoginModal} />

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        TransitionComponent={Slide}
        onClose={closeAlert}
      >
        <Alert variant="filled" onClose={closeAlert} elevation={10} severity={alert.severity} key={Math.random()}>
          {alert.message}
        </Alert>
      </Snackbar>

    </AppContext.Provider>
  );
}

export default App;