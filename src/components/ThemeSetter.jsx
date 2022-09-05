import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../store/theme.slice";

export const ThemeSetter = () => {
    const {
        theme: { styles },
    } = useSelector(state => state);

    const dispatch = useDispatch();
    const onThemeChange = ev => {
        dispatch(themeActions.nextTheme());
    };

    const ThemeCircle = React.useMemo(() => {
        return (
            <div
                className="w-5 h-5 rounded-full select-none"
                style={{
                    background: `linear-gradient(to right, ${styles.editorBg}, ${styles.navBg})`,
                    border: `1px solid ${styles.secondary}`,
                }}
            />
        );
    }, [styles]);

    return (
        <div
            className={`flex flex-wrap items-center gap-2  
                    text-[rgb(255,255,255,0.6)] px-3 py-1 rounded-full bg-[rgb(0,0,0,0.1)] 
                    hover:duration-400 hover:bg-[rgb(0,0,0,0.3)]  cursor-pointer
                    active:bg-[rgb(0,0,0,0.1)] 
                    `}
            style={{
                border: `1px solid ${styles.primary}`,
            }}
            onClick={onThemeChange}
        >
            Theme
            {ThemeCircle}
        </div>
    );
};
