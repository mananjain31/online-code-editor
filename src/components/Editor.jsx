import React from 'react'
import { EditorNav } from './EditorNav'
import { EditorMain } from './EditorMain'
import { EditorFooter } from './EditorFooter'

export const Editor = () => {
    return (
        <div className='h-full flex flex-col sm:w-8/12'>
            <EditorNav />
            <EditorMain />
            <EditorFooter />
        </div>
    )
}
