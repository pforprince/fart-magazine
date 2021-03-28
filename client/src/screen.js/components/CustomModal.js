import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
const CustomModal = ({ note }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateNote = (e) => {
    e.preventDefault();
    console.log(title, content);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("imageName", image);

    axios
      .put(`/note/${note._id}`, formData)
      .then((res) => {
        console.log(res);
        handleClose();
      })
      .catch((e) => console.log(e));
  };
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [image, setImage] = useState({});

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className=" my-2 form-control"
          />

          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type="text"
            oN
            className=" my-2 form-control"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            name="imageName"
            type="file"
            className=" my-2 form-control"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={updateNote} variant="primary">
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      <button onClick={handleShow} className="btn mx-1 btn-sm btn-warning">
        Edit
      </button>
    </div>
  );
};

export default CustomModal;
