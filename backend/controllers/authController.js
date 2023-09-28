import User from "../models/User.js";
import { validationResult } from "express-validator";
import { hashedPassword, comparePassword } from "../helpers/authHelper.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//register
export const registerController = async (req, res) => {
  try {
    //validation using express-validator
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send({
        error: error.array(),
      });
    }
    //find existing user based on email
    const existingUser = await User.findOne({ email: req.body.email });
    //chacking existing user
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Already registered please login",
      });
    }
    //hash password
    const hashPassword = await hashedPassword(req.body.password);
    // creating new user
    const user = await new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });

    //save
    await user.save();
    res.status(200).send({
      success: true,
      message: "Regitration successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Enternal Sever Error",
    });
  }
};

//login
export const loginContorller = async (req, res) => {
  try {
    //validation using express-validator
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send({
        error: error.array(),
      });
    }
    const { email, password } = req.body;
    //find existing user based on email
    const user = await User.findOne({ email });
    //chacking existing user
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Please try to correct credintials",
      });
    }
    //compare password or maching password
    const comparedPassword = await comparePassword(password, user.password);

    if (!comparedPassword) {
      return res.status(200).send({
        success: false,
        message: "Please try to correct credintials",
      });
    }

    const authtoken = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECCRET
    );
    // res.json(authtoken)
    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        name: user.name,
        email: user.email,
      },
      authtoken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Enternal Sever Error",
    });
  }
};

//get user
export const getUserController = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Enternal Sever Error",
    });
  }
};
