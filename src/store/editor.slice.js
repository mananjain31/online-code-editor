import { createSlice } from "@reduxjs/toolkit";
import { formatCode } from "../helpers/formatCode";

export const languages = {
  python3: {
    label: "Python 3",
    extension: "py",
  },
  node: {
    label: "Nodejs",
    extension: "js",
  },
  java: {
    label: "Java",
    extension: "java",
  },
};

const initialState = {
  _id: null,
  codeId: null,
  running: false,
  code: "",
  input: "",
  output: "",
  selectedTab: "input",
  selectedLanguage: "python3",
  fileName: "main.py",
  error: "",
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    set_id(state, action) {
      state._id = action.payload;
    },
    setCodeId(state, action) {
      state.codeId = action.payload;
    },
    setCode(state, action) {
      const code = formatCode(action.payload, state.selectedLanguage);
      state.code = code;
    },
    setInput(state, action) {
      state.input = action.payload;
    },
    setOutput(state, action) {
      state.output = action.payload;
    },
    setSelectedTab(state, action) {
      state.selectedTab = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setSelectedLanguage(state, action) {
      if (state.fileName && state.fileName.trim() !== "") {
        state.fileName = state.fileName.split(".");
        state.fileName.pop();
        state.fileName = state.fileName.join(".");
      }
      state.fileName += "." + languages[action.payload].extension;

      state.selectedLanguage = action.payload;
    },
    setFileName(state, action) {
      state.fileName = action.payload;
      if (state.fileName.indexOf(".") !== -1) {
        state.fileName = state.fileName.split(".");
        state.fileName.pop();
        state.fileName = state.fileName.join(".");
      }
      console.log(languages);
      console.log(state.selectedLanguage);
      state.fileName += "." + languages[state.selectedLanguage].extension;
      state.fileName = state.fileName.replaceAll(" ", "");
    },
    setRunning(state, action) {
      state.running = !!action.payload;
    },
  },
});

export const editorActions = editorSlice.actions;
