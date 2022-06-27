const mongoose = require('mongoose');
const Joi = require('joi');

exports.pageSchemaValidator = Joi.object({
    id: userID.required()
        .required()
        .strict(),
    author: Joi.string()
        .alphanum()
        .min(4)
        .max(50)
        .required(),
    title: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    description: Joi.string(),
    url: ('http:/', Joi.string()
        .uri()
        .required()),
    privacy: Joi.string(),
    links: Joi.array()
        .length(10)
        .required()

});

exports.pageSchema = new mongoose.Schema({
    id: String,
    author: String,
    title: String,
    description: String,
    url: String,
    privacy: String,
    links: Array,

});

// let data = {
//     id,
//     author,
//     title,
//     description,
//     url,
//     privacy,
//     links
// }


