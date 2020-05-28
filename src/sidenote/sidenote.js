import React from 'react'
import "./sidenote.css";
import moment from "moment";

const SideNote = ({ note, focused, refocus, remove }) => {
  let title = note.title.substring(0, 15).trim();
  if (title !== note.title.trim()) title += "...";

  let text = note.text.substring(0, 25).trim();
  if (text !== note.text.trim()) text += "..."
  return (
    <div
      className={"side-note " + (focused ? "focused" : "")}
      onClick={() => refocus(note.id)}
    >
      <button className="remove-btn" onClick={() => remove(note.id)}>&times;</button>
      <h3>{title}</h3>
      <p>{text}</p>
      <p className="date">{moment(note.created).format("Do MMM YYYY h:mm a")}</p>
    </div>
  );
}

export default SideNote
