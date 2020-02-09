import React, { Component } from 'react';
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'

class TodoList extends Component {
    render() {
        let sortedTodo = this.props.todos.sort((todo1, todo2)=> {
            return new Date(todo1.createdAt) > new Date(todo2.createdAt) ? -1 : 1;
        });
        return sortedTodo.map((todo) => (
            <TodoItem
                todo={todo}
                noteId={this.props.noteId}
            />
        ));
    }
}

TodoList.propTypes = { // what are proptypes?
    todos: PropTypes.array.isRequired,
    noteId: PropTypes.number.isRequired, // TODO: Not a number - change
}

export default TodoList;