import React, { Component } from "react";
import NoteList from "../notelist/notelist";
import Editor from "../editor/editor";
import { v4 as uuid } from "uuid";
import "./notes.css";

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      focused: null,
      showSidebar: false,
    };
  }

  componentDidMount() {
    this.hydrateLSData();

    window.addEventListener("beforeunload", this.saveLSData);
  }

  hydrateLSData() {
    if (!localStorage) return;
    let notes = localStorage.getItem("notes");
    let focused = localStorage.getItem("focused");
    if (!notes || !focused) return;
    notes = JSON.parse(notes);
    focused = JSON.parse(focused);
    this.setState({
      notes,
      focused,
    });
  }

  saveLSData = () => {
    if (!localStorage) return;
    localStorage.setItem("notes", JSON.stringify(this.state.notes));
    localStorage.setItem("focused", JSON.stringify(this.state.focused));
  };

  getNote = (id) => {
    if (!id) return null;
    return this.state.notes.find((n) => n.id === id);
  };

  refocus = (id) => {
    if (!id) return;
    this.setState({ focused: id, showSidebar: false });
  };

  createNote = () => {
    const newNote = {
      id: uuid(),
      title: "New note",
      text: "",
      created: new Date(),
    };
    this.setState({
      notes: [newNote, ...this.state.notes],
    });
    this.refocus(newNote.id);
  };

  changeNote = (note) => {
    const allNotes = [...this.state.notes];
    allNotes[allNotes.findIndex((n) => n.id === note.id)] = note;
    this.setState({ notes: allNotes });
  };

  removeNote = (id) => {
    const allNotes = [...this.state.notes];
    let index = allNotes.findIndex((n) => n.id === id);
    allNotes.splice(index, 1);

    let newId = null;
    if (allNotes.length) {
      if (!allNotes[index]) index = allNotes.length - 1;
      newId = allNotes[index].id;
    }

    this.setState({ notes: allNotes, focused: newId });
  };

  toggleMenu = () => {
    this.setState({
      showSidebar: !this.state.showSidebar,
    });
  };

  componentDidUpdate() {
    const currentNote = this.getNote(this.state.focused);
    if (currentNote) document.title = currentNote.title + " - Noteible";
    else document.title = "Noteible";
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.saveLSData);
  }

  render() {
    const currentNote = this.getNote(this.state.focused);
    const editor = currentNote ? (
      <Editor note={currentNote} key={currentNote.id} save={this.changeNote} />
    ) : (
      <p className="no-note" onClick={this.createNote}>
        {this.state.notes.length ? "click on" : "create"} a note to get started
      </p>
    );
    return (
      <div className="notes">
        <button className="show-sidebar" onClick={this.toggleMenu}>
          menu
        </button>
        <NoteList
          {...this.state}
          refocus={this.refocus}
          newNote={this.createNote}
          remove={this.removeNote}
          className={this.state.showSidebar ? "expand" : ""}
          toggleMenu={this.toggleMenu}
        />

        {editor}
      </div>
    );
  }
}
