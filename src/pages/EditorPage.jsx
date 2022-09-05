import React from "react";
import { useSelector } from "react-redux";
import { Editor } from "../components/Editor";
import { InputOutput } from "../components/InputOutput";

export const EditorPage = () => {
    const { styles } = useSelector(state => state.theme);

    return (
        <div
            className="flex sm:flex-row flex-col w-full h-[100vh]"
            style={{ color: styles.fg }}
        >
            <Editor />
            <InputOutput />
        </div>
    );
};
