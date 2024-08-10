import NoteContext from "./noteContext";
import { useState, useContext } from "react";
import NoteAlert from "./NoteAlert";

const NoteState = (props) => {
  const context = useContext(NoteAlert)
  const {alertTime} = context

  const initialNotes = [];

  const [note, setNote] = useState(initialNotes);



  const [show, setShow] = useState(false)

  const [noteInEdit, setNoteInEdit] = useState({id: "", etitle: "", edescription: "", etag: ""})

  const updateNote =(note) => {
    setShow(true)
    setNoteInEdit({"id": note._id, "etitle": note.title, "edescription": note.description, "etag": note.tag})
  }

  
  // Get all notes from mongo to client
  const getNotes = async () => {
    // TODO: API Call
    const response = await fetch(process.env.REACT_APP_URL + process.env.REACT_APP_GETNOTE_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setNote(json)
  };

 
  // add a note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    const response = await fetch(process.env.REACT_APP_URL + process.env.REACT_APP_ADDNOTE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json()
    alertTime(true, "Success", "Note Added Successfully", "bg-green-200")
    setNote(note.concat(json)); // we didn't use .push bcuz .push create a new array with pushed one whereas concat append pushed one in existing array

  };


  //delete a note
  const deleteNote = async(id) => {
    // TODO: API Call
    const response = await fetch(`${process.env.REACT_APP_URL + process.env.REACT_APP_DELETENOTE_URL}${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    alertTime(true, "Success", "Note Deleted Succesfully", "bg-red-300")
    console.log(json);

    // Logic to edit in client
    const newNote = note.filter((note) => {
      return note._id !== id;
    });
    setNote(newNote);
  };
  


  //edit a note
  const editNote = async (id, title, description, tag) => {
    // TODO: API Call
    const response = await fetch(`${process.env.REACT_APP_URL + process.env.REACT_APP_EDITNOTE_URL}${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();
    alertTime(true, "Success", "Note Edited Successfully", "bg-green-200")
    console.log(json);

    // Logic to edit in client
    // when we use {} bracket we need to use return and when we don't use {} bracket it itself return
    setNote((prevNotes) =>
      prevNotes.map((note) => {
        return note._id === id ? { ...note, title, description, tag } : note
    }))
    
  };

  return (
    <NoteContext.Provider value={{ note, addNote, deleteNote, editNote, getNotes, show,  setShow, updateNote, noteInEdit, setNoteInEdit }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
