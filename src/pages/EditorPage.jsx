import React from 'react'
import { Editor } from '../components/Editor'
import { InputOutput } from '../components/InputOutput'

export const EditorPage = () => {



    return (
        <div className='text-fg flex sm:flex-row flex-col w-full h-[100vh]'>
            <Editor />
            <InputOutput />
        </div>
    )
}
