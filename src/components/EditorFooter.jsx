import { Grow } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { run, stop } from "../store/editor.actions";
import { ButtonTw } from "./Buttons";
import { NavWrapper } from "./NavWrapper";
import { ThemeSetter } from "./ThemeSetter";

export const EditorFooter = () => {
    const {
        theme: { styles },
    } = useSelector(state => state);

    return (
        <NavWrapper
            style={{ background: styles.navBg }}
            className="justify-start"
        >
            <h1 className="font-extrabold">Online Code Editor</h1>
            <ThemeSetter />
        </NavWrapper>
    );
};
