// all the routes come in here
const userRouter = require('express').Router()
const { getUserById, createUser, updateUser, deleteUser } = require("./controllers");
const { verifyAccessToken }  =require("../../helpers/jwthelper")


userRouter.route('/').post(createUser)

userRouter.route('/:id').get(verifyAccessToken, getUserById)

userRouter.route('/:id').patch(verifyAccessToken, updateUser)

userRouter.route('/:id').delete(verifyAccessToken,deleteUser)

module.exports = userRouter;
