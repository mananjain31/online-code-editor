import { Close, Mail, Password, Person } from "@mui/icons-material";
import {
    Divider,
    IconButton,
    InputAdornment,
    Modal,
    OutlinedInput,
} from "@mui/material";
import React, { useReducer, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    validateLoginFormData,
    validateSignupFormData,
} from "../helpers/validators";
import { loginUser, signupUser } from "../store/user.actions";
import { ButtonTw } from "./Buttons";
import FormErrorText from "./FormErrorText";

const initialLoginFormData = { emailOrUsername: "", password: "" };
const initialSignupFormData = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
};
const initialErrors = { ...initialLoginFormData, ...initialSignupFormData };
const formDataReducer = (state, ev) => {
    if (ev.set) return ev.set;
    const { name, value } = ev.target;
    return {
        ...state,
        [name]: value,
    };
};

export const LoginSignupModal = ({ open, onClose }) => {
    const { styles } = useSelector(state => state.theme);
    const dispatch = useDispatch();

    const [formType, setFormType] = useState("login");
    const toggleFormType = () =>
        setFormType(formType === "login" ? "signup" : "login");

    const [loginFormData, loginFormDataDispatch] = useReducer(
        formDataReducer,
        initialLoginFormData
    );
    const [signupFormData, signupFormDataDispatch] = useReducer(
        formDataReducer,
        initialSignupFormData
    );
    const [errors, setErrors] = useState(initialErrors);

    const clearForm = () => {
        setErrors(initialErrors);
        loginFormDataDispatch({ set: initialLoginFormData });
        signupFormDataDispatch({ set: initialSignupFormData });
    };

    const handleLogin = async () => {
        setErrors(initialErrors);
        const { valid, errors, formData } =
            validateLoginFormData(loginFormData);
        if (!valid) {
            setErrors(prev => ({ ...prev, ...errors }));
            return false;
        }
        // from user actions, call for login
        const success = await dispatch(loginUser(formData));
        if (success) {
            clearForm();
            onClose();
        }
    };

    const handleSignup = async () => {
        setErrors(initialErrors);
        const { valid, errors, formData } =
            validateSignupFormData(signupFormData);
        if (!valid) {
            setErrors(prev => ({ ...prev, ...errors }));
            return false;
        }
        // from user actions, call for register
        const success = await dispatch(signupUser(formData));
        if (success) {
            clearForm();
            setFormType("login");
        }
    };

    const handleSubmit = async () =>
        formType === "login" ? handleLogin() : handleSignup();

    useEffect(() => {
        clearForm();
    }, [formType]);

    return (
        <Modal
            open={!!open}
            onClose={onClose}
            className="flex justify-center items-center"
        >
            <section className="md:max-w-lg bg-gray-300 flex gap-4 flex-col  flex-1 px-desktop-x py-desktop-y rounded">
                <header className="flex items-center justify-between">
                    <h2 className="text-2xl">
                        {formType === "login" ? "Login" : "Sign Up"}
                    </h2>
                    <IconButton onClick={onClose}>
                        <Close />
                    </IconButton>
                </header>
                <Divider />
                <main className="flex flex-col gap-3">
                    {formType === "login" ? (
                        <>
                            <label htmlFor="emailUsername">
                                Email / Username
                            </label>
                            <OutlinedInput
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Mail />
                                    </InputAdornment>
                                }
                                id="emailUsername"
                                name="emailOrUsername"
                                value={loginFormData.emailOrUsername}
                                onChange={loginFormDataDispatch}
                                error={!!errors.emailOrUsername}
                            />
                            <FormErrorText>
                                {errors.emailOrUsername}
                            </FormErrorText>

                            <label htmlFor="password">Password</label>
                            <OutlinedInput
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Password />
                                    </InputAdornment>
                                }
                                id="password"
                                type="password"
                                name="password"
                                value={loginFormData.password}
                                onChange={loginFormDataDispatch}
                                error={!!errors.password}
                            />
                            <FormErrorText>{errors.password}</FormErrorText>
                            <p>
                                Does not have an Account?{" "}
                                <span
                                    className="cursor-pointer"
                                    style={{ color: styles.primary }}
                                    onClick={toggleFormType}
                                >
                                    Signup
                                </span>
                            </p>
                        </>
                    ) : (
                        <>
                            <label htmlFor="email">Email</label>
                            <OutlinedInput
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Mail />
                                    </InputAdornment>
                                }
                                type="email"
                                id="email"
                                name="email"
                                value={signupFormData.email}
                                onChange={signupFormDataDispatch}
                                error={!!errors.email}
                            />
                            <FormErrorText>{errors.email}</FormErrorText>
                            <label htmlFor="username">Username</label>
                            <OutlinedInput
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Person />
                                    </InputAdornment>
                                }
                                id="username"
                                name="username"
                                value={signupFormData.username}
                                onChange={signupFormDataDispatch}
                                error={!!errors.username}
                            />
                            <FormErrorText>{errors.username}</FormErrorText>
                            <label htmlFor="password">Password</label>
                            <OutlinedInput
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Password />
                                    </InputAdornment>
                                }
                                type="password"
                                id="password"
                                name="password"
                                value={signupFormData.password}
                                onChange={signupFormDataDispatch}
                                error={!!errors.password}
                            />
                            <FormErrorText>{errors.password}</FormErrorText>
                            <label htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <OutlinedInput
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Password />
                                    </InputAdornment>
                                }
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={signupFormData.confirmPassword}
                                onChange={signupFormDataDispatch}
                                error={!!errors.confirmPassword}
                            />
                            <FormErrorText>
                                {errors.confirmPassword}
                            </FormErrorText>
                            <p>
                                Already have an Account?{" "}
                                <span
                                    className="cursor-pointer"
                                    style={{ color: styles.primary }}
                                    onClick={toggleFormType}
                                >
                                    Login
                                </span>
                            </p>
                        </>
                    )}
                </main>
                <footer>
                    <ButtonTw
                        className="w-full text-white py-3"
                        style={{ background: styles.primary }}
                        onClick={handleSubmit}
                    >
                        {formType === "login" ? "Login" : "Sign Up"}
                    </ButtonTw>
                </footer>
            </section>
        </Modal>
    );
};
