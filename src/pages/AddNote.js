import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [allNotes, setAllNotes] = useState([]);

  const authtoken = localStorage.getItem("auth-token");
  const addNote = () => {
    const data = {
      title,
      description,
      tag,
    };
    fetch("/api/addnote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authtoken,
      },
      body: JSON.stringify(data),
    })
      .then((adnote) => adnote.json())
      .then((adnote) => {
        console.log({ adnote });
      })
      .catch((adnote__error) => {
        console.log({ adnote__error });
      });
  };
  useEffect(() => {
    fetch("/api/fetchnotes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authtoken,
      },
    })
      .then((fetchnotes) => fetchnotes.json())
      .then((fetchnotes) => {
        console.log({ fetchnotes });
        setAllNotes(fetchnotes.notes);
      })
      .catch((fetchnotes__error) => {
        console.log({ fetchnotes__error });
      });
  });
  return (
    <div>
      <Navbar />

      <div className="signup m-5">
        <h2>Add Note </h2>
        <br />
        <br />
        <input
          className="form-control"
          type="text"
          placeholder="enter title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <br />
        <br />
        <input
          className="form-control"
          type="text"
          placeholder="enter description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <br />
        <br />
        <input
          className="form-control"
          type="text"
          placeholder="Enter Tag (optional)"
          value={tag}
          onChange={(e) => {
            setTag(e.target.value);
          }}
        />
        <br />
        <br />
        <button className="btn btn-success" onClick={addNote}>
          Add Note
        </button>
      </div>
      <div className="row container">
        {allNotes.map((elem, index) => {
          return (
            <div
              key={index}
              className="card col-lg-4 col-md-6 col-sm-12 col-12 my-5"
            >
              <h2>{elem.title}</h2>
              <h2>{elem.description}</h2>
              <h2>{elem.user}</h2>
              <h2>{elem.tag}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddNote;
