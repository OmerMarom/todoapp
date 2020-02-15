import React, { Component } from 'react'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import { Button, Checkbox } from 'semantic-ui-react'
import { inject, observer } from 'mobx-react';
import './TodoItem.css';
import { MainStore } from '../../../../../stores/MainStore';
import Todo from '../../../../../models/todo';

interface Props {
    store?: MainStore;
    todo: Todo;
    noteId: string;
}

const enterKey: string = 'Enter';

@inject('store')
@observer
class TodoItem extends Component<Props> {
    state = {
        todoDescription: this.props.todo.description,
        todoCheckbox: this.props.todo.isChecked
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({
            todoDescription: nextProps.todo.description,
            todoCheckbox: nextProps.todo.isChecked
        });
    }

    onChange = (e: ContentEditableEvent) => {
        this.setState({
            todoDescription: e.target.value
        })
    }

    onEnterDown = (e: any) => {
        if (e.key === enterKey) {
            e.preventDefault();
            this.onUpdateDescription();
            e.target.blur();
        }
    }

    onUpdateDescription = () => {
        if (this.props.todo.description === this.state.todoDescription) {
            return;
        }
        if (this.state.todoDescription.trim()) {
            this.updateTodo(this.state.todoCheckbox);
        }
        else {
            this.props.store.deleteTodo(this.props.noteId, this.props.todo._id);
        }
    }

    onToggleCheck = () => {
        let newTodoCheckBox = !this.state.todoCheckbox;
        this.setState({
            todoCheckbox: newTodoCheckBox
        });
        this.updateTodo(newTodoCheckBox);
    }

    updateTodo = (isChecked: boolean) => {
        let updateTodo: Todo = {
            ...this.props.todo,
            description: this.state.todoDescription,
            isChecked
        }
        this.props.store.updateTodo(this.props.noteId, updateTodo);
    }

    render() {
        return (
            <div className="todoContainer">
                <Checkbox
                    className="todoCheckbox"
                    checked={this.state.todoCheckbox}
                    onChange={this.onToggleCheck}
                    disabled={this.props.todo.notSaved}
                />
                <ContentEditable
                    className="customInput todoDescription"
                    html={this.state.todoDescription}
                    onBlur={this.onUpdateDescription}
                    onKeyDown={this.onEnterDown}
                    onChange={this.onChange}
                    disabled={this.props.todo.notSaved}
                />
                <Button
                    className="deleteTodoButton"
                    circular icon='cancel'
                    onClick={this.props.store.deleteTodo.bind(this, this.props.noteId, this.props.todo._id)}
                    disabled={this.props.todo.notSaved}
                />
            </div>
        );
    }
}

export default TodoItem;
