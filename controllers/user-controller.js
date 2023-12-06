import User from "../models/user.js";
import Token from "../models/token.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    };
    console.log(user);
    const newUser = new User(user);
    await newUser.save();
    return res.status(200).json({ msg: "Signed Up Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
};

export const logIn = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "Password Not Matched" });
    }
    const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(
      user.toJSON(),
      process.env.REFRESH_SECRET_KEY
    );

    const newToken = new Token({ token: refreshToken });
    await newToken.save();

    return res
      .status(200)
      .json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: user.name,
        email: user.email,
        password: user.password,
      });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
