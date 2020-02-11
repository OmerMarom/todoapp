import { observable, action, decorate } from 'mobx';
import Queries from '../strings/queries';

class MainStore {
  notes: Array<any> = [];

  getNotes = () => {
    let renderNotes = (data: any) => {
      if (data.notes) {
        this.notes = data.notes.slice().sort(
          (note1: any, note2: any) => {
            return new Date(note1.createdAt) > new Date(note2.createdAt) ? -1 : 1;
          })
      }
      else {
        console.log('Get notes: No data retreived from backend.');
        return;
      }
    };

    this.dbOperation(Queries.notesQuery, renderNotes);
  }

  addNote = () => {
    let renderAddNote = (data: any) => {
      if (data.createNote) {
        this.notes.unshift({
          _id: data.createNote._id,
          title: data.createNote.title,
          todos: data.createNote.todos,
          createdAt: data.createNote.createdAt
        });
      }
      else {
        console.log('Add note: No data retreived from backend.');
        return;
      }
    }

    this.dbOperation(Queries.addNoteQuery, renderAddNote);
  }

  updateTitle = (noteId: String, titleString: String) => {
    let note = this.notes.find((note) =>
      noteId === note._id
    );
    if (!note) {
      console.log('Update title: note not found.');
      return;
    }
    if (note.title === titleString) {
      return;
    }

    let renderUpdateTitle = (data: any) => {
      let note = this.notes.find((note) =>
        data.updateNoteTitle._id === note._id
      );
      if (!note) {
        console.log('Update title: note not found.');
      }
      note.title = data.updateNoteTitle.title;
    }

    this.dbOperation(Queries.updateTitleQuery(noteId, titleString),
      renderUpdateTitle);
  }

  deleteNote = (noteId: String) => {
    let renderDeleteNote = (data: any) => {
      if (data.deleteNote) {
        this.notes = this.notes.filter((note) =>
          note._id !== data.deleteNote._id
        );
      }
      else {
        console.log('Delete note: No data retreived from DB.');
        return;
      }
    }

    this.dbOperation(Queries.deleteNoteQuery(noteId), renderDeleteNote);
  }

  addTodo = (noteId: String, description: String) => {
    let renderAddTodo = (data: any) => {
      if (!data.createTodo) { 
        console.log('Add todo: No data retreived from DB.');
        return; 
      }
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

    this.dbOperation(Queries.addTodoQuery(noteId, description),
      renderAddTodo);
  }

  updateTodo = (todoId: String, description: String) => {
    let renderUpdateTodo = (data: any) => {
      if (!data.updateTodoDescription) { 
        console.log('Update todo: No data retreived from DB.');
        return; 
      }
      const { _id, description, todoNote } = data.updateTodoDescription;
      const note = this.notes.find((note) =>
        todoNote._id === note._id
      );
      if (!note) { 
        console.log('Update todo: Note not found.');
        return; 
      }
      const todo = note.todos.find((todo: any) =>
        _id === todo._id
      );
      if (!todo) {
        console.log('Update todo: Todo not found.');
        return; 
      }
      todo.description = description;
    }

    this.dbOperation(Queries.updateTodoQuery(todoId, description), renderUpdateTodo);
  }

  toggleCheck = (todoId: String, isChecked: Boolean) => {
    let renderToggleCheck = (data: any) => {
      if (!data.toggleTodoCheck) {
        console.log('Toggle check: No data retreived from DB.');
        return; 
      }
      const { _id, isChecked, todoNote } = data.toggleTodoCheck;
      const note = this.notes.find((note) =>
        todoNote._id === note._id
      );
      if (!note) {
        console.log('Toggle check: Note not found.');
        return; 
      }
      const todo = note.todos.find((todo: any) =>
        _id === todo._id
      );
      if (!todo) {
        console.log('Toggle check: Todo not found.');
        return; 
      }
      todo.isChecked = isChecked;
    }

    this.dbOperation(Queries.toggleCheckQuery(todoId, isChecked), renderToggleCheck);
  }

  deleteTodo = (todoId: String) => {
    let renderDeleteTodo = (data: any) => {
      if (!data.deleteTodo) {
        console.log('Delete todo: No data retreived from DB.');
        return; 
      }
      const note = this.notes.find((note) =>
        note._id === data.deleteTodo.todoNote._id
      );
      if (!note) {
        console.log('Delete todo: Note not found.');
        return; 
      }
      let todoDeleted: Boolean = false;
      note.todos = note.todos.filter((todo: any) => {
        todoDeleted = todoDeleted || (todo._id !== data.deleteTodo._id);
        return todo._id !== data.deleteTodo._id;
      });

      if (todoDeleted) {
        console.log('Delete todo: Todo not found.');
      }
    }

    this.dbOperation(Queries.deleteTodoQuery(todoId), renderDeleteTodo);
  }

  dbOperation = (query: String, handleData: any) => {
    fetch('http://localhost:80/graphql', {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => { // TODO: consider async
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('DB operation failed. \nQuery: \n' + query);
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