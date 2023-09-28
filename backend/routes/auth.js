import express from "express";
import {
  getUserController,
  loginContorller,
  registerController,
} from "../controllers/authController.js";
import { body } from "express-validator";

const router = express.Router();

//register
router.post(
  "/register",
  [
    //validation using express-validator
    body("name", "Enter valid name").isLength({ min: 3 }),
    body("email", "Enter valid email").isEmail(),
    body(
      "password",
      "Password must be atleast 4 charactors and less than 10"
    ).isLength({ min: 4, max: 9 }),
  ],
  registerController
);
import fetchuser from "../middleware/fetchuser.js";
//login
router.post(
  "/login",
  [
    //validation using express-validator
    body("email", "Enter valid email").isEmail(),
    body("password", "Passwored cannot blank").exists(),
  ],
  loginContorller
);

//get user
router.post("/getuser",fetchuser,getUserController)

export default router;
