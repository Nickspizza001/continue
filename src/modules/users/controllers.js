
// all the controllers come in here
const mongoose = require('mongoose');
const { createUserSchemaValidator, updateUserSchemaValidator } = require("./schema");
const { validateData } = require("../../utils/validator");
const User = require("./models");
const Response = require('../../utils/response');
const {signAccessToken } = require("../../helpers/jwthelper")



exports.getUserById = async (req, res) => {
    try {
        let id = req.params.id
        const result = await User.getById(id);
        let response = Response.success(200, 'fetched user data successfully', result);
        res.status(response.code).send(response);
        return;
    } catch (error) {
        let response = Response.error(400, (error.message ? error.message : error));
        res.status(response.code).send(response);
        return;
    }
}

exports.createUser = async (req, res) => {
    try {
        let user = req.body;
        let validatedData = await validateData(user, createUserSchemaValidator);

        // if the user data is not valid, return an error response
        if(!validatedData.isValid) {
            let response = Response.error(400, (validatedData.error.message ? validatedData.error.message : validatedData.error));
            res.status(response.code).send(response);
            return;
        }

        if( !(await User.isUniqueEmail(user.email)) ) {
            let response = Response.error(400, 'email address already exists');
            res.status(response.code).send(response);
            return;
        }

        if( !(await User.isUniqueUsername(user.username)) ) {
            let response = Response.error(400, 'username already exists');   
            res.status(response.code).send(response);
            return;
        }

        const result = await User.create(user);
        const accessToken = await signAccessToken(result.id)
        let response = Response.success(201, 'user created successfully', result);
        res.status(response.code).send({accessToken});
        return;
    } catch (error) {
        let response = Response.error(400, (error.message ? error.message : error));
        res.status(response.code).send(response);
        return;
    }
}

exports.updateUser = async (req, res) => {
    try {
        let id = req.params.id;
        const userData = req.body;
        
        let validatedData = await validateData(userData, updateUserSchemaValidator);

        // if the link data is not valid, return an error response
        if (!validatedData.isValid) {
            let response = Response.error(400, (validatedData.error.message ? validatedData.error.message : validatedData.error));
            res.status(response.code).send(response);
            return;
        }
        if(userData.email) {
            if( !(await User.isUniqueEmail(userData.email)) ) {
                let response = Response.error(400, 'email address already exists');
                res.status(response.code).send(response);
                return;
            }
          }
        
          if(userData.username) {
            if( !(await User.isUniqueUsername(userData.username)) ) {
                let response = Response.error(400, 'username already exists');   
                res.status(response.code).send(response);
                return;
            }
          }
        
          if(userData.subscription) {
            // TO-DO: implement checks before updating subscription here
          }
        
          if(userData.password) {
            // TO-DO: implement checks before updating password here
          }

        const result = await User.update(id, userData)
        let response = Response.success(200, 'user data updated successfully', result);
        res.status(response.code).send(response);
        return;
    } catch (error) {
        let response = Response.error(400, (error.message ? error.message : error));
        res.status(response.code).send(response);
        return;
    }
}

exports.deleteUser = async (req, res) => {
    try {
        let id = req.params.id;
        const result = await User.delete(id);
        let response = Response.success(200, 'user deleted successfully');
        res.status(response.code).send(response);
        return;
    } catch (error) {
        let response = Response.error(400, (error.message ? error.message : error));
        res.status(response.code).send(response);
        return;
    }
}