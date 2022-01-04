import React, { Component } from "react";
// This will require to npm install axios
import axios from "axios";
import { FloatingLabel, Form, Container } from "react-bootstrap";

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
    //redirects the user back to the home page after form submission.
    window.location.href = "/";
  }

  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <>
        <Container>
          <div style={{ marginTop: 20 }}>
            <h3>Create New Note</h3>
            <form onSubmit={this.onSubmit}>
              <FloatingLabel controlId="floatingTextarea2" label="Note Title">
                <Form.Control
                  as="textarea"
                  placeholder="Note Title"
                  value={this.state.note_title}
                  onChange={this.onChangeNoteTitle}
                  className="mb-3"
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingTextarea2" label="Note Text">
                <Form.Control
                  as="textarea"
                  placeholder="Note Text"
                  value={this.state.note_body}
                  onChange={this.onChangeNoteBody}
                  style={{ height: "100px" }}
                  className="mb-3"
                />
              </FloatingLabel>
              <div className="form-group mb-3">
                <Form.Select
                  value={this.state.value}
                  onChange={this.onChangeNoteCategory}
                >
                  <option>Select Category. . .</option>
                  <option value="Important">Important</option>
                  <option value="To-Do">To-Do</option>
                  <option value="Random">Random</option>
                </Form.Select>
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Create Note"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        </Container>
      </>
    );
  }
}
