import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import CustomModal from "./components/CustomModal";
import { useHistory } from "react-router";

const NotesList = () => {
  const history= useHistory()
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    axios
      .get("/note")
      .then((res) => {
        setNotes(res.data.notes);
      })
      .catch((e) => console.log(e));
  }, [notes]);

  const deleteNote = (id) => {
    axios.delete(`/note/${id}`).then(() => {
      const newData = notes.filter((note) => note._id !== id);
      setNotes(newData);
    });
  };

  return (
    <div className="container text-center mt-4 ">
      <div className="d-flex">
        <button onClick={()=> history.push("/")} className="btn-primary btn m-1 btn-block">Home Screen</button>
        <button onClick={()=> history.push("/search")} className="btn-primary btn m-1 btn-block">Search Screen</button>
      </div>
      {notes ? (
        <>
          <h2>All Notes</h2>
          <br />
          <ul className="list-group">
            {notes.map((note) => {
              return (
                <li
                  key={note._id}
                  className="list-group-item d-flex "
                  style={{ justifyContent: "space-between" }}
                >
                  <div>
                    <img
                      className="text-left"
                      width="80rem"
                      height="auto"
                      src={`../uploads/${note.imageName}`}
                    />
                  </div>
                  <div>
                    <p>
                      <span className="font-weight-bold">Title</span> -
                      {note.title}
                    </p>
                    <p>
                      <span className="font-weight-bold">Content</span> -
                      {note.content}
                    </p>
                  </div>
                  <div className="d-flex" style={{ flexDirection: "column" }}>
                    <CustomModal note={note} />
                    <button
                      className="btn m-1 btn-sm btn-danger"
                      onClick={() => deleteNote(note._id)}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `localhost:3000/note/${note._id}`
                        );
                      }}
                      className="btn m-1 btn-sm btn-info"
                    >
                      Copy link
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </div>
  );
};

export default NotesList;
