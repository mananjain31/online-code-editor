import { configureStore } from '@reduxjs/toolkit';
import { alertSlice } from './alert.slice';
import { editorSlice } from './editor.slice';
import { userSlice } from './user.slice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    editor: editorSlice.reducer,
    alert: alertSlice.reducer,
  }
});