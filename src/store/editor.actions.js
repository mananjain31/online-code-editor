import { SERVER_URL } from '../constants';
import { alertActions } from './alert.slice';
import { editorActions } from './editor.slice';

export const run = (editorData) => {
    return async dispatch => {

        dispatch(editorActions.setRunning(true));
        dispatch(alertActions.openInfo("Running..."));

        try {

            const response = await fetch(`${SERVER_URL}/codes/run`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editorData)
            });
            dispatch(editorActions.setRunning(false));

            const data = await response.json();
            console.log(data);
            dispatch(editorActions.setOutput(data.output));
            dispatch(editorActions.setSelectedTab('output'));
            dispatch(alertActions.openSuccess("Success!"));
            if (!data.error) {
                dispatch(alertActions.openSuccess("Success!"));
                dispatch(editorActions.setError(""));
            }
            else if (data.error) throw Error(data.error);
        } catch (error) {
            dispatch(alertActions.openError("Failed to run code!"));
            dispatch(editorActions.setSelectedTab('error'));
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
    }
}