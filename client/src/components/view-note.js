import React, { Component } from "react";
// This will require to npm install axios
import axios from "axios";
import { Container, Card, Button } from "react-bootstrap";

const Note = (props) => (
  <>
    <Card className="text-center note-style">
      <Card.Header>
        <Card.Title className="crt-note-header">
          {props.note.note_title}
        </Card.Title>
      </Card.Header>
      <Card.Body className="note-style-body">
        <Card.Text>{props.note.note_body} </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        {props.note.note_category}
      </Card.Footer>
    </Card>
  </>
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

  // This will method will pull the note that is stored in state
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
