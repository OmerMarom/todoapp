class QueriesStrings {
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

const Queries: QueriesStrings = new QueriesStrings();
export default Queries;