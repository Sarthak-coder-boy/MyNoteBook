import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);


  // Get all Notes
  const getNotes = async() => {
    //  API CALL
     const response = await fetch(`${host}/api/note/fetchallnote`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' ,
//                   "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkMmI3ZjczYjZlOTc0N2RmZTdlYzIzIn0sImlhdCI6MTY3NDc1NzM1NX0.Dx81lNdsFAFI3VkClR5iwg7OD-S5xQlWHlBHoBho4G8"
                  "auth-token":localStorage.getItem("token");
                }
    });
    const json =  await response.json();
    setNotes(json)
  }

  // Add a Note
  const addNote = async(title , description , tag) => {
    // TODO API CALL
     
     const response = await fetch(`${host}/api/note/addnote`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' ,
//                   "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkMmI3ZjczYjZlOTc0N2RmZTdlYzIzIn0sImlhdCI6MTY3NDc1NzM1NX0.Dx81lNdsFAFI3VkClR5iwg7OD-S5xQlWHlBHoBho4G8"
          "auth-token":localStorage.getItem("token");
               },
      body: JSON.stringify({title , description , tag})
    })
   
    const note = await response.json()
    setNotes(notes.concat(note));
  };
  
  // Delete a Note
  const deleteNote = async(id) => {
    const response = await fetch(`${host}/api/note/deletenote/${id}`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' ,
//                   "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkMmI3ZjczYjZlOTc0N2RmZTdlYzIzIn0sImlhdCI6MTY3NDc1NzM1NX0.Dx81lNdsFAFI3VkClR5iwg7OD-S5xQlWHlBHoBho4G8"
                 "auth-token":localStorage.getItem("token");
               }
    })
   
    const note = await response.json()
    console.log(note)

   const newNotes = notes.filter((note)=>{
      return note._id!== id;
      })
    setNotes(newNotes);
  };

  // Edit a Note
  const editNote = async (id , title , description , tag) => {
    // API call
    const response = await fetch(`${host}/api/note/updatenote/${id}`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' ,
//                   "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkMmI3ZjczYjZlOTc0N2RmZTdlYzIzIn0sImlhdCI6MTY3NDc1NzM1NX0.Dx81lNdsFAFI3VkClR5iwg7OD-S5xQlWHlBHoBho4G8"
           "auth-token":localStorage.getItem("token");
               },
      body: JSON.stringify({title , description , tag})
    })

    const note =  await response.json();
    console.log(note)  
  

    // Logic to edit in client
    let newNotes = JSON.parse(JSON.stringify(notes));
    for(let i =0; i<newNotes.length; i++) {
     const element = newNotes[i];
     if(element._id === id) {
      newNotes[i].title = title;
      newNotes[i].description = description;
      newNotes[i].tag = tag;
      break;
    }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
