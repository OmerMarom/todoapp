import React, { Component } from 'react';
import TodoItem from './todo_item/TodoItem'
import Todo from '../../../../models/todo';

interface Props {
    todos: Todo[];
    noteId: string;
}  

class TodoList extends Component<Props> {
    render() {
        let sortedTodo = this.props.todos.slice().sort((todo1: Todo, todo2: Todo) => {
            return new Date(todo1.createdAt) > new Date(todo2.createdAt) ? -1 : 1;
        });
        return sortedTodo.map((todo: Todo) => (
            <TodoItem
                todo={todo}
                noteId={this.props.noteId}
            />
        ));
    }
}

export default TodoList;