import express from "express";
import {
  createNoteController,
  deleteNoteController,
  fetchAllNotesController,
  updateNoteController,
} from "../controllers/notesController.js";
import fetchuser from "../middleware/fetchuser.js";
import { body } from "express-validator";

const router = express.Router();
//create note
router.post(
  "/create-note",
  fetchuser,
  [
    //validation using express-validator
    body("title", "Enter valid title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 charactors").isLength({
      min: 5,
    }),
  ],
  createNoteController
);

//fetch note
router.get("/fetch-all-notes", fetchuser, fetchAllNotesController);

//update note
router.put("/update-note/:id", fetchuser, updateNoteController);

router.delete("/delete-note/:id",fetchuser,deleteNoteController)

export default router;
