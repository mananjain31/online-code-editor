import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth({ redirectLoggedIn }) {
    const location = useLocation();
    const user = useSelector(state => state.user);

    if (user.loggedIn && typeof redirectLoggedIn === "string")
        return (
            <Navigate
                to={redirectLoggedIn}
                state={{ from: location }}
                replace
            />
        );

    if (!user.loggedIn && !redirectLoggedIn)
        return <Navigate to="/login" state={{ from: location }} replace />;
    if (user.loggedIn) return <Outlet />;

    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
}
