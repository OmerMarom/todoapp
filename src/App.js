import React, { Component } from 'react';
import NavBar from './components/layout/NavBar';
import Notes from './components/Notes';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Button, Icon } from 'semantic-ui-react'

class App extends Component {
  state = {
    notes: [
      {
        id: 1,
        title: 'Note header 1',
        todos: [{
          todoId: 101,
          description: 'todo item 1',
          isChecked: false
        },
        {
          todoId: 102,
          description: 'todo item 2',
          isChecked: false
        }]
      },
      {
        id: 2,
        title: 'Do this',
        todos: [{
          todoId: 201,
          description: 'go here',
          isChecked: false
        },
        {
          todoId: 202,
          description: 'just do it',
          isChecked: false
        }]
      },
      {
        id: 3,
        title: 'Do that',
        todos: [{
          todoId: 301,
          description: 'go there',
          isChecked: false
        },
        {
          todoId: 302,
          description: 'just do that shit boi',
          isChecked: false
        }]
      }
    ]
  };

  addNote = () => {
    const newNote = {
      id: this.state.notes.length + 1,
      title: 'New note',
      todos: []
    };
    this.setState({
      notes: [newNote, ...this.state.notes]
    });
  }

  updateTitle = (noteId, titleString) => {
    let note = this.state.notes.find((note) => noteId === note.id);
    if (note.title !== titleString) {
      note.title = titleString; // TODO: database access
    }
    this.setState(this.state);
  }

  deleteNote = (id) => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    })
  }

  toggleCheck = (todoId, noteId) => {
    let note = this.state.notes.find((note) => noteId === note.id);
    let todo = note.todos.find((todo => todoId === todo.todoId));
    todo.isChecked = !todo.isChecked;
    this.setState(this.state);
  }

  addTodo = (noteId, description) => { //TODO: handle note not found
    let note = this.state.notes.find((note) => noteId === note.id);
    let todo = {
      todoId: (noteId * 100) + note.todos.length + 1,
      description,
      isChecked: false
    }
    note.todos.unshift(todo);
    this.setState(this.state);
  }

  updateTodo = (todoId, noteId, e) => {
    let note = this.state.notes.find((note) => noteId === note.id);
    let todo = note.todos.find((todo => todoId === todo.todoId));
    todo.description = e.target.value;
    this.setState(this.state);
  }

  deleteTodo = (todoId, noteId) => {
    let note = this.state.notes.find((note) => noteId === note.id);
    note.todos = note.todos.filter(todo => todo.todoId !== todoId);
    this.setState(this.state);
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

