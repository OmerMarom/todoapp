import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Input } from 'semantic-ui-react'
import TodoList from './TodoList';

export class NoteItem extends Component {
    state = { //todo remove from state
        newItemString: ''
    }

    onChange = (e) => {
        this.setState({
            newItemString: e.target.value
        })
    }

    onKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.addTodoWrap(e);
        }
    }

    addTodoWrap = (e) => {
        if (this.state.newItemString) {
            this.props.addTodo.call(this, this.props.note.id, this.state.newItemString)
            this.setState({
                newItemString: ''
            })
        }
    }

    render() {
        const { id, title, todos } = this.props.note;
        return <div>
            <Card>
                <Card.Content>
                    <Card.Header>{title}</Card.Header>
                    <Card.Meta>12/3/2020</Card.Meta> {/* insert date here */}
                    <Card.Description>
                        <Input
                            icon='plus'
                            iconPosition='left'
                            labelPosition='right'
                            placeholder='New item'
                            value={this.state.newItemString}
                            onBlur={this.addTodoWrap}
                            onKeyDown={this.onKeyDown}
                            onChange={this.onChange}
                        />
                        <TodoList
                            todos={todos}
                            noteId={id}
                            toggleCheck={this.props.toggleCheck}
                            updateTodo={this.props.updateTodo}
                            deleteTodo={this.props.deleteTodo}
                        />
                        {/* TODO: deleteNoteComponent */}
                    </Card.Description>
                </Card.Content>
            </Card>
        </div>;
    }
}

NoteItem.propTypes = {
    note: PropTypes.object.isRequired,
    toggleCheck: PropTypes.func.isRequired,
    addTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired
}

export default NoteItem