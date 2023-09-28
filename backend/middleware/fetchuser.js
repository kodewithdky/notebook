import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

const fetchuser = (req, res, next) => {
  try {
    //get the user from the jwt token and add id to req object
    const token = req.header("auth-token");
    if (!token) {
      res.status(401).send({
        error: "Plese authenticate using a valid token",
      });
    }
    const data = jwt.verify(token, process.env.JWT_SECCRET);

    req.user = data;
    next();
  } catch (error) {
    res.status(401).send({
      error: "Plese authenticate using a valid token",
    });
  }
};

export default fetchuser;
