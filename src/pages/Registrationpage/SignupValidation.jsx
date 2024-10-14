function Validation(values) {
    let errors = {};
    const email_pattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Name validation
    if (!values.name) {
        errors.name = "Required";
    }
    // Roll no. validation
    if (!values.roll) {
        errors.roll = "Required";
    }
    // Email validation
    if (!values.email) {
        errors.email = "Required";
    } else if (!email_pattern.test(values.email)) {
        errors.email = "Invalid Email. Only @gmail.com emails allowed.";
    }

    // Password validation
    if (!values.password) {
        errors.password = "Required";
    } else if (!password_pattern.test(values.password)) {
        errors.password = "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.";
    }

    return errors;
}

export default Validation;
