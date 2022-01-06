import React, { Component } from "react";
// This will require to npm install axios
import axios from "axios";
import { Container } from "react-bootstrap";

const Note = (props) => (
  <div>
    <p>Title: {props.note.note_title}</p>
    <p>Body: {props.note.note_body}</p>
    <p>Category: {props.note.note_category}</p>
  </div>
);

export default class View extends Component {
  // This will get the note based on the id from the database.
  constructor(props) {
    super(props);
    this.state = { note: {} };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/note/" + this.props.match.params.id)
      .then((response) => {
        this.setState({ note: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This method will map out the note on the table
  viewedNote() {
    return <Note note={this.state.note} />;
  }

  //This section is where it will show the single note.
  render() {
    return (
      <>
        <Container> {this.viewedNote()}</Container>
      </>
    );
  }
}
