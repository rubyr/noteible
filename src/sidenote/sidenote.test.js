import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SideNote from "./sidenote";

const note = {
  id: "1",
  title: "cool note",
  text: "nice",
  created: new Date(0),
};

const longNote = {
  id: "2",
  title:
    "wowie this is fantastic oh my gosh wow this title is reeeeeeeeeeally long",
  text:
    "and this text is long too i sure hope my stuff works because otherwise i will cry and i dont want to do that",
  created: new Date(0),
};

describe("SideNote", () => {
  it("should render without crashing", () => {
    render(<SideNote note={note} />);
  });

  it("should display the note properties", () => {
    const { getByText } = render(<SideNote note={note} />);
    expect(getByText("cool note")).toBeInTheDocument();
    expect(getByText("nice")).toBeInTheDocument();
    expect(getByText("31st Dec 1969 5:00 pm")).toBeInTheDocument();
  });

  it("should trim the title and note content if too long", () => {
    const { getByText } = render(<SideNote note={longNote} />);
    expect(getByText("wowie this is f...")).toBeInTheDocument();
    expect(getByText("and this text is long too...")).toBeInTheDocument();
  });

  it("should be highlighted when the note is focused, and not be highlighted when it is not", () => {
    const unfocusedGBT = render(<SideNote note={note} focused={false} />)
      .getByText;
    expect(unfocusedGBT("cool note").parentElement).not.toHaveClass("focused");
    cleanup();
    const focusedGBT = render(<SideNote note={note} focused={true} />)
      .getByText;
    expect(focusedGBT("cool note").parentElement).toHaveClass("focused");
  });

  it("should call refocus when clicked", () => {
    const refocus = jest.fn();
    const { getByText } = render(
      <SideNote note={note} focused={false} refocus={refocus} />
    );
    fireEvent.click(getByText("cool note"));
    expect(refocus).toHaveBeenCalledWith("1");
  });

  it("should call remove when delete button is clicked", () => {
    const refocus = jest.fn();
    const remove = jest.fn();
    const { getByText } = render(
      <SideNote note={note} focused={false} refocus={refocus} remove={remove} />
    );
    fireEvent.click(getByText("×"));
    expect(remove).toHaveBeenCalledWith("1");
  });
});
