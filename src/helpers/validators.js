export const validateEmail = function (email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export const validateSignupFormData = formData => {
    const errors = {};
    if (!formData.username) errors.username = "Username is required";
    else if (formData.username.length < 3) errors.username = "Username is too short";

    if (!formData.email) errors.email = "Email is required";
    else if (!validateEmail(formData.email)) errors.email = "Email is invalid";

    if (!formData.password) errors.password = "Password is required";
    else if (formData.password.length < 3) errors.password = "Password is too short";

    if (!formData.confirmPassword) errors.confirmPassword = "Confirm Password is required";
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match";

    console.log(errors);
    const valid = Object.keys(errors).length === 0;
    return {
        errors,
        valid,
        formData,
    };
}

export const validateLoginFormData = loginFormData => {
    const formData = { ...loginFormData };
    const errors = {};

    if (!formData.emailOrUsername) errors.emailOrUsername = "Email or Username is required";
    else if (formData.emailOrUsername.length < 3) errors.emailOrUsername = "Email or Username is too short";
    else if (validateEmail(formData.email)) formData.email = formData.emailOrUsername;
    else formData.username = formData.emailOrUsername;

    if (!formData.password) errors.password = "Password is required";
    else if (formData.password.length < 3) errors.password = "Password is too short";

    const valid = Object.keys(errors).length === 0;
    if (formData.username || formData.email) delete formData.emailOrUsername;

    return {
        errors,
        valid,
        formData
    };
}