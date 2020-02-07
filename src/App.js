import React, { Component } from 'react';
import Header from './components/layout/Header';
import Notes from './components/Notes';
import AddNote from './components/AddNote';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  state = {
    notes: [
      {
        id: 1,
        title: 'Take out the trash',
        completed: false
      },
      {
        id: 2,
        title: 'Do this',
        completed: false
      },
      {
        id: 3,
        title: 'Do that',
        completed: true
      }
    ]
  };

  toggleComplete = (id) => {
    this.setState({
      notes: this.state.notes.map(note => {
        if (note.id === id) {
          note.completed = !note.completed;
        }
        return note;
      })
    });
  }

  deleteNote = (id) => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    })
  }

  addNote = (title) => {
    const newNote = {
      id: 4,
      title,
      completed: false
    };
    this.setState({
      //notes: this.state.notes.push(newNote) // Why does this line make notes type number?
      notes: [...this.state.notes, newNote]
    });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Header />
          <AddNote addNote={this.addNote}/>
          <Notes
            notes={this.state.notes}
            toggleComplete={this.toggleComplete}
            deleteNote={this.deleteNote}
          />
        </div>
      </div>
    );
  }
}

export default App;

