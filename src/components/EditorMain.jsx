import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editorActions } from '../store/editor.slice';

export const EditorMain = () => {
    const { code } = useSelector(state => state.editor)
    const dispatch = useDispatch();
    const updateCode = ev => {
        const { value } = ev.target
        dispatch(editorActions.setCode(value))
    }

    return (
        <textarea
            placeholder='Cook Your Recipe here ... 👨🏽‍🍳'
            className='bg-editor-bg flex-1 px-desktop-x py-desktop-y outline-none'
            value={code}
            onChange={updateCode}
        ></textarea>
    )
}
