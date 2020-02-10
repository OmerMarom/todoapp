import { observable, action, decorate } from 'mobx'

class MainStore {
  notes = [];

  getNotes = () => {// TODO:remove  all querys to seperate file
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

  renderNotes = (data) => {
    this.notes = data.notes.slice().sort(
      (note1, note2) => {
        return new Date(note1.createdAt) > new Date(note2.createdAt) ? -1 : 1;
      })
  };

  renderAddNote = (data) => {
    this.notes.unshift({
      _id: data.createNote._id,
      title: data.createNote.title,
      todos: data.createNote.todos,
      createdAt: data.createNote.createdAt
    });
  }

  addNote = () => {
    let query = `
      mutation {
        createNote(newNote:{title: "New Note"}) {
          _id
          title
          todos {
            _id
            description
            isChecked
            createdAt
          }
          createdAt
        }
      }
        `;

    this.dbOperation(query, this.renderAddNote);// TODO: do not get new list from db just call render in all 
  }

  renderUpdateTitle = (data) => {
    let note = this.notes.find((note) => 
      data.updateNoteTitle._id === note._id
    );
    note.title = data.updateNoteTitle.title;
  }

  updateTitle = (noteId, titleString) => {//TODO if note is null?
    let note = this.notes.find((note) => 
      noteId === note._id
    );
    if (note.title === titleString) {
      return;
    }

    let query = `
          mutation {
            updateNoteTitle(updatedNote: {
              _id: "${noteId}",
              title: "${titleString}"
            }) {
              _id
              title
            }
          }
        `;

    this.dbOperation(query, this.renderUpdateTitle);
  }

  renderDeleteNote = (data) => {
    this.notes = this.notes.filter((note) => 
      note._id !== data.deleteNote._id
    );
  }

  deleteNote = (noteId) => {
    let query = `
          mutation {
            deleteNote(noteId: "${noteId}") {
              _id
            }
          }
        `;

    this.dbOperation(query, this.renderDeleteNote);
  }

  renderAddTodo = (data) => {
    const { _id, description, isChecked, todoNote } = data.createTodo;
    this.notes = this.notes.map((note) => {
      if (note._id === todoNote._id) {
        note.todos.unshift({
          _id,
          description,
          isChecked,
          todoNote: todoNote._id
        });
      }
      return note;
    })
  }

  addTodo = (noteId, description) => { //TODO: handle note not found
    let query = `
          mutation {
            createTodo(newTodo:{description: "${description}", todoNote: "${noteId}"}) {
              _id
              description
              isChecked
              todoNote {
                _id
              }
            }
          }
        `;

    this.dbOperation(query, this.renderAddTodo);
  }

  renderUpdateTodo = (data) => {
    const {_id, description, todoNote} = data.updateTodoDescription;
    const note = this.notes.find((note) => 
      todoNote._id === note._id
    );
    const todo = note.todos.find((todo) => 
      _id === todo._id
    );
    todo.description = description; 
  }

  updateTodo = (todoId, description) => {
    let query = `
          mutation {
            updateTodoDescription(updatedTodo: {_id: "${todoId}", description: "${description}"}) {
              _id
              description
              todoNote {
                _id
              }
            }
          }
        `;

    this.dbOperation(query, this.renderUpdateTodo);
  }

  renderToggleCheck = (data) => {
    const {_id, isChecked, todoNote} = data.toggleTodoCheck;
    const note = this.notes.find((note) => 
      todoNote._id === note._id
    );
    const todo = note.todos.find((todo) => 
      _id === todo._id
    );
    todo.isChecked = isChecked; 
  }

  toggleCheck = (todoId, isChecked) => {
    let query = `
      mutation {
        toggleTodoCheck(updatedTodo: {_id: "${todoId}", isChecked: ${isChecked}}) {
          _id
          isChecked
          todoNote {
            _id
          }
        }
      }
    `;

    this.dbOperation(query, this.renderToggleCheck);
  }

  renderDeleteTodo = (data) => {
    const note = this.notes.find((note) => 
      note._id === data.deleteTodo.todoNote._id
    );
    note.todos = note.todos.filter((todo) => 
      todo._id !== data.deleteTodo._id
    );
  }

  deleteTodo = (todoId) => {
    let query = `
          mutation {
            deleteTodo(todoId: "${todoId}") {
              _id
              todoNote {
                _id
              }
            }
          }
        `;

    this.dbOperation(query, this.renderDeleteTodo);
  }

  dbOperation = (query, handleData) => {
    let requestBody = { //TODO: remove
      query
    };

    fetch('http://localhost:80/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => { // TODO: consider async
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('DB operation failed.\n' + query);
        }
        return res.json();
      })
      .then(resData => {
        if (handleData) {
          handleData(resData.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}

decorate(MainStore, {
  notes: observable,
  getNotes: action,
  addNote: action,
  updateTitle: action,
  deleteNote: action,
  addTodo: action,
  updateTodo: action,
  toggleCheck: action,
  deleteTodo: action
})

const store = new MainStore();
export default store;