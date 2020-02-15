class Queriesstrings {
    addTodoQuery = (noteId: string, description: string): string => `
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

updateTodoQuery = (todoId: string, description: string, isChecked: Boolean): string => `
    mutation {
        updateTodo(updatedTodo: {_id: "${todoId}", description: "${description}", isChecked: ${isChecked}}) {
            _id
            description
            todoNote {
                _id
            }
        }
    }
`;

deleteTodoQuery = (todoId: string): string => `
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

const Queries: Queriesstrings = new Queriesstrings();
export default Queries;