import React, { Component } from "react";
// This will require to npm install axios
import axios from "axios";
import { withRouter } from "react-router";

class Edit extends Component {
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
      notes: [],
    };
  }
  // This will get the note based on the id from the database.
  componentDidMount() {
    axios
      .get("http://localhost:5000/note/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          note_title: response.data.note_title,
          note_body: response.data.note_body,
          note_category: response.data.note_category,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
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
    const newEditednote = {
      note_title: this.state.note_title,
      note_body: this.state.note_body,
      note_category: this.state.note_category,
    };
    console.log(newEditednote);

    // This will send a post request to update the data in the database.
    axios
      .post(
        "http://localhost:5000/update/" + this.props.match.params.id,
        newEditednote
      )
      .then((res) => console.log(res.data));

    this.props.history.push("/");
  }

  // This following section will display the update-form that takes the input from the user to update the data.
  render() {
    return (
      <div>
        <h3 align="center">Update Note</h3>
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
          <br />

          <div className="form-group">
            <input
              type="submit"
              value="Update Note"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

// You can get access to the history object's properties and the closest <Route>'s match via the withRouter
// higher-order component. This makes it easier for us to edit our records.

export default withRouter(Edit);
