const admins = require("../models/admin");

const validateRequest = function (data){
    if(!Object.keys(data).length){
        return `json body is missing`
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email regex pattern
    const dobRegex = /^\d{4}\/\d{2}\/\d{2}$/; // YYYY/MM/DD format regex
    const salaryRegex = /^[0-9]+$/; // Only numbers regex
    
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        if (!value) {
          return `${key} is required.`;
        }
        // Check if the email is valid
        if (key === "email" && !emailRegex.test(value)) {
          return "Invalid email format."

        }
        // Check if the salary contains only numbers
        if (key === "salary" && !salaryRegex.test(value)) {
          return "Salary must contain only numbers.";
        }
        // Check if the DOB is in the correct format (YYYY/MM/DD)
        if (key === "dob" && !dobRegex.test(value)) {
          return "DOB must be in YYYY/MM/DD format.";
        }
      }
    }
    return "validated";
}

module.exports = {
    validateRequest
}