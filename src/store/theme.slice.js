import { createSlice } from "@reduxjs/toolkit";

const themes = [
    {
        // default theme
        ipOpBg: "rgb(2,12,25)",
        fg: "#f0f0f0",
        editorBg: "rgb(6,21,38)",
        navBg: "rgb(3,14,25)",
        primary: "rgb(70,120,200)",
        secondary: "rgb(121,89,188)",
        btnDefault: "rgb(10,40,64)",
    },
    {
        ipOpBg: "#202249",
        fg: "#dadada",
        editorBg: "#282a59",
        navBg: "#232652",
        primary: "#3139f5",
        secondary: "#b55f99",
        btnDefault: "#4d4f8e",
    },
    {
        ipOpBg: "#2A3437",
        fg: "#f0f0f0",
        editorBg: "#3f4e4f",
        navBg: "#2C3639",
        primary: "#398175",
        secondary: "#70811F",
        btnDefault: "#4C5659",
    },
];

const initialState = {
    index: 0,
    styles: themes[0],
};

const getInitialStateFromLocalStorage = () => {
    let theme = localStorage.getItem("theme");
    if (theme) return JSON.parse(theme);
    return initialState;
};

export const updateThemeToLocalStorage = theme => {
    localStorage.setItem("theme", JSON.stringify(theme));
};

export const themeSlice = createSlice({
    name: "theme",
    initialState: getInitialStateFromLocalStorage(),
    reducers: {
        nextTheme(state) {
            const nextIndex = (state.index + 1) % themes.length;

            return {
                index: nextIndex,
                styles: themes[nextIndex],
            };
        },
    },
});

export const themeActions = themeSlice.actions;
