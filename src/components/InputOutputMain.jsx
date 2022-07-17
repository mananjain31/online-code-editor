import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editorActions } from '../store/editor.slice';

export const InputOutputMain = () => {

    const { selectedTab, input, output, error } = useSelector(state => state.editor)
    const dispatch = useDispatch();

    const onChange = ev => {
        const { value } = ev.target;
        if (selectedTab === 'input') {
            dispatch(editorActions.setInput(value))
        } else {
            dispatch(editorActions.setOutput(value))
        }
    }

    return (
        <textarea
            className={`px-desktop-x py-desktop-y bg-inherit flex-1 outline-none ${selectedTab === 'error' && 'text-red-200'}`}
            placeholder={selectedTab === 'input' ? 'Specify Input here' : selectedTab === 'output' ? 'Output will be shown here' : 'No errors'}
            value={selectedTab === "input" ? input : selectedTab === 'output' ? output : error}
            onChange={onChange}
            readOnly={selectedTab !== 'input'}
        ></textarea >
    )
}