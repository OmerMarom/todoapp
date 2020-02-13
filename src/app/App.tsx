import React, { Component } from 'react';
import NavBar from '../components/nav_bar/NavBar';
import NoteList from '../components/note_list/NoteList';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Button, Grid } from 'semantic-ui-react'
import { inject, observer } from 'mobx-react';
import { MainStore } from '../stores/MainStore'

interface Props {
  store?: MainStore;
}

@inject('store')
@observer
class App extends Component<Props> {
  componentDidMount() {
    this.props.store.getNotes();
  }

  render() {
    return (
      <div className="app"> 
        <NavBar />
        <div className="navBarPlaceholder" />
        <div className="container">
          <Grid centered={true}>
            <NoteList />
          </Grid>
          { this.props.store.notes.length < 10 && 
            <Button 
              circular icon = "plus"
              className="addNoteButton"
              onClick={this.props.store.addNote}
            /> 
          }
        </div>
      </div>
    );
  }
};

export default App;