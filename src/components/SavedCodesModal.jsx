import { Close } from '@mui/icons-material'
import { CircularProgress, Divider, IconButton, Modal } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteSavedCode, getSavedCodes, openSavedCode } from '../store/user.actions';
import SavedCodesTable from './SavedCodesTable';

export const SavedCodesModal = ({ open, onClose }) => {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state)
    // const { alert } = useSelector(state => state)
    React.useEffect(() => {
        open && dispatch(getSavedCodes())
    }, [open])

    const openCode = async savedCode => {
        const res = await dispatch(openSavedCode(savedCode))
        res && onClose()
    }
    const deleteCode = savedCode => {
        dispatch(deleteSavedCode(savedCode))
    }

    return (
        <Modal open={!!open} onClose={onClose} className='flex justify-center items-center'>
            <section className='md:max-w-3xl max-w-full bg-gray-300 flex gap-4 flex-col  flex-1 px-desktop-x py-desktop-y rounded'>
                <header className='flex items-center justify-between'>
                    <h2 className='text-2xl'>
                        Saved Codes
                    </h2>
                    <IconButton onClick={onClose}>
                        <Close />
                    </IconButton>
                </header>
                <Divider />
                <main className='flex flex-col gap-3'>
                    {
                        user.savedCodes ? (
                            <SavedCodesTable rows={user.savedCodes} openCode={openCode} deleteCode={deleteCode} />
                        ) : (
                            <div className='flex justify-center'>
                                <CircularProgress />
                            </div>
                        )
                    }
                </main>
            </section>
        </Modal >
    )
}
