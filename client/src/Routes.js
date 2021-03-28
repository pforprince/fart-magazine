import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screen.js/HomeScreen";
import NotesList from "./screen.js/NotesList";
import SearchResults from "./screen.js/SearchResults";
import SingleNote from "./screen.js/SingleNote";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/note/:id" exact component={SingleNote} />
        <Route path="/notes" exact component={NotesList} />
        <Route path="/search" exact component={SearchResults} />
      </Switch>
    </Router>
  );
};

export default Routes;
