import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Input, Checkbox } from 'semantic-ui-react'

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
            this.updateTodo(e);
            e.target.blur();
        }
    }

    updateTodo = (e) => {
        if (this.state.todoItemString) {
            this.props.updateTodo.call(this, this.props.todo.todoId, this.props.noteId, e)
        }
        else {
            this.props.deleteTodo.call(this, this.props.todo.todoId, this.props.noteId)
        }
    }

    render() {
        const { todoId, isChecked } = this.props.todo
        return (
            <div>
                <Checkbox
                    value={isChecked}
                    onChange={this.props.toggleCheck.bind(this, todoId, this.props.noteId)}
                />
                <Input
                    value={this.state.todoItemString}
                    onBlur={this.updateTodo}
                    onKeyDown={this.onKeyDown}
                    onChange={this.onChange}
                />
                <Button 
                    icon='cancel'
                    onClick={this.props.deleteTodo.bind(this, todoId, this.props.noteId)}>
                </Button>
            </div>
        );
    }
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    noteId: PropTypes.number.isRequired, // TODO: Not a number - change
    toggleCheck: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired
};

export default TodoItem;