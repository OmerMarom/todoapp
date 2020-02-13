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
    noteId: String;
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
            this.onUpdateDescription(e);
            e.target.blur();
        }
    }

    onUpdateDescription = (e: React.FocusEvent<HTMLDivElement>) => {
        if (this.props.todo.description === this.state.todoDescription) {
            return;
        }
        if (this.state.todoDescription.trim()) {
            this.props.store.updateTodo(this.props.todo._id, this.state.todoDescription);
        }
        else {
            this.props.store.deleteTodo(this.props.todo._id);
        }
    }

    onToggleCheck = (e: React.FormEvent<HTMLInputElement>) => {
        let newTodoCheckBox = !this.state.todoCheckbox;
        this.setState({
            todoCheckbox: newTodoCheckBox
        });
        this.props.store.toggleCheck(this.props.todo._id, newTodoCheckBox);
    }

    render() {
        return (
            <div className="todoContainer">
                <Checkbox
                    className="todoCheckbox"
                    checked={this.state.todoCheckbox}
                    onChange={this.onToggleCheck}
                />
                <ContentEditable
                    className="customInput todoDescription"
                    html={this.state.todoDescription}
                    onBlur={this.onUpdateDescription}
                    onKeyDown={this.onEnterDown}
                    onChange={this.onChange}
                />
                <Button
                    className="deleteTodoButton"
                    circular icon='cancel'
                    onClick={this.props.store.deleteTodo.bind(this, this.props.todo._id)}>
                </Button>
            </div>
        );
    }
}

export default TodoItem;
