import React, { Component } from 'react'
import { Button, Input, Checkbox } from 'semantic-ui-react'
import { inject, observer } from 'mobx-react';

interface Props {
    store?: any;
    todo: any;
    noteId: any;
}

@inject('store')
@observer
class TodoItem extends Component<Props> {
    state = {
        todoItemString: this.props.todo.description,
        todoCheckbox: this.props.todo.isChecked
    }

    componentWillReceiveProps(nextProps: Props) { // TODO: Replace this
        this.setState({
            todoItemString: nextProps.todo.description,
            todoCheckbox: nextProps.todo.isChecked
        });
    }

    onChange = (e: any) => {
        this.setState({
            todoItemString: e.target.value
        })
    }

    onEnterDown = (e: any) => {
        if (e.key === 'Enter') {
            this.onUpdateDescription(e);
            e.target.blur();
        }
    }

    onUpdateDescription = (e: any) => {
        if (this.props.todo.description === this.state.todoItemString) {
            return;
        }
        if (this.state.todoItemString.trim()) {
            this.props.store.updateTodo(this.props.todo._id, this.state.todoItemString);
        }
        else {
            this.props.store.deleteTodo(this.props.todo._id, this.props.noteId);
        }
    }

    onToggleCheck = (e: any) => {
        this.setState({
            todoCheckbox: !this.props.todo.isChecked
        })
        this.props.store.toggleCheck(this.props.todo._id, this.state.todoCheckbox);
    }

    render() {
        return (
            <div>
                <Checkbox
                    checked={this.state.todoCheckbox}
                    onChange={this.onToggleCheck}
                />
                <Input
                    value={this.state.todoItemString}
                    onBlur={this.onUpdateDescription}
                    onKeyDown={this.onEnterDown}
                    onChange={this.onChange}
                />
                <Button
                    icon='cancel'
                    onClick={this.props.store.deleteTodo.bind(this, this.props.todo._id)}>
                </Button>
            </div>
        );
    }
}

export default TodoItem;
