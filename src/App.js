import React, { Component } from 'react';
import NavBar from './components/layout/NavBar';
import Notes from './components/Notes';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Button } from 'semantic-ui-react'

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
    const completeNewNote = {
      id: this.state.notes.length + 1,
      title: 'New note',
      todos: []
    };
    this.setState({
      //notes: this.state.notes.push(newNote) // Why does this line make notes type number?
      notes: [this.state.notes, completeNewNote]
    });
  }

  deleteNote = (id) => {
    console.log(this.state.notes.filter(note => note.id !== id));
    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    })
  }

  // prettify
  toggleCheck = (id, todoId) => {
    this.setState({
      notes: this.state.notes.map(note => {
        if (note.id === id) {
          note.todos = note.todos.map(todo => {
            if (todo.todoId === todoId) {
              todo.isChecked = !todo.isChecked
            }
            return todo;
          })
        }
        return note;
      })
    });
  }

  addTodo = (noteId, description) => { //TODO: handle npte not found
    let note = this.state.notes.find((note) => noteId === note.id);
    let todo = {
      todoId: (noteId * 100) + note.todos.length + 1,
      description,
      isChecked: false
    }
    // note.todos = [todo, ...note.todos];
    // note.todos = [todo].concat(note.todos);
    note.todos.unshift(todo);
    // note.todos.push(todo);
    console.log(note.todos);
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
          <Button onClick={this.addNote}>+</Button>
          <Notes
            notes={this.state.notes}
            toggleCheck={this.toggleCheck}
            addTodo={this.addTodo}
            updateTodo={this.updateTodo}
            deleteTodo={this.deleteTodo}
            deleteNote={this.deleteNote}
          />
        </div>
      </div>
    );
  }
}

export default App;

