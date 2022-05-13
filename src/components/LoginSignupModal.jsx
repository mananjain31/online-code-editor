import { Close, Mail, Password, Person } from '@mui/icons-material'
import { Divider, IconButton, InputAdornment, Modal, OutlinedInput } from '@mui/material'
import React from 'react'
import { ButtonTw } from './Buttons'

export const LoginSignupModal = ({ open, onClose }) => {

    const [formType, setFormType] = React.useState('login');
    const toggleFormType = () => setFormType(formType === 'login' ? 'signup' : 'login');

    return (

        <Modal open={!!open} onClose={onClose} className='flex justify-center items-center'>
            <section className='md:max-w-lg bg-gray-300 flex gap-4 flex-col  flex-1 px-desktop-x py-desktop-y rounded'>
                <header className='flex items-center justify-between'>
                    <h2 className='text-2xl'>
                        {formType === "login" ? "Login" : "Sign Up"}
                    </h2>
                    <IconButton onClick={onClose}>
                        <Close />
                    </IconButton>
                </header>
                <Divider />
                <main className='flex flex-col gap-3'>
                    {
                        formType === "login" ?
                            <>
                                <label htmlFor="emailUsername">
                                    Email / Username
                                </label>
                                <OutlinedInput startAdornment={<InputAdornment position='start'><Mail /></InputAdornment>} id="emailUsername" name="emailUsername" />

                                <label htmlFor="password">
                                    Password
                                </label>
                                <OutlinedInput startAdornment={<InputAdornment position='start'><Password /></InputAdornment>} id="password" name="password" />
                                <p>
                                    Does not have an Account? <span className='text-primary hover:text-blue-500 cursor-pointer' onClick={toggleFormType}>Signup</span>
                                </p>
                            </> :
                            <>
                                <label htmlFor="email">
                                    Email
                                </label>
                                <OutlinedInput startAdornment={<InputAdornment position='start'><Mail /></InputAdornment>} type="email" id="email" name="email" />
                                <label htmlFor="username">
                                    Username
                                </label>
                                <OutlinedInput startAdornment={<InputAdornment position='start'><Person /></InputAdornment>} id="username" name="username" />
                                <label htmlFor="password">
                                    Password
                                </label>
                                <OutlinedInput startAdornment={<InputAdornment position='start'><Password /></InputAdornment>} type="password" id="password" name="password" />
                                <label htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                                <OutlinedInput startAdornment={<InputAdornment position='start'><Password /></InputAdornment>} type="password" id="confirmPassword" name="confirmPassword" />
                                <p>
                                    Already have an Account? <span className='text-primary hover:text-blue-500 cursor-pointer' onClick={toggleFormType}>Login</span>
                                </p>
                            </>
                    }
                </main>
                <footer>
                    <ButtonTw className="bg-primary w-full text-white py-3">
                        {formType === "login" ? "Login" : "Sign Up"}
                    </ButtonTw>
                </footer>
            </section>
        </Modal >

    )
}
