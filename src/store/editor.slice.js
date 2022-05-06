import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    code: '',
    input: '',
    output: '',
    selectedTab: 'input',
    selectedLanguage: 'java',
    fileName: '',
}

export const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        setCode(state, action) {
            state.code = action.payload;
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
        setSelectedLanguage(state, action) {
            state.selectedLanguage = action.payload;
        },
        setFileName(state, action) {
            state.fileName = action.payload;
        },
    }
})

export const editorActions = editorSlice.actions;