const validator = require('validator');
const validateSignupData = (req)=>{
    const {firstName,lastName, email, password} = req.body;

    if(!firstName){
        throw new Error("Enter Firstname");
    }else if(!validator.isEmail(email)){
        throw new Error('Enter valid email id')
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Enter string password")
    }
}

module.exports = {validateSignupData}