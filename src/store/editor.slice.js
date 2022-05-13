import { createSlice } from '@reduxjs/toolkit';

export const languages = {
    'python3': 'Python 3',
    'node': 'Node.js',
}


const initialState = {
    codeId: null,
    running: false,
    code: '',
    input: '',
    output: '',
    selectedTab: 'input',
    selectedLanguage: 'python3',
    fileName: 'main.py',
    error: '',
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
        setError(state, action) {
            state.error = action.payload;
        },
        setSelectedLanguage(state, action) {
            if (state.fileName && state.fileName.trim() !== '') {
                state.fileName = state.fileName.split('.');
                state.fileName.pop();
                state.fileName = state.fileName.join('.');
                if (action.payload === 'python3') {
                    state.fileName += '.py';
                }
                else if (action.payload === 'node') {
                    state.fileName += '.js';
                }
            }

            state.selectedLanguage = action.payload;
        },
        setFileName(state, action) {
            state.fileName = action.payload;
            if (state.fileName.indexOf(".") !== -1) {
                state.selectedLanguage = state.fileName.split('.');
                state.selectedLanguage.pop();
                state.selectedLanguage = state.selectedLanguage.join('.');
            }
            if (state.selectedLanguage === 'python3') {
                state.fileName += '.py';
            }
            else if (state.selectedLanguage === 'node') {
                state.fileName += '.js';
            }
        },
        setRunning(state, action) {
            state.running = !!action.payload;
        }
    }
})

export const editorActions = editorSlice.actions;