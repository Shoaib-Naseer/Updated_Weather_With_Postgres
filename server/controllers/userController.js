const User = require("../models/user");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("Email is already in use");
    } else {
      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: newPassword,
      });
      await newUser.save();
      if (newUser) {
        res.json({
          _id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        });
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const match = await bcrypt.compare(password, user.password);

    if (user && match) {
      const { _doc } = user;
      const { password, ...others } = _doc;
      res.json({
        ...others,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user email or password");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await User.deleteOne({ _id: req.params.id });
      res.json({ message: "User deleted" });
    } else {
      res.status(404);
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.params.id);
    const match = await bcrypt.compare(currentPassword, user.password);

    if (match) {
      const salt = await bcrypt.genSalt(10);
      let hashedPassword = await bcrypt.hash(newPassword, salt);

      await User.findByIdAndUpdate(req.params.id, { password: hashedPassword });

      res.json({ message: "Password update successful" });
    } else {
      res.status(401);
      throw new Error("incorrect password");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
