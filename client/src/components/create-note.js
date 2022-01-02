import React, { Component } from "react";
// This will require to npm install axios
import axios from "axios";

export default class Create extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.onChangeNoteTitle = this.onChangeNoteTitle.bind(this);
    this.onChangeNoteBody = this.onChangeNoteBody.bind(this);
    this.onChangeNoteCategory = this.onChangeNoteCategory.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      note_title: "",
      note_body: "",
      note_category: "",
    };
  }

  // These methods will update the state properties.
  onChangeNoteTitle(e) {
    this.setState({
      note_title: e.target.value,
    });
  }

  onChangeNoteBody(e) {
    this.setState({
      note_body: e.target.value,
    });
  }

  onChangeNoteCategory(e) {
    this.setState({
      note_category: e.target.value,
    });
  }

  // This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();

    // When post request is sent to the create url, axios will add a new note(newNote) to the database.
    const newNote = {
      note_title: this.state.note_title,
      note_body: this.state.note_body,
      note_category: this.state.note_category,
    };

    axios
      .post("http://localhost:5000/note/add", newNote)
      .then((res) => console.log(res.data));

    // We will empty the state after posting the data to the database
    this.setState({
      note_title: "",
      note_body: "",
      note_category: "",
    });
  }

  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Create New Note</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Note Title: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.note_title}
              onChange={this.onChangeNoteTitle}
            />
          </div>
          <div className="form-group">
            <label>Note Body: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.note_body}
              onChange={this.onChangeNoteBody}
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityLow"
                value="Important"
                checked={this.state.note_category === "Important"}
                onChange={this.onChangeNoteCategory}
              />
              <label className="form-check-label">Important</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityMedium"
                value="To-Do"
                checked={this.state.note_category === "To-Do"}
                onChange={this.onChangeNoteCategory}
              />
              <label className="form-check-label">To-Do</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityHigh"
                value="Random"
                checked={this.state.note_category === "Random"}
                onChange={this.onChangeNoteCategory}
              />
              <label className="form-check-label">Random</label>
            </div>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create person"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}