import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Input, Checkbox } from 'semantic-ui-react'
import { inject, observer } from "mobx-react";

export class TodoItem extends Component {
    state = {
        todoItemString: this.props.todo.description
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            todoItemString: nextProps.todo.description
        });
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
        const store = this.props.MainStore;
        if (this.props.todo.description === this.state.todoItemString) {
            return;
        }
        if (this.state.todoItemString.trim()) {
            store.updateTodo.call(this, this.props.todo._id, e.target.value)
        }
        else {
            store.deleteTodo.call(this, this.props.todo._id, this.props.noteId)
        }
    }

    render() {
        const store = this.props.MainStore;
        const { _id, isChecked } = this.props.todo
        return (
            <div>
                <Checkbox
                    defaultChecked={isChecked}
                    onChange={store.toggleCheck.bind(this, _id, !this.props.todo.isChecked)}
                />
                <Input
                    value={this.state.todoItemString}
                    onBlur={this.updateTodoWrap}
                    onKeyDown={this.onKeyDown}
                    onChange={this.onChange}
                />
                <Button
                    icon='cancel'
                    onClick={this.props.deleteTodo.bind(this, _id)}>
                </Button>
            </div>
        );
    }
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    noteId: PropTypes.number.isRequired, // TODO: Not a number - change
};

export default inject('MainStore')(observer(TodoItem));
