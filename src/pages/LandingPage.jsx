import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export const LandingPage = () => {
    const location = useLocation();

    return (
        <>
            <div>Landing</div>
            <Navigate to="/editor" state={{ from: location }} replace />
        </>
    )
}
