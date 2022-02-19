import React, { Component } from "react";
// This will require to npm install axios
import axios from "axios";
import { FloatingLabel, Form, Container } from "react-bootstrap";
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
      .get("/note/" + this.props.match.params.id)
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
      .post("/update/" + this.props.match.params.id, newEditednote)
      .then((res) => console.log(res.data));

    this.props.history.push("/");
  }

  // This following section will display the update-form that takes the input from the user to update the data.
  render() {
    return (
      <>
        <Container>
          <div>
            <h3 align="center">Update Note</h3>
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
                  value="Update"
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

// You can get access to the history object's properties and the closest <Route>'s match via the withRouter
// higher-order component. This makes it easier for us to edit our records.

export default withRouter(Edit);
