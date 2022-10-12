import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dkeeperr } from "../../../declarations/dkeeperr";

function App() {
    const [ notes, setNotes ] = useState([]);

    function addNote(newNote) {
        setNotes(prevNotes => {
            dkeeperr.createNote(newNote.title, newNote.content)
            return [newNote, ...prevNotes];
        });
    }

    // We are going to trigger a function when the App component is re-rendered.
    // # Important Comment: useEffect cannot be turned into an asynchronous function intself.
    useEffect(() => {
        console.log("useEffect is triggered");
        fetchData();
    }, []);

    async function fetchData() {
        const notesArray = await dkeeperr.readNotes();
        setNotes(notesArray);
    }

    function deleteNote(id) {
        // Updating the Backend
        dkeeperr.removeNote(id);
        setNotes(prevNotes => {
            return prevNotes.filter((noteItem, index) => {
                return index !== id;
            });
        });
    }

    return (
        <div>
            <Header />
            <CreateArea onAdd={addNote} />
            {notes.map((noteItem, index) => {
                return (
                    <Note 
                        key={index}
                        id={index}
                        title={noteItem.title}
                        content={noteItem.content}
                        onDelete={deleteNote}
                    />
                );
            })}
            <Footer />
        </div>
    );
}

export default App;