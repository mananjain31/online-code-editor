import { Grow } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from '../App';
import { run, stop } from '../store/editor.actions';
import { ButtonTw } from './Buttons'
import { NavWrapper } from './NavWrapper'

export const EditorFooter = () => {

    const { editor } = useSelector(state => state);
    const dispatch = useDispatch();
    const onRun = () => {
        dispatch(run(editor))
    }
    const onStop = () => {
        console.log(editor);
        console.log(editor.codeId);
        dispatch(stop(editor.codeId));
    }

    return (
        <NavWrapper className='bg-nav-footer-bg'>
            <h1 className='font-extrabold'>Online Code Editor</h1>

            <Grow in={editor.running} timeout={1000}><div className='ml-auto'><ButtonTw onClick={onStop}>Stop</ButtonTw></div></Grow>

            <ButtonTw
                disabled={editor?.running}
                className={`${editor.running ? 'bg-slate-700' : 'bg-primary'}`}
                onClick={onRun}
            >Run</ButtonTw>
        </NavWrapper>
    )
}
