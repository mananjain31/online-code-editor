import { Box, Grow } from '@mui/material'
import React from 'react'

const GrowDropDown = (props) => {
    const { open, items, onClose } = props;
    const [seed, _] = React.useState(Math.random());
    return (
        <div
            onClick={onClose}
            className={`flex flex-col transition ease-in-out delay-150 overflow-y-hidden absolute top-full mt-2 gap-1 rounded items-stretch w-full ${!open && "pointer-events-none"}`}>
            {
                items.map((item, idx) =>
                    <Grow in={open} key={`${idx} ${seed}`} timeout={500 + 100 * idx}>
                        <Box >{item}</Box>
                    </Grow>
                )
            }
        </div>
    )
}

export default GrowDropDown