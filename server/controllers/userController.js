const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const { User, UserCourses } = require("../models/model");
const sequelize = require("../db");
const jwt = require("jsonwebtoken");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "12h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role, full_name } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest("Некорректный email или пароль"));
    }

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest("Пользователь уже существует"));
    }
    const hashPassword = await bcrypt.hash(password, 5);

    const user = await User.create({
      email,
      role,
      password: hashPassword,
      full_name,
    });

    const token = generateJwt(user.id, email, user.role);
    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("Некорректный email или пароль"));
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.badRequest("Пользователя не существует"));
    }

    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.badRequest("Указан неверный пароль"));
    }
    const token = generateJwt(user.id, email, user.role);
    return res.json({ token });
  }

  async getUser(req, res, next) {
    const email = req.params.email;
    const user = await User.findOne({ where: { email } });
    return user
      ? res.json(user)
      : next(ApiError.badRequest("Пользователя не существует"));
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.password);
    res.json({ token });
  }
}

module.exports = new UserController();
