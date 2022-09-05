import { Grow } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { run, stop } from "../store/editor.actions";
import { ButtonTw } from "./Buttons";
import { NavWrapper } from "./NavWrapper";
import { ThemeSetter } from "./ThemeSetter";

export const EditorFooter = () => {
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
        <NavWrapper style={{ background: styles.navBg }}>
            <h1 className="font-extrabold">Online Code Editor</h1>
            <ThemeSetter />

            <Grow in={editor.running} timeout={1000}>
                <div className="ml-auto">
                    <ButtonTw onClick={onStop}>Stop</ButtonTw>
                </div>
            </Grow>

            <ButtonTw
                disabled={editor?.running}
                className={editor.running && "bg-slate-700"}
                style={editor.running ? {} : { background: styles.primary }}
                onClick={onRun}
            >
                Run
            </ButtonTw>
        </NavWrapper>
    );
};
