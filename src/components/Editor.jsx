import React from 'react'
import { EditorActions } from './EditorActions'
import { EditorMain } from './EditorMain'
import { EditorNav } from './EditorNav'

export const Editor = () => {
    return (
        <div className='h-full flex flex-col w-8/12'>
            <EditorNav />
            <EditorMain />
            <EditorActions />
        </div>
    )
}
