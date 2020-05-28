import React from "react";
import SideNote from "../sidenote/sidenote";
import "./notelist.css";

const NoteList = ({
  notes,
  focused,
  refocus,
  newNote,
  remove,
  className,
  toggleMenu,
}) => {
  return (
    <aside className={"sidebar " + className}>
      <button className="add-note" onClick={newNote}>
        +
      </button>
      <button className="hide-sidebar" onClick={toggleMenu}>
        close
      </button>
      <div className="note-list">
        {notes.map((note) => (
          <SideNote
            key={note.id}
            note={note}
            focused={focused === note.id}
            refocus={refocus}
            remove={remove}
          />
        ))}
      </div>
    </aside>
  );
};

export default NoteList;
