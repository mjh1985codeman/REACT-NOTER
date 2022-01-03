import React, { Component } from "react";
// This will require to npm install axios
import axios from "axios";
import { Link } from "react-router-dom";

const Note = (props) => (
  <tr>
    <td>{props.note.note_title}</td>
    <td>{props.note.note_body}</td>
    <td>{props.note.note_category}</td>
    <td>
      <Link to={"/edit/" + props.note._id}>Edit</Link> |
      <a
        href="/"
        onClick={() => {
          props.deleteNote(props.note._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

export default class NoteList extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.deleteNote = this.deleteNote.bind(this);
    this.state = { notes: [] };
  }

  // This method will get the data from the database.
  componentDidMount() {
    axios
      .get("http://localhost:5000/note/")
      .then((response) => {
        this.setState({ notes: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This method will delete a note based on the method
  deleteNote(id) {
    axios.delete("http://localhost:5000/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      note: this.state.notes.filter((el) => el._id !== id),
    });
  }

  // This method will map out the users on the table
  noteList() {
    return this.state.notes.map((currentNote) => {
      return (
        <Note
          note={currentNote}
          deleteNote={this.deleteNote}
          key={currentNote._id}
        />
      );
    });
  }

  // This following section will display the table with the notes of individuals.
  render() {
    return (
      <div>
        <h3>Note List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Body</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.noteList()}</tbody>
        </table>
      </div>
    );
  }
}