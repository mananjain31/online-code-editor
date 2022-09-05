import React from "react";

export const NavWrapper = ({ children, className, ...props }) => {
    return (
        <div
            className={` 
            py-desktop-y px-desktop-x
            flex justify-between items-center flex-wrap gap-2
            ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};
