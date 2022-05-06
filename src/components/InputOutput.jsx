import React from 'react'
import { InputOutputMain } from './InputOutputMain'
import { InputOutputNav } from './InputOutputNav'

export const InputOutput = () => {
    return (
        <div className='bg-ip-op-bg w-4/12 flex flex-col'>
            <InputOutputNav />
            <InputOutputMain />
        </div>
    )
}
