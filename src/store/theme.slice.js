import { createSlice } from "@reduxjs/toolkit";

const themes = [
  {
    // default theme
    ipOpBg: "#202249",
    fg: "#dadada",
    editorBg: "#282a59",
    navBg: "#232652",
    primary: "#3139f5",
    secondary: "#b55f99",
    btnDefault: "#4d4f8e",
  },
  {
    ipOpBg: "#202249",
    fg: "#dadada",
    editorBg: "#3f4e4f",
    navBg: "#2C3639",
    primary: "#3139f5",
    secondary: "#b55f99",
    btnDefault: "#A27B5C",
  },
  {
    // light theme
    ipOpBg: "#202249",
    fg: "#dadada",
    editorBg: "#ffffff",
    navBg: "#ffffff",
    primary: "#3139f5",
    secondary: "#b55f99",
    btnDefault: "#4d4f8e",
  },
];

const initialState = {
  index: 0,
  styles: themes[0],
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
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
