import React, { Component } from 'react';
import NavBar from './components/layout/NavBar';
import NoteList from './components/NoteList';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Button, Icon } from 'semantic-ui-react'
import { inject, observer } from 'mobx-react';

class App extends Component {
  componentDidMount() { // When is this called?
    const store = this.props.MainStore;
    store.getNotes();
  }

  render() {
    const store = this.props.MainStore;
    return (
      <div className="App">
        <div className="container">
          <NavBar />
          <NoteList />
          <Button icon
            labelPosition='left'
            onClick={store.addNote}>
            <Icon name='plus' />
            New Note
              </Button>
        </div>
      </div>
    );
  }
}

export default inject('MainStore')(observer(App));

