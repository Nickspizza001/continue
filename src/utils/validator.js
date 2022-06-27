const Joi = require('joi');

/**
 * 
 * @param data this is the request body to be validated by the validator
 * @param validator this is a joi schema to perform the validation
 * @returns 
 */
exports.validateData = async (data, validator) => {
    try {
        const value = await validator.validateAsync(data);
        return {
            isValid: true,
            value
        };
    }
     catch (error) {
        return {
            isValid: false,
            error
        };
    }
}
