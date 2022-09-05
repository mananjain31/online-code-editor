import { useSelector } from "react-redux";

export const ButtonTw = ({ children, className, style = {}, ...props }) => {
    const { styles } = useSelector(state => state.theme);

    let useDefaultStyles = true;
    if (
        (style &&
            (style.background ||
                style.backgroundColor ||
                style.backgroundImage)) ||
        (className && className.indexOf("bg-") !== -1)
    )
        useDefaultStyles = false;

    let joinedStyle = useDefaultStyles
        ? { ...style, background: styles.btnDefault }
        : style;
    return (
        <button
            className={`
            ${className}
            px-2 py-1 rounded
        `}
            style={joinedStyle}
            {...props}
        >
            {children}
        </button>
    );
};
