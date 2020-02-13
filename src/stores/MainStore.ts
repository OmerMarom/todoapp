import { observable, action, decorate } from 'mobx';
import NoteQueries from '../queries/noteQueries';
import TodoQueries from '../queries/todoQueries';
import Note from '../models/Note';
import Todo from '../models/todo';

const serverUrl = 'http://localhost:80/graphql';

export class MainStore {
  notes: Array<Note> = [];

  getNotes = () => {
    let renderNotes = (data: any) => {
      if (data.notes) {
        this.notes = data.notes.slice().sort(
          (note1: Note, note2: Note) => {
            return new Date(note1.createdAt) > new Date(note2.createdAt) ? -1 : 1;
          })
      }
      else {
        console.log('Get notes: No data retreived from backend.');
        return;
      }
    };

    this.dbOperation(NoteQueries.notesQuery, renderNotes);
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

    this.dbOperation(NoteQueries.addNoteQuery, renderAddNote);
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

    this.dbOperation(NoteQueries.updateTitleQuery(noteId, titleString),
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

    this.dbOperation(NoteQueries.deleteNoteQuery(noteId), renderDeleteNote);
  }

  addTodo = (noteId: String, description: String) => {
    let renderAddTodo = (data: any) => {
      if (!data.createTodo) {
        console.log('Add todo: No data retreived from DB.');
        return;
      }
      const { _id, description, isChecked, todoNote, createdAt } = data.createTodo;
      this.notes = this.notes.map((note) => {
        if (note._id === todoNote._id) {
          note.todos.unshift({
            _id,
            description,
            isChecked,
            todoNote: todoNote._id,
            createdAt
          });
        }
        return note;
      })
    }

    this.dbOperation(TodoQueries.addTodoQuery(noteId, description),
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
      const todo = note.todos.find((todo: Todo) =>
        _id === todo._id
      );
      if (!todo) {
        console.log('Update todo: Todo not found.');
        return;
      }
      todo.description = description;
    }

    this.dbOperation(TodoQueries.updateTodoQuery(todoId, description), renderUpdateTodo);
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
      const todo = note.todos.find((todo: Todo) =>
        _id === todo._id
      );
      if (!todo) {
        console.log('Toggle check: Todo not found.');
        return;
      }
      todo.isChecked = isChecked;
    }

    this.dbOperation(TodoQueries.toggleCheckQuery(todoId, isChecked), renderToggleCheck);
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
      note.todos = note.todos.filter((todo: Todo) => {
        todoDeleted = todoDeleted || (todo._id !== data.deleteTodo._id);
        return todo._id !== data.deleteTodo._id;
      });
      if (!todoDeleted) {
        console.log('Delete todo: Todo not found.');
      }
    }

    this.dbOperation(TodoQueries.deleteTodoQuery(todoId), renderDeleteTodo);
  }

  dbOperation = (query: String, handleData: Function) => {
    fetch(serverUrl, {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('DB operation failed. \nQuery: \n' + query);
        }
        return res.json();
      })
      .then((resData) => {
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