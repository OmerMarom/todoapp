import { observable, action, decorate } from 'mobx'


class MainStore {
  notes = [];

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

  renderNotes = (data) => {
    this.notes = data.notes.slice().sort(
      (note1, note2) => {
        return new Date(note1.createdAt) > new Date(note2.createdAt) ? -1 : 1;
      })
  };

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
    console.log(noteId, titleString);
    let note = this.notes.find((note) => noteId === note._id);
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