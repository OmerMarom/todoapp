import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'

class TodoList extends Component {
    render() {
        return this.props.todos.map((todo) => (
            <TodoItem
                todo={todo}
                noteId={this.props.noteId}
                toggleCheck={this.props.toggleCheck}
                updateTodo={this.props.updateTodo}
                deleteTodo={this.props.deleteTodo}
            />
        ));
    }
}

TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    noteId: PropTypes.number.isRequired, // TODO: Not a number - change
    toggleCheck: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired
}

export default TodoList;