import React from "react";

// We use Route in order to define the different routes of our application
import { Routes, Route } from "react-router-dom";

// We import all the components we need in our app
import Create from "./components/create-note";
import NoteList from "./components/noteList";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<NoteList />}></Route>
      <Route path="/create" element={<Create />}></Route>
    </Routes>
  );
};

export default App;
