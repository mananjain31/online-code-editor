import { Grow } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { run, stop } from "../store/editor.actions";
import { ButtonTw } from "./Buttons";

export const RunAndStop = () => {
    const {
        editor,
        theme: { styles },
    } = useSelector(state => state);

    const dispatch = useDispatch();

    const onRun = () => {
        dispatch(run(editor));
    };

    const onStop = () => {
        dispatch(stop(editor.codeId));
    };

    return (
        <ButtonTw
            className="w-12"
            style={{ background: styles.primary }}
            onClick={editor.running ? onStop : onRun}
        >
            {editor.running ? "Stop" : "Run"}
        </ButtonTw>
    );
};
