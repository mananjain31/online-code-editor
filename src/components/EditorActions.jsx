import { ContentCopy, Download, Save, Upload } from '@mui/icons-material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editorActions } from '../store/editor.slice'
import { ButtonTw } from './Buttons'

export const EditorActions = () => {

    const { selectedLanguage, fileName } = useSelector(state => state.editor)
    const dispatch = useDispatch()
    const onLanguageChange = ev => {
        const { value } = ev.target
        dispatch(editorActions.setSelectedLanguage(value))
    }
    const onFileNameChange = ev => {
        const { value } = ev.target
        dispatch(editorActions.setFileName(value))
    }

    return (
        <div className='bg-nav-footer-bg px-desktop-x py-desktop-y flex gap-2 flex-wrap items-center justify-between'>

            <div className='flex gap-2 flex-wrap  items-center'>

                <ContentCopy titleAccess='Copy' className='cursor-pointer' />


                <Download titleAccess='Download' className='cursor-pointer' />


                <Upload titleAccess='Upload' className='cursor-pointer' />

                <Save titleAccess='Save' className='cursor-pointer' />

                <label className='rounded-lg px-2 py-0.5 bg-btn-default' htmlFor='language' >
                    <select name="language" id="language" className='bg-inherit outline-none w-full cursor-pointer' value={selectedLanguage} onChange={onLanguageChange}>
                        <option value="java">Java</option>
                        <option value="python">Python</option>
                        <option value="javascript">Javascript</option>
                    </select>
                </label>

                <input type="text" className='bg-btn-default px-2 py-0.5 rounded-md' placeholder='File Name' value={fileName} onChange={onFileNameChange} />

            </div>

            <ButtonTw
                className="bg-primary"
            >Run</ButtonTw>

        </div>
    )
}
