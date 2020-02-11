import React, { Component } from 'react';
import NavBar from './components/NavBar';
import NoteList from './components/note_list/NoteList';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Button, Grid, Icon } from 'semantic-ui-react'
import { inject, observer } from 'mobx-react';

interface Props {
  store?: any;
}

@inject('store')
@observer //TODO: explain this
class App extends Component<Props> {
  componentDidMount() { // When is this called?
    this.props.store.getNotes();
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <NavBar />
          <Grid centered={true}>
            <NoteList />
          </Grid>
          <Button icon
            labelPosition='left'
            onClick={this.props.store.addNote}>
            <Icon name='plus' />
            New Note
          </Button>
        </div>
      </div>
    );
  }
};

export default App;

