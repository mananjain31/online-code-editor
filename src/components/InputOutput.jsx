import React from "react";
import { useSelector } from "react-redux";
import { InputOutputMain } from "./InputOutputMain";
import { InputOutputNav } from "./InputOutputNav";

export const InputOutput = () => {
    const { styles } = useSelector(state => state.theme);
    return (
        <div
            style={{ background: styles.ipOpBg }}
            className="sm:w-4/12 sm:h-full h-3/5 flex flex-col"
        >
            <InputOutputNav />
            <InputOutputMain />
        </div>
    );
};
