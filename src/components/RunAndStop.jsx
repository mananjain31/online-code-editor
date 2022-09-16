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
        <span className="flex">
            <Grow in={editor.running} timeout={1000}>
                <span>
                    <ButtonTw onClick={onStop}>Stop</ButtonTw>
                </span>
            </Grow>

            <ButtonTw
                disabled={editor?.running}
                className={editor.running && "bg-slate-700"}
                style={editor.running ? {} : { background: styles.primary }}
                onClick={onRun}
            >
                Run
            </ButtonTw>
        </span>
    );
};
