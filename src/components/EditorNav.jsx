import React from 'react'
import { ButtonTw } from './Buttons'
import { NavWrapper } from './NavWrapper'

export const EditorNav = () => {
    return (
        <NavWrapper className='bg-nav-footer-bg'>
            <h1 className='font-extrabold'>Online Code Editor</h1>
            <ButtonTw className="bg-secondary">Login</ButtonTw>

        </NavWrapper>
    )
}
