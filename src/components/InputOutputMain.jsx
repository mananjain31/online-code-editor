import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editorActions } from '../store/editor.slice';

export const InputOutputMain = () => {

    const { selectedTab, input, output } = useSelector(state => state.editor)
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
            className='px-desktop-x py-desktop-y bg-inherit flex-1 outline-none'
            placeholder={selectedTab === 'input' ? 'Specify Input hereasd' : 'Output will be shown here'}
            value={selectedTab === "input" ? input : output}
            onChange={onChange}
        ></textarea >
    )
}