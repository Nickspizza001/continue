// all the models come in here
const mongoose = require('mongoose');
const { userSchema } = require("./schema");
const userModel = mongoose.model('User', userSchema);

class User{
  static isUniqueEmail = async function (email) {
    let user = await userModel.find({ email: email });
    if(!user.length) {
      return true;
    }
    return false;
  }
  
  static isUniqueUsername = async function (username) {
    let user = await userModel.find({ username: username });
    if(!user.length) {
      return true;
    }
    return false;
  }
  
  static getById = async function (id) {
    const result = await userModel.findOne({ _id: id });
    if(!result) {
      throw new Error('invalid user id provided');
    }
    return result;
  }
  
  static create = async function (user) {
    const newUser = new userModel(user);
    const result = newUser.save();
    return result;
  }
  
  static update = async function (id, userData) {
    const user = await userModel.find({ _id: id });
    if (!user.length) {
      throw new Error('invalid user id provided');
    }
    const result = await userModel.findByIdAndUpdate(id, userData, { new: true });
    return result;
  }
  
  static delete = async function (id) {
    const deletedUser = await userModel.findByIdAndDelete(id)
    if(!deletedUser) {
      throw new Error('invalid user id provided');
    }
    // TO-DO: delete all links and pages related to user here
    return deletedUser;
    
  }
  
  static getAll = async function () {
    const result = await userModel.find();
    return result;
    // Response('success', 200, 'fetched all users successfully', result);    
  }

}

module.exports = User;

