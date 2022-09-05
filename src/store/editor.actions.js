import { SERVER_URL } from "../constants";
import { alertActions } from "./alert.slice";
import { editorActions } from "./editor.slice";

export const run = editorData => {
    return async dispatch => {
        dispatch(editorActions.setRunning(true));
        dispatch(alertActions.openInfo("Running..."));

        try {
            const { codeId } = await (
                await fetch(`${SERVER_URL}/codes/codeId`)
            ).json();
            dispatch(editorActions.setCodeId(codeId));
            const response = await fetch(`${SERVER_URL}/codes/run`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...editorData,
                    codeId,
                }),
            });
            dispatch(editorActions.setRunning(false));

            const data = await response.json();

            if (data.stopped) return;
            dispatch(editorActions.setOutput(data.output));
            dispatch(editorActions.setSelectedTab("output"));
            dispatch(alertActions.openSuccess("Success!"));
            if (!data.error) {
                dispatch(alertActions.openSuccess("Success!"));
                dispatch(editorActions.setError(""));
            } else if (data.error) throw Error(data.error);
        } catch (error) {
            dispatch(alertActions.openError("Failed to run code!"));
            dispatch(editorActions.setSelectedTab("error"));
            dispatch(editorActions.setError(error?.message));
            dispatch(editorActions.setRunning(false));
        }

        // const { data, error, status } = await fetcher(SERVER_URL + '/run', {
        //     method: 'POST',
        //     body: JSON.stringify(editorData)
        // });

        // if (error) {
        //     if (status === 500) return dispatch(alertActions.openError("Internal Server Error"))
        //     dispatch(alertActions.openError(error))
        //     return false;
        // }
        return true;
    };
};

export const stop = codeId => {
    return async dispatch => {
        dispatch(alertActions.openInfo("Stopping..."));
        const response = await fetch(`${SERVER_URL}/codes/stop/${codeId}`, {
            method: "DELETE",
        });
        dispatch(editorActions.setRunning(false));

        const data = await response.json();

        const { error } = data;
        dispatch(alertActions.openInfo("Stopped the code Execution!"));
        dispatch(editorActions.setSelectedTab("error"));
        dispatch(editorActions.setError(error));

        return true;
    };
};

export const save = codeData => {
    return async dispatch => {
        const data = await (
            await fetch(`${SERVER_URL}/codes/save`, {
                method: "PUT",
                body: JSON.stringify(codeData),
                headers: {
                    "Content-Type": "application/json",
                },
            })
        ).json();
        if (!data.success)
            return dispatch(alertActions.openError(data.message));
        dispatch(alertActions.openSuccess(data.message));
        return true;
    };
};
