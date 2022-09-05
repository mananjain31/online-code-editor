import { Route, Routes } from "react-router-dom";
import RequireAuth from "./pages/RequireAuth";
import { EditorPage, LoginPage, SignupPage, LandingPage } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import React, { createContext } from "react";
import { updateUserToLocalStorage } from "./store/user.slice";
import { LoginSignupModal } from "./components/LoginSignupModal";
import { Alert, createTheme, Slide, Snackbar } from "@mui/material";
import { alertActions } from "./store/alert.slice";
import useToggle from "./hooks/useToggle";
import { SavedCodesModal } from "./components/SavedCodesModal";
import { updateThemeToLocalStorage } from "./store/theme.slice";
import { ThemeProvider } from "@emotion/react";

export const AppContext = createContext();

function App() {
    const { user, alert, theme } = useSelector(state => state);

    const [loginModalOpen, toggleLoginModal] = useToggle(false);
    const [savedCodesModalOpen, toggleSavedCodesModal] = useToggle(false);
    const dispatch = useDispatch();

    React.useEffect(() => {
        updateUserToLocalStorage(user);
    }, [user]);
    React.useEffect(() => {
        updateThemeToLocalStorage(theme);
    }, [theme]);

    const closeAlert = () => dispatch(alertActions.close());

    const muiTheme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    primary: {
                        main: theme.styles.primary,
                    },
                    secondary: {
                        main: theme.styles.secondary,
                    },
                },
            }),
        [theme]
    );

    return (
        <AppContext.Provider
            value={{ toggleLoginModal, toggleSavedCodesModal }}
        >
            <ThemeProvider theme={muiTheme}>
                <Routes>
                    <Route path="/" element={<EditorPage />} />
                    <Route exact path="/editor" element={<EditorPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />

                    <Route element={<RequireAuth></RequireAuth>} />
                </Routes>
                <LoginSignupModal
                    open={loginModalOpen}
                    onClose={toggleLoginModal}
                />
                {user.loggedIn && (
                    <SavedCodesModal
                        open={savedCodesModalOpen}
                        onClose={toggleSavedCodesModal}
                    />
                )}

                <Snackbar
                    open={alert.open}
                    autoHideDuration={6000}
                    TransitionComponent={Slide}
                    onClose={closeAlert}
                >
                    <Alert
                        variant="filled"
                        onClose={closeAlert}
                        elevation={10}
                        severity={alert.severity}
                        key={Math.random()}
                    >
                        {alert.message}
                    </Alert>
                </Snackbar>
            </ThemeProvider>
        </AppContext.Provider>
    );
}

export default App;
