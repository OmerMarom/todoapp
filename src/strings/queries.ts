export class Queries {
    notesQuery: String = `
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

    addNoteQuery: String = `
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

    updateTitleQuery = (noteId: String, titleString: String): String => `
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

    deleteNoteQuery = (noteId: String): String => `
        mutation {
            deleteNote(noteId: "${noteId}") {
                _id
            }
        }
    `;

    addTodoQuery = (noteId: String, description: String): String => `
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

    updateTodoQuery = (todoId: String, description: String): String => `
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

    toggleCheckQuery = (todoId: String, isChecked: Boolean): String => `
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

    deleteTodoQuery = (todoId: String): String => `
        mutation {
            deleteTodo(todoId: "${todoId}") {
                _id
                todoNote {
                    _id
                }
            }
        }
    `;
}