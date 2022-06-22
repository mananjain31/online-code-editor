import { ArrowDropDown, ArrowDropUp, ArrowUpward, Person } from '@mui/icons-material';
import { ClickAwayListener, Grow } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../store/user.actions';
import { ButtonTw } from './Buttons'
import GrowDropDown from './GrowDropDown';

const UserDropdown = () => {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [dropDownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logoutUser());
    }

    const toggleDropdown = () => setDropdownOpen(state => !state);
    const closeDropdwon = () => setDropdownOpen(false);


    return (

        <ClickAwayListener onClickAway={closeDropdwon}>
            <span className='relative'>
                <ButtonTw className="bg-secondary" onClick={toggleDropdown}>
                    <span className='flex justify-center items-center gap-1'>
                        <Person />
                        {user.username}
                        {
                            dropDownOpen ?
                                <ArrowDropUp />
                                :
                                <ArrowDropDown />
                        }
                    </span>
                </ButtonTw>
                <GrowDropDown open={dropDownOpen} onClose={toggleDropdown} items={[
                    <ButtonTw className="w-full">View Profile</ButtonTw>,
                    <ButtonTw className="w-full">Saved Codes</ButtonTw>,
                    <ButtonTw onClick={handleLogout} className="w-full">Logout</ButtonTw>,
                ]} />
            </span>
        </ClickAwayListener>
    )
}

export default UserDropdown