import { SERVER_URL } from '../constants';
import { jwtDecode } from '../helpers/jwtDecode';
import { alertActions } from './alert.slice';
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