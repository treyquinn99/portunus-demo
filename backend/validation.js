import validator from 'validator';

function validateNewAccount(data) {
    let errors = {};
    // validator only takes in strings. Add '' to the end to convert any empty fields to empty string.
    if (validator.isEmpty(data.name + '')) {
        errors.name = "Name field cannot be empty";
    }
    if (validator.isEmpty(data.email + '')) {
        errors.email = "Email field cannot be empty";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Email is not in correct format";
    }
    if (validator.isEmpty(data.password + '')) {
        errors.password = "Password field cannot be empty";
    }
    if (validator.isEmpty(data.collegeYear + '')) {
        errors.collegeYear = "College year field cannot be empty";
    }
    if (validator.isEmpty(data.major + '')) {
        errors.major = "Email field cannot be empty";
    }
    return {
        errors, isValid: isEmpty(errors)
    }
}

function validateLogin(data) {
    let errors = {};
    if (validator.isEmpty(data.email + '')) {
        errors.email = "Email cannot be empty";
    } else if (!validator.isEmail(data.email)) {
        errors.email = "Please enter a valid email address.";
    }
    if (validator.isEmpty(data.password + '')) {
        errors.password = "Passowrd cannot be empty";
    }
}


modules.export = {validateLogin, validateNewAccount};