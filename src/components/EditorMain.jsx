import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editorActions } from "../store/editor.slice";

export const EditorMain = () => {
    const {
        editor: { code },
        theme: { styles },
    } = useSelector(state => state);
    const dispatch = useDispatch();
    const handleKeyDown = async ev => {
        ev.persist();
        const { target } = ev;
        let { value, selectionStart, selectionEnd } = target;
        let newValue = value;
        console.log(ev.key);
        if (ev.key === "Tab" && selectionStart === selectionEnd) {
            ev.preventDefault();
            newValue =
                value.substring(0, selectionStart) +
                "\t" +
                value.substring(selectionStart, value.length);
            await dispatch(editorActions.setCode(newValue));
            target.selectionStart = target.selectionEnd = selectionStart + 1;
        } else if (ev.key === "Enter" && selectionStart === selectionEnd) {
            ev.preventDefault();
            let spacing = "";
            for (let i = selectionStart - 1; i >= 0; i--) {
                if (value[i] === "\n") {
                    i++;
                    while (
                        (value[i] === " " || value[i] === "\t") &&
                        i < selectionStart
                    ) {
                        spacing += value[i];
                        i++;
                    }
                    break;
                }
            }
            console.log(spacing.length);
            newValue =
                value.substring(0, selectionStart) +
                "\n" +
                spacing +
                value.substring(selectionStart, value.length);
            await dispatch(editorActions.setCode(newValue));
            target.selectionStart = target.selectionEnd =
                selectionStart + 1 + spacing.length;
        }
    };
    const updateCode = ev => {
        let { value } = ev.target;
        dispatch(editorActions.setCode(value));
    };
    return (
        <textarea
            spellCheck="false"
            placeholder="Cook Your Recipe here ... 👨🏽‍🍳"
            className="flex-1 px-desktop-x py-desktop-y outline-none font-editor font-extrabold"
            style={{ background: styles.editorBg }}
            value={code}
            onKeyDown={handleKeyDown}
            onChange={updateCode}
        ></textarea>
    );
};
