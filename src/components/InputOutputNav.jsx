import { ContentCopy, Download, Upload } from "@mui/icons-material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { copy } from "../helpers/copy";
import { download } from "../helpers/download";
import { upload } from "../helpers/upload";
import { alertActions } from "../store/alert.slice";
import { editorActions } from "../store/editor.slice";
import { ButtonTw } from "./Buttons";
import { NavWrapper } from "./NavWrapper";
import { RunAndStop } from "./RunAndStop";

export const InputOutputNav = () => {
    const editor = useSelector(state => state.editor);
    const dispatch = useDispatch();

    const onDownload = () => {
        download(editor[editor.selectedTab], editor.selectedTab + ".txt");
    };
    const onUpload = () => {
        upload(content => {
            dispatch(editorActions.setInput(content));
            dispatch(editorActions.setSelectedTab("input"));
        });
    };
    const onCopy = () => {
        copy(editor[editor.selectedTab]);
        dispatch(
            alertActions.openInfo(`${editor.selectedTab} copied to clipboard`)
        );
    };

    return (
        <NavWrapper>
            {/* Tabs */}
            <div className="flex items-center gap-2">
                <ContentCopy
                    titleAccess="Copy"
                    className="cursor-pointer"
                    onClick={onCopy}
                />

                <Download
                    titleAccess="Download"
                    className="cursor-pointer"
                    onClick={onDownload}
                />

                <Upload
                    titleAccess="Upload Input"
                    className="cursor-pointer"
                    onClick={onUpload}
                />
                <RunAndStop />
            </div>

            <span className="flex gap-2 items-center">
                <ButtonTw
                    className={`${
                        editor.selectedTab === "input" ? "bg-inherit" : ""
                    }`}
                    onClick={() =>
                        dispatch(editorActions.setSelectedTab("input"))
                    }
                >
                    Input
                </ButtonTw>
                <ButtonTw
                    className={`${
                        editor.selectedTab === "output" ? "bg-inherit" : ""
                    }`}
                    onClick={() =>
                        dispatch(editorActions.setSelectedTab("output"))
                    }
                >
                    Output
                </ButtonTw>
                <ButtonTw
                    className={`${
                        editor.selectedTab === "error" ? "bg-inherit" : ""
                    }`}
                    onClick={() =>
                        dispatch(editorActions.setSelectedTab("error"))
                    }
                >
                    Error
                </ButtonTw>
            </span>
        </NavWrapper>
    );
};
