function Validation(values) {
    let errors = {};
    const email_pattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Email validation
    if (!values.email) {
        errors.email = "Required";
    } else if (!email_pattern.test(values.email)) {
        errors.email = "Invalid Email";
    }

    // Password validation
    if (!values.password) {
        errors.password = "Required";
    } else if (!password_pattern.test(values.password)) {
        errors.password = "Invalid Password";
    }

    return errors;
}

export default Validation;
