import React, { Component } from "react";
import "./editor.css";

export default class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.note,
    };

    this.saveTimer = null;
  }

  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });

    if (this.saveTimer) clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(() => {
      this.props.save({ ...this.state });
    }, 1000);
  };

  componentWillUnmount() {
    this.props.save({ ...this.state });
    if (this.saveTimer) clearTimeout(this.saveTimer);
  }

  render() {
    return (
      <div className="editor">
        {this.props.children}
        <input
          name="title"
          onChange={this.change}
          value={this.state.title}
          className="title"
        ></input>
        <textarea
          name="text"
          onChange={this.change}
          value={this.state.text}
          className="text"
          placeholder="Enter your notes here..."
        ></textarea>
      </div>
    );
  }
}
