import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NoteList from "./notelist";

const notes = [
  { id: "1", title: "my note", text: "hello, world", created: new Date(0) },
  {
    id: "2",
    title: "note 2",
    text: "this is different and cool",
    created: new Date(0),
  },
];

describe("NoteList", () => {
  it("should render without crashing", () => {
    render(<NoteList notes={notes} />);
  });
  it('should render a "new note" button', () => {
    const { getByText } = render(<NoteList notes={notes} />);
    expect(getByText("+")).toBeInTheDocument();
  });
  it("should call newNote when add note button is clicked", () => {
    const newNote = jest.fn();
    const { getByText } = render(<NoteList notes={notes} newNote={newNote} />);
    fireEvent.click(getByText("+"));
    expect(newNote).toHaveBeenCalled();
  });
  it("should render all notes passed in", () => {
    const { getByText } = render(<NoteList notes={notes} />);
    expect(getByText("my note")).toBeInTheDocument();
    expect(getByText("note 2")).toBeInTheDocument();
  });
});
