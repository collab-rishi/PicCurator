const validator = require("validator");

const validateEmail = (email) => {
    return validator.isEmail(email);

};

const validateUserData = (data) => {
    const { username, email } = data;
    if (!username || !email ) {
        return "Both username and email are required. ";
    }
    if (!validateEmail(email)) {
        return "Email must be valid. ";
    }
    return null;
};



  

  

module.exports = { validateEmail, validateUserData };