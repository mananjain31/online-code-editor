export const ButtonTw = ({ children, className, ...props }) => {
    return (
        <button className={`
        ${className}
            bg-btn-default 
            px-2 py-1 rounded
        `} {...props}>
            {children}
        </button>
    )
}
