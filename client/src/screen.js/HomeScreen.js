import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Form } from "react-bootstrap";
import NotesList from "./NotesList";

const HomeScreen = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState({});
  const history = useHistory();
  const addNote = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("imageName", image);

    axios
      .post("/note/add", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));

    setTitle("");
    setContent("");
    setImage("");
  };
  return (
    <div className="row">
      <div className="container mt-4 " style={{ maxWidth: "30rem" }}>
        <h3>Add new note</h3>
        <Form onSubmit={addNote} encType="multipart/form-data">
          <div className="form-group">
            <label>Title</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter Title"
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <input
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Enter Content"
            />
          </div>
          <div className="form-group">
            <label>File</label>
            <input
              required
              type="file"
              name="imageName"
              onChange={(e) => setImage(e.target.files[0])}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Add
          </button>
        </Form>

        <hr />
        <button
          className="btn btn-primary btn-block"
          onClick={() => history.push("/search")}
        >
          Search Screen
        </button>
        <hr />
        <button
          className="btn btn-primary btn-block"
          onClick={() => history.push("/notes")}
        >
          All Notes Screen
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
