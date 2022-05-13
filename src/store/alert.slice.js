import { createSlice } from '@reduxjs/toolkit';

export const SEVERITY_TYPES = {
    error: "error",
    info: "info",
    success: "success",
    warning: "warning",
}

const initialState = {
    open: false,
    severity: SEVERITY_TYPES.info,
    message: "",
}

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        close(state) {
            state.open = false;
        },
        openSuccess(state, action) {
            return { message: action.payload, severity: SEVERITY_TYPES.success, open: true };
        },
        openInfo(state, action) {
            return { message: action.payload, severity: SEVERITY_TYPES.info, open: true };
        },
        openError(state, action) {
            return { message: action.payload, severity: SEVERITY_TYPES.error, open: true };
        },
        openWarning(state, action) {
            return { message: action.payload, severity: SEVERITY_TYPES.warning, open: true };
        }
    }
})

export const alertActions = alertSlice.actions;