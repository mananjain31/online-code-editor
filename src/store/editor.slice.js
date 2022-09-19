import { createSlice } from "@reduxjs/toolkit";
import { formatCode } from "../helpers/formatCode";
import { checkIfDriverCode, getDriverCode, languages } from "./LanguageInfo";

const initialState = {
    _id: null,
    codeId: null,
    running: false,
    input: "",
    output: "",
    selectedTab: "input",
    selectedLanguage: "python3",
    fileName: "Main.py",
    error: "",
    code: getDriverCode("python3", "Main.py"),
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

            if (
                state.code.trim() === "" ||
                checkIfDriverCode(
                    state.code,
                    state.selectedLanguage,
                    state.fileName
                )
            ) {
                state.code = getDriverCode(action.payload, state.fileName);
            }

            state.selectedLanguage = action.payload;
        },
        setFileName(state, action) {
            state.fileName = action.payload;
            if (state.fileName.indexOf(".") !== -1) {
                state.fileName = state.fileName.split(".");
                state.fileName.pop();
                state.fileName = state.fileName.join(".");
            }

            state.fileName += "." + languages[state.selectedLanguage].extension;
            state.fileName = state.fileName.replaceAll(" ", "");
        },
        setRunning(state, action) {
            state.running = !!action.payload;
        },
    },
});

export const editorActions = editorSlice.actions;
