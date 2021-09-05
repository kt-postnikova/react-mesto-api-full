const usersRouter = require('express').Router();
const {
  getUsers,
  getUserById,
  // deleteUser,
  getUserInfo,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');
const { idValidator, userInfoValidator, avatarValidation } = require('../middlewares/validation');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/me', getUserInfo);
usersRouter.get('/users/:id', idValidator, getUserById);
// usersRouter.delete('/users/:id', deleteUser);
usersRouter.patch('/users/me', userInfoValidator, updateUserProfile);
usersRouter.patch('/users/me/avatar', avatarValidation, updateUserAvatar);

module.exports = usersRouter;
