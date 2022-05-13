import React from 'react'
import { InputOutputMain } from './InputOutputMain'
import { InputOutputNav } from './InputOutputNav'

export const InputOutput = () => {
    return (
        <div className='bg-ip-op-bg sm:w-4/12 sm:h-full h-3/5 flex flex-col'>
            <InputOutputNav />
            <InputOutputMain />
        </div>
    )
}
