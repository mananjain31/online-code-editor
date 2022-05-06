export const ButtonTw = ({ children, className, ...props }) => {
    return (
        <button className={`
            bg-btn-default 
            px-2 py-1 rounded
            ${className}
        `} {...props}>
            {children}
        </button>
    )
}
