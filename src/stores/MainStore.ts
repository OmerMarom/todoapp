import { observable, action, decorate } from 'mobx';
import NoteQueries from '../queries/noteQueries';
import TodoQueries from '../queries/todoQueries';
import Note from '../models/Note';
import Todo from '../models/todo';

const serverUrl = 'https://todoprojectbackend.herokuapp.com/graphql';

export class MainStore {

  notes: Note[] = [];

  renderNotes = (data: any) => {
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

  getNotes = () => {
    this.dbOperation(NoteQueries.notesQuery, this.renderNotes);
  }

  renderAddNote = () => {
    this.notes.unshift({
      _id: '',
      title: '',
      todos: [],
      createdAt: null
    });
  }

  addNote = () => {
    this.renderAddNote();

    let updateNoteData = (data: any) => {
      if (!data.createNote) {
        console.log('Add note: No data retreived from backend.');
        return;
      }
      const { _id, title, createdAt } = data.createNote;
      const note = this.notes.find((note: Note) =>
        !note._id && title === note.title
      );
      note._id = _id;
      note.createdAt = createdAt;
    }

    this.dbOperation(NoteQueries.addNoteQuery, updateNoteData);
  }

  renderUpdateTitle = (noteId: string, title: string) => {
    let note = this.notes.find((note: Note) =>
      noteId === note._id
    );
    if (!note) {
      console.log('Update title: note not found.');
    }
    note.title = title;
  }

  updateTitle = (noteId: string, titleString: string) => {
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

    this.renderUpdateTitle(noteId, titleString);
    this.dbOperation(NoteQueries.updateTitleQuery(noteId, titleString));
  }

  renderDeleteNote = (noteId: string) => {
    let deleted: Boolean = false;
    this.notes = this.notes.filter((note: Note) => {
      deleted = deleted || noteId !== note._id;
      return noteId !== note._id
    });
    if (!deleted) {
      console.log('Delete title: note not found.');
    }
  }

  deleteNote = (noteId: string) => {
    this.renderDeleteNote(noteId);
    this.dbOperation(NoteQueries.deleteNoteQuery(noteId));
  }

  renderAddTodo = (noteId: string, description: string) => {
    this.notes = this.notes.map((note: Note) => {
      if (noteId === note._id) {
        note.todos.unshift({
          _id: '',
          description,
          isChecked: false,
          todoNote: note,
          createdAt: null
        });
      }
      return note;
    })
  }

  addTodo = (noteId: string, description: string) => {
    this.renderAddTodo(noteId, description);
    let updateTodoData = (data: any) => {
      if (!data.createTodo) {
        console.log('Add todo: No data retreived from DB.');
        return;
      }
      const { _id, description, todoNote, createdAt } = data.createTodo;
      const note = this.notes.find((note: Note) =>
        note._id === todoNote._id
      )
      const todo = note.todos.find((todo: Todo) =>
        !note._id && description === todo.description
      );
      todo._id = _id;
      todo.createdAt = createdAt;
    }
    this.dbOperation(TodoQueries.addTodoQuery(noteId, description), updateTodoData);
  }

  renderUpdateTodo = (noteId: string, updatedTodo: Todo) => {
    const note = this.notes.find((note: Note) =>
      noteId === note._id
    );
    if (!note) {
      console.log('Update todo: Note not found.');
      return;
    }
    note.todos = note.todos.map((todo: Todo) => {
      return (todo._id === updatedTodo._id) ? updatedTodo : todo;
    });
  }

  updateTodo = (noteId: string, todo: Todo) => {
    this.renderUpdateTodo(noteId, todo);
    this.dbOperation(TodoQueries.updateTodoQuery(todo._id, todo.description, todo.isChecked));
  }

  renderDeleteTodo = (noteId: string, todoId: string) => {
    const note = this.notes.find((note) =>
      noteId === note._id
    );
    if (!note) {
      console.log('Delete todo: Note not found.');
      return;
    }
    let deleted: Boolean = false;
    note.todos = note.todos.filter((todo: Todo) => {
      deleted = deleted || (todoId !== todo._id);
      return todoId !== todo._id;
    });
    if (!deleted) {
      console.log('Delete todo: Todo not found.');
    }
  }

  deleteTodo = (noteId: string, todoId: string) => {
    this.renderDeleteTodo(noteId, todoId);
    this.dbOperation(TodoQueries.deleteTodoQuery(todoId), null);
  }

  dbOperation = (query: String, handleData?: Function) => {
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
        console.log('DB operation failed. \nQuery: \n' + query)
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
  deleteTodo: action
})

const store = new MainStore();
export default store;