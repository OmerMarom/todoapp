import React, { Component } from 'react';
import NavBar from './components/layout/NavBar';
import Notes from './components/Notes';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Button, Icon } from 'semantic-ui-react'

class App extends Component {
  state = {
    notes: []
  };

  renderNotes = (data) => {
    this.setState({
      notes: data.notes.sort(
        (note1, note2) => {
          return new Date(note1.createdAt) > new Date(note2.createdAt) ? -1 : 1;
        })
    });
  }

  getNotes = () => {
    let query = `
      query {
        notes {
          _id
          title
          createdAt
          todos {
            _id
            description
            isChecked
            createdAt
          }
        }
      }
    `;

    this.dbOperation(query, this.renderNotes);
  }

  addNote = () => {
    let query = `
      mutation {
        createNote(newNote:{title: "New Note"}) {
          _id
        }
      }
    `;

    this.dbOperation(query, this.getNotes);
  }

  updateTitle = (noteId, titleString) => {
    let note = this.state.notes.find((note) => noteId === note._id);
    if (note.title === titleString) {
      return;
    }

    let query = `
      mutation {
        updateNote(updatedNote: {
          _id: "${noteId}",
          title: "${titleString}"
        }) {
          title
        }
      }
    `;

    this.dbOperation(query, this.getNotes);
  }

  deleteNote = (noteId) => {
    let query = `
      mutation {
        deleteNote(noteId: "${noteId}")
      }
    `;

    this.dbOperation(query, this.getNotes);
  }

  addTodo = (noteId, description) => { //TODO: handle note not found
    let query = `
      mutation {
        createTodo(newTodo:{description: "${description}", todoNote: "${noteId}"}) {
          _id
        }
      }
    `;

    this.dbOperation(query, this.getNotes);
  }

  updateTodo = (todoId, description) => {
    let query = `
      mutation {
        updateTodoDescription(updatedTodo: {_id: "${todoId}", description: "${description}"}) {
          _id
        }
      }
    `;

    this.dbOperation(query, this.getNotes);
  }

  toggleCheck = (todoId, isChecked) => {
    let query = `
      mutation {
        toggleTodoCheck(updatedTodo: {_id: "${todoId}", isChecked: ${isChecked}}) {
          _id
        }
      }
    `;

    this.dbOperation(query, this.getNotes);
  }

  deleteTodo = (todoId) => {
    let query = `
      mutation {
        deleteTodo(todoId: "${todoId}")
      }
    `;

    this.dbOperation(query, this.getNotes);
  }

  componentDidMount() {
    this.getNotes();
  }

  dbOperation = (query, handleData) => {
    let requestBody = {
      query
    };

    fetch('http://localhost:80/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('DB operation failed.\n' + query);
        }
        return res.json();
      })
      .then(resData => {
        handleData(resData.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <NavBar />
          <Notes
            notes={this.state.notes}
            updateTitle={this.updateTitle}
            toggleCheck={this.toggleCheck}
            addTodo={this.addTodo}
            updateTodo={this.updateTodo}
            deleteTodo={this.deleteTodo}
            deleteNote={this.deleteNote}
          />
          <Button icon
            labelPosition='left'
            onClick={this.addNote}>
            <Icon name='plus' />
            New Note
            </Button>
        </div>
      </div>
    );
  }
}

export default App;

