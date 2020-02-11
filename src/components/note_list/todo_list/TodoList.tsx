import React, { Component } from 'react';
import TodoItem from './TodoItem'

interface Props {
    todos: any;
    noteId: any;
}  

class TodoList extends Component<Props> {
    render() {
        let sortedTodo = this.props.todos.slice().sort((todo1: any, todo2: any) => {
            return new Date(todo1.createdAt) > new Date(todo2.createdAt) ? -1 : 1;
        });
        return sortedTodo.map((todo: any) => (
            <TodoItem
                todo={todo}
                noteId={this.props.noteId}
            />
        ));
    }
}

export default TodoList;