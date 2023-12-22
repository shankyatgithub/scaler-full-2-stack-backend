const express = require("express")
const { getUserById_handler, getAllUsers_handler, createNewUser_handler, updateUserById_handler} = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get('/', getAllUsers_handler);
userRouter.post('/', createNewUser_handler);
userRouter.get('/:id', getUserById_handler);
userRouter.patch('/:id',updateUserById_handler)

module.exports = userRouter;

