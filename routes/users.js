const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  signup,
  signin,
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
// авторизовать пользователя
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
}), signin);
// зарегистрировать пользователя
router.use(auth);
// -- затребовать аутотентификацию --

router.get('/users/me', getUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().optional(),
    name: Joi.string().min(2).max(30).optional(),
  }),
}), patchUser);

module.exports = router;