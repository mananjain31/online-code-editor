import { Add, ContentCopy, Download, Save, Upload } from '@mui/icons-material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppContext } from '../App'
import { copy } from '../helpers/copy'
import { download } from '../helpers/download'
import { upload } from '../helpers/upload'
import { alertActions } from '../store/alert.slice'
import { run, save } from '../store/editor.actions'
import { editorActions, languages } from '../store/editor.slice'
import { ButtonTw } from './Buttons'
import { ThemeSetter } from './ThemeSetter'
import UserDropdown from './UserDropdown'

export const EditorNav = () => {

    const { editor, user } = useSelector(state => state)

    const { toggleLoginModal } = React.useContext(AppContext);

    const dispatch = useDispatch()
    const onLanguageChange = ev => {
        const { value } = ev.target
        dispatch(editorActions.setSelectedLanguage(value))
    }
    const onFileNameChange = ev => {
        const { value } = ev.target
        dispatch(editorActions.setFileName(value))
    }
    const openNewFile = () => {
        var win = window.open("/", '_blank');
        win.focus();
    }
    const onDownload = () => {
        download(
            editor.code, editor.fileName
        )
    }
    const onUpload = () => {
        upload(content => dispatch(editorActions.setCode(content)));
    }
    const onCopy = () => {
        copy(editor.code);
        dispatch(alertActions.openInfo("Code copied to clipboard"));
    }
    const onSave = () => {
        const { selectedLanguage, code, fileName } = editor;
        dispatch(save({ selectedLanguage, code, fileName }));
    }



    return (
        <div className='bg-nav-footer-bg px-desktop-x py-desktop-y flex  gap-2 flex-wrap items-center '>

            {/* <div className='flex flex-wrap items-center gap-2'> */}
            <ThemeSetter />

            <ContentCopy titleAccess='Copy Code' className='cursor-pointer' onClick={onCopy} />


            <Download titleAccess='Download Code' className='cursor-pointer' onClick={onDownload} />


            <Upload titleAccess='Upload Code' className='cursor-pointer' onClick={onUpload} />

            {
                user.loggedIn ?
                    <Save titleAccess='Save' className='cursor-pointer' onClick={onSave} />
                    :
                    <span className='text-btn-default'>
                        <Save titleAccess='Login to Save' className='cursor-pointer' />
                    </span>
            }

            <label className='rounded-lg px-2 py-0.5 bg-btn-default' htmlFor='language' >
                <select name="language" id="language" className='bg-inherit outline-none w-full cursor-pointer' value={editor?.selectedLanguage} onChange={onLanguageChange}>
                    {
                        Object.keys(languages).map(language => {
                            return <option key={language} value={language}>{languages[language]?.label}</option>
                        })
                    }
                </select>
            </label>
            {/* </div> */}

            <input type="text" className='bg-btn-default px-2 py-0.5 rounded-md' placeholder='File Name' value={editor?.fileName} onChange={onFileNameChange} />

            <Add titleAccess='New File' className='cursor-pointer' onClick={openNewFile} />

            <span className='sm:ml-auto'>
                {
                    user.loggedIn ? (
                        <UserDropdown />
                    ) : (
                        <ButtonTw className="bg-secondary" onClick={toggleLoginModal}>Login</ButtonTw>
                    )
                }
            </span>

        </div>
    )
}
