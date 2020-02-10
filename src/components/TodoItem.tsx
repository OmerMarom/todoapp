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
export class TodoItem extends Component<Props> {
    state = {
        todoItemString: this.props.todo.description,
        todoCheckbox: this.props.todo.isChecked
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            todoItemString: nextProps.todo.description,
            todoCheckbox: nextProps.todo.isChecked
        });
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (prevState.todoCheckbox !== nextProps.todoCheckbox ||
    //         prevState.todoItemString !== nextProps.todoItemString) {
    //         return {
    //             todoItemString: nextProps.todo.description,
    //             todoCheckbox: nextProps.todo.isChecked
    //         };
    //     }

    //     return null;
    // }


    toggleCheckWrap = (e) => {
        this.setState({
            todoCheckbox: !this.props.todo.isChecked
        })
        this.props.store.toggleCheck(this.props.todo._id, !this.props.todo.isChecked);
    }

    onChange = (e) => {
        this.setState({
            todoItemString: e.target.value
        })
    }

    onKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.updateTodoWrap(e);
            e.target.blur();
        }
    }

    updateTodoWrap = (e) => {
        if (this.props.todo.description === this.state.todoItemString) {
            return;
        }
        if (this.state.todoItemString.trim()) {
            this.props.store.updateTodo(this.props.todo._id, e.target.value)
        }
        else {
            this.props.store.deleteTodo(this.props.todo._id, this.props.noteId)
        }
    }

    render() {
        const { _id } = this.props.todo
        return (
            <div>
                <Checkbox
                    checked={this.state.todoCheckbox}
                    onChange={this.toggleCheckWrap}
                />
                <Input
                    value={this.state.todoItemString}
                    onBlur={this.updateTodoWrap}
                    onKeyDown={this.onKeyDown}
                    onChange={this.onChange}
                />
                <Button
                    icon='cancel'
                    onClick={this.props.store.deleteTodo.bind(this, _id)}>
                </Button>
            </div>
        );
    }
}

export default TodoItem;
