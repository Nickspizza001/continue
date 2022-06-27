const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');
// const userID = Joi.string().guid({ version: 'uuidv4' })
// const ImageExtension = require('joi-image-extension');
// const Joi = BaseJoi.extend(ImageExtension)

exports.userSchema = new mongoose.Schema({
    name: {
        first : String,
        last : String
    },
    username: String,
    email: String,
    phoneNumber: {
        countryCode: Number,
        number: Number
    },
    password: String,
    profilePhoto: String,
    bio: String,
    role: String,
    coverPhoto: String,
    subscription: String,
    disabled: Boolean
});

exports.createUserSchemaValidator = Joi.object({

    name: Joi.object().keys({
        first: Joi.string()
        .min(2)
        .max(50)
        .required(),

        last: Joi.string()
        .min(2)
        .max(50)
        .required(),
    }),

    username: Joi.string()
        .alphanum()
        .min(4)
        .max(50)
        .required(),

    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] }
        })
        .lowercase()
        .required(),

    phoneNumber: Joi.object().keys({
        countryCode: Joi.number()
            .required(),

        number: Joi.number()
            .required()
    }),

    password: Joi.string(),

    profilePhoto: Joi.string()
        .uri(),

    bio: Joi.string()
        .max(1024),
        
    role: Joi.string()
        .required(),

    coverPhoto: Joi.string()
        .uri(),

    subscription: Joi.string()
        .required(),

    disabled: Joi.boolean()
        .required(),
});

exports.updateUserSchemaValidator = Joi.object({

    name: Joi.object().keys({
        first: Joi.string()
            .min(2)
            .max(50),

        last: Joi.string()
            .min(2)
            .max(50)
    }),

    username: Joi.string()
        .alphanum()
        .min(4)
        .max(50),

    phoneNumber: Joi.object().keys({
        countryCode: Joi.number(),
        
        number: Joi.number()            
    }),

    password: Joi.string(),

    profilePhoto: Joi.string()
        .uri(),

    bio: Joi.string()
        .max(1024),

    role: Joi.string(),
       

    coverPhoto: Joi.string()
        .uri(),

    subscription: Joi.string(),
       
    disabled: Joi.boolean()
        
});

