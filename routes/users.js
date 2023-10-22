const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  signup,
  signin,
  signout,
  getUser,
  patchUser,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), signup);
// зарегистрировать пользователя
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), signin);
// авторизовать пользователя
router.post('/signout', celebrate({
  body: Joi.object().keys({}),
}), signout);
// удалить токен

router.get('/users/me', auth, getUser);
router.patch('/users/me', auth, celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().optional(),
    name: Joi.string().min(2).max(30).optional(),
  }),
}), patchUser);

module.exports = router;
