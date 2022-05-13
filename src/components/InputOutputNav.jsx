import { ContentCopy, Download, Upload } from '@mui/icons-material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editorActions } from '../store/editor.slice'
import { ButtonTw } from './Buttons'
import { NavWrapper } from './NavWrapper'

export const InputOutputNav = () => {

    const { selectedTab } = useSelector(state => state.editor)
    const dispatch = useDispatch()

    return (
        <NavWrapper>

            {/* Tabs */}
            <div className='flex items-center gap-2 flex-wrap'>
                <ButtonTw
                    className={`${selectedTab === 'input' ? 'bg-inherit' : ''}`}
                    onClick={() => dispatch(editorActions.setSelectedTab('input'))}
                > Input</ButtonTw>
                <ButtonTw
                    className={`${selectedTab === 'output' ? 'bg-inherit' : ''}`}
                    onClick={() => dispatch(editorActions.setSelectedTab('output'))}
                >Output</ButtonTw>
                <ButtonTw
                    className={`${selectedTab === 'error' ? 'bg-inherit' : ''}`}
                    onClick={() => dispatch(editorActions.setSelectedTab('error'))}
                >Error</ButtonTw>
            </div>

            {/* Icons */}
            <div className='flex gap-2  '>

                <ContentCopy titleAccess='Copy' className='cursor-pointer' />


                <Download titleAccess='Download' className='cursor-pointer' />


                <Upload titleAccess='Upload' className='cursor-pointer' />

            </div>

        </NavWrapper >
    )
}
