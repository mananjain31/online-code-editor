import { SERVER_URL } from '../constants';
import { jwtDecode } from '../helpers/jwtDecode';
import { alertActions } from './alert.slice';
import { editorActions } from './editor.slice';
import { userActions } from './user.slice'

export const loginUser = (formData) => {
    return async dispatch => {

        dispatch(alertActions.openInfo("Veryfying Login credentials..."));

        const response = await fetch(SERVER_URL + '/auth/signin', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        if (!data.success) {
            dispatch(alertActions.openError(data.message || "Invalid Login Credentials"));
            return false;
        }

        const { payload } = jwtDecode(data.token);
        dispatch(userActions.login(payload));
        dispatch(alertActions.openSuccess("Logged in Succesfully"));
        return true;
    }
}


export const signupUser = (formData) => {
    return async dispatch => {

        dispatch(alertActions.openInfo("Veryfying Signup credentials..."));

        const response = await fetch(SERVER_URL + '/auth/signup', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        if (!data.success) {
            dispatch(alertActions.openError(data.message || "Invalid Credentials"));
            return false;
        }

        dispatch(userActions.login(data.userData));
        dispatch(alertActions.openSuccess("Registered Succesfully"));

        return true;
    }
}

export const logoutUser = (formData) => {
    return async dispatch => {

        dispatch(alertActions.openInfo("Logging out..."));

        const response = await fetch(SERVER_URL + '/auth/logout');
        const data = await response.json();


        dispatch(userActions.logout());
        dispatch(alertActions.openSuccess("Logged out Succesfully"));

        return true;
    }
}

export const getSavedCodes = () => {
    return async dispatch => {

        // dispatch(alertActions.openInfo("Fetching Saved Codes..."))

        const response = await fetch(SERVER_URL + "/codes/")
        const data = await response.json();

        if (!data.success)
            return dispatch(alertActions.openError("Unable to fetch Saved Codes..."))

        // dispatch(alertActions.openSuccess("Saved Codes Fetched Successfully!"))
        dispatch(userActions.setSavedCodes(data.savedCodes));

        return data;
    }
}

export const deleteSavedCode = savedCode => {
    return async dispatch => {

        dispatch(alertActions.openWarning("Deleting file : " + savedCode.fileName))

        const response = await fetch(SERVER_URL + "/codes/" + savedCode._id, { method: "DELETE" })
        const data = await response.json();

        if (!data.success)
            return dispatch(alertActions.openError("Unable to Delete : " + savedCode.fileName))

        dispatch(alertActions.openSuccess("Deleted " + savedCode.fileName + " Successfully!"))
        dispatch(getSavedCodes())

        return data;
    }
}

export const openSavedCode = savedCode => {
    return async dispatch => {
        try {
            dispatch(alertActions.openInfo("Opening Code : " + savedCode.fileName))

            const response = await fetch(SERVER_URL + "/codes/" + savedCode._id)
            const data = await response.json();
            if (!data.success) throw Error();

            const { _id, code, selectedLanguage, fileName } = data.savedCode;
            dispatch(editorActions.set_id(_id));
            dispatch(editorActions.setCode(code));
            dispatch(editorActions.setSelectedLanguage(selectedLanguage));
            dispatch(editorActions.setFileName(fileName));

            dispatch(alertActions.openSuccess("Code Opened Successfully"))
        } catch (error) {
            dispatch(alertActions.openError("Something went wrong opening the code file..."))
            return false;
        }
        return true;
    }
}