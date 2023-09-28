import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const constext = useContext(noteContext);
  const { deleteNote } = constext;
  const { notes, updateNote } = props;
  return (
    <>
      <div className="col-md-3">
        <div className="card my-3">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h5 className="card-title">{notes.title}</h5>
              <i
                className="fa-solid fa-trash-can mx-2"
                onClick={() => {
                  deleteNote(notes._id);
                  props.showAlert("deleted note successfully","success");
                }}
              />
              <i
                className="fa-solid fa-file-pen mx-2"
                onClick={() => {
                  updateNote(notes);
                }}
              />
            </div>
            <p className="card-text">{notes.description}</p>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
