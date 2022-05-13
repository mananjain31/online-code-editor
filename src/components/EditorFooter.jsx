import React from 'react'
import { AppContext } from '../App';
import { ButtonTw } from './Buttons'
import { NavWrapper } from './NavWrapper'

export const EditorFooter = () => {

    const { toggleLoginModal } = React.useContext(AppContext);

    return (
        <NavWrapper className='bg-nav-footer-bg'>
            <h1 className='font-extrabold'>Online Code Editor</h1>
            <ButtonTw className="bg-secondary" onClick={toggleLoginModal}>Login</ButtonTw>
        </NavWrapper>
    )
}
