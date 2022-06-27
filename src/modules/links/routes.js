// all the routes come in here
const linkRouter = require('express').Router()
const { getLinkById, createLink, updateLink, deleteLink } = require("./controllers");


linkRouter.route('/').post(createLink)

linkRouter.route('/:id').get(getLinkById)

linkRouter.route('/:id').patch(updateLink)

linkRouter.route('/:id').delete(deleteLink)

module.exports = linkRouter;
