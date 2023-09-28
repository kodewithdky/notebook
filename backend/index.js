import express from "express";
import dBconnection from "./config/db.js";
import auth from "../backend/routes/auth.js";
import notes from "../backend/routes/notes.js";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

const app = express();

//configure env
dotenv.config();

//database config
dBconnection(process.env.DB_CONNECTION_USERNAME, process.env.DB_CONNECTION_PASSWORD);

const PORT = 7070;

// middleware
//used to get data req.bosy
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/notes", notes);

app.get("/", (req, res) => {
  res.send("Hello Bhai");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`.bgCyan.white);
});
