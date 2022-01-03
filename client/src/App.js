import React from "react";

// We use Route in order to define the different routes of our application
import { Route } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import Create from "./components/create-note";
import Edit from "./components/edit-note";
import NoteList from "./components/noteList";

const App = () => {
  return (
    <>
      <Navbar />

      <Route exact path="/">
        {" "}
        <NoteList />
      </Route>
      <Route path="/create">
        {" "}
        <Create />
      </Route>
      <Route path="/edit/:id" component={Edit} />
    </>
  );
};

export default App;
