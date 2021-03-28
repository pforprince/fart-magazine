import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";

const SingleNote = ({ match }) => {
  const [note, setNote] = useState({});
  useEffect(() => {
    axios
      .get(`/note/${match.params.id}`)
      .then((res) => {
        console.log(res.data.note);
        setNote(res.data.note);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="text-center container">
      {note ? (
        <div className="container mt-4 text-center">
          <img width="60%" height="20%" src={`../uploads/${note.imageName}`} />
          <h2>Title - {note.title}</h2>
          <h5>Content ={note.content}</h5>
        </div>
      ) : (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </div>
  );
};

export default SingleNote;
