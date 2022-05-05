import { userActions } from './user.slice'

// export const loginUser = (formData) => {
//   return async dispatch => {
    
//     dispatch(alertActions.openInfo("Veryfying Login credentials..."));

//     const {data, error, status} = await fetcher('/login', {
//       method : 'POST',
//       body : JSON.stringify(formData)
//     });

//     if(error) 
//     {
//       if(status === 500) return dispatch(alertActions.openError("Internal Server Error"))
//       dispatch(alertActions.openError(error))
//       return false;
//     }

//     dispatch(userActions.login(data.userData));
//     dispatch(alertActions.openSuccess("Logged in Succesfully"));

//     return true; 
//   }
// }