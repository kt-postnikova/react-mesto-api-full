const usersRouter = require('express').Router();
const {
  getUsers,
  getUserById,
  // deleteUser,
  getUserInfo,
  updateUserProfile,
  updateUserAvatar,
  // signOut,
} = require('../controllers/users');
const { idValidator } = require('../middlewares/validation');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/me', getUserInfo);
usersRouter.get('/users/:id', idValidator, getUserById);
// usersRouter.delete('/users/:id', deleteUser);
usersRouter.patch('/users/me', updateUserProfile);
usersRouter.patch('/users/me/avatar', updateUserAvatar);
// usersRouter.delete('/signout', signOut);

module.exports = usersRouter;
