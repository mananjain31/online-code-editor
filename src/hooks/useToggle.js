import React from "react"

export default function useToggle(initialVal = false) {
    const [state, setState] = React.useState(initialVal);
    const toggle = () => setState(state => !state);
    return [state, toggle];
}