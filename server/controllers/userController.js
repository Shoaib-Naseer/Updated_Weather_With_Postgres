const User = require("../models/user");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const { sequelize } = require("../config/database");

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      res.status(400).json({ error: "Email is already in use" });
      return;
    } else {
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: newPassword,
      });
      if (newUser) {
        res.status(200).json({
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        });
      } else {
        res.status(400).json("Invalid user data");
        return;
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    return;
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    const match = await bcrypt.compare(password, user.password);

    if (user && match) {
      const { password, ...others } = user.toJSON();
      res.json({
        ...others,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ error: "Invalid user email or password" });
      return;
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    return;
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.json(users);
    return;
  } catch (err) {
    res.status(500).json({ error: err.message });
    return;
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    if (!sequelize.Validator.isNumeric(userId)) {
      res.status(400).json({ error: "Invalid user Id" });
      return;
    }
    const user = await User.findByPk(userId , {attributes:{exclude:['password']}})
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User does not exist" });
      return;
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    if (!sequelize.Validator.isNumeric(userId)) {
      res.status(400).json({ error: "Invalid user Id" });
      return;
    }
    const user = await User.findByPk(userId);

    if (user) {
      await user.destroy()
      res.json({ message: "User deleted" });
    } else {
      res.status(404).json({ error: "User does not exist" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    const match = await bcrypt.compare(currentPassword, user.password);

    if (match) {
      const salt = await bcrypt.genSalt(10);
      let hashedPassword = await bcrypt.hash(newPassword, salt);

      await user.update({password:hashedPassword})

      res.json({ message: "Password update successful" });
    } else {
      res.status(401).json({ error: "Incorrect password" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
