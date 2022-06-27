const mongoose = require('mongoose');
const Joi = require('joi');

exports.createLinkSchemaValidator = Joi.object().keys({
    author: Joi.string()
        .required(),

    title: Joi.string()
        .min(3)
        .max(30)
        .required(),

    description: Joi.string()
        .max(1024),

    url: ('http://', Joi.string()
        .uri()
        .required()),

    icon: Joi.string()
        .required(),

    privacy: Joi.boolean()
});

exports.updateLinkSchemaValidator = Joi.object().keys({
    author: Joi.string()
        .required(),

    title: Joi.string()
        .min(3)
        .max(30),


    description: Joi.string()
        .max(1024),

    url: ('http://', Joi.string()
        .uri()),
    
    icon: Joi.string(),
    
    privacy: Joi.boolean()
});

exports.linkSchema = new mongoose.Schema({
    id: String,
    author: String,
    title: String,
    description: String,
    url: String,
    icon: String,
    privacy: Boolean,

});


