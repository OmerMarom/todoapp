import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Input, Button } from 'semantic-ui-react'
import TodoList from './TodoList';

export class NoteItem extends Component {
    state = { // TODO: remove from state
        newItemString: '',
        titleString: this.props.note.title
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            titleString: nextProps.note.title
        });
    }

    onChange = (string, e) => {
        this.setState({
            [string]: e.target.value
        });
    }

    onKeyDown = (func, e) => {
        if (e.key === 'Enter') {
            func(e);
        }
    }

    updateTitleWrap = (e) => {
        if (this.state.titleString) {
            this.props.updateTitle.call(this, this.props.note.id, this.state.titleString);
        }
        else {
            this.props.updateTitle.call(this, this.props.note.id, 'Title'); // TODO: Remove hardcoded strings
        }
        e.target.blur();
    }

    addTodoWrap = (e) => {
        if (this.state.newItemString) {
            this.props.addTodo.call(this, this.props.note.id, this.state.newItemString);
            this.setState({
                newItemString: ''
            });
        }
    }

    render() {
        const { id, todos } = this.props.note;
        return <div>
            <Card>
                <Card.Content>
                    <Input
                        value={this.state.titleString}
                        onChange={this.onChange.bind(this, 'titleString')}
                        onBlur={this.updateTitleWrap}
                        onKeyDown={this.onKeyDown.bind(this, this.updateTitleWrap)}
                    />
                    <Card.Meta>12/3/2020</Card.Meta> {/* insert date here */}
                    <Card.Description>
                        <Input
                            icon='plus'
                            iconPosition='left'
                            labelPosition='right'
                            placeholder='New item'
                            value={this.state.newItemString}
                            onBlur={this.addTodoWrap}
                            onKeyDown={this.onKeyDown.bind(this, this.addTodoWrap)}
                            onChange={this.onChange.bind(this, 'newItemString')}
                        />
                        <TodoList
                            todos={todos}
                            noteId={id}
                            toggleCheck={this.props.toggleCheck}
                            updateTodo={this.props.updateTodo}
                            deleteTodo={this.props.deleteTodo}
                        />
                        <Button
                            icon='trash'
                            onClick={this.props.deleteNote.bind(this, id)}>
                        </Button>
                    </Card.Description>
                </Card.Content>
            </Card>
        </div>;
    }
}

NoteItem.propTypes = {
    note: PropTypes.object.isRequired,
    updateTitle: PropTypes.func.isRequired,
    toggleCheck: PropTypes.func.isRequired,
    addTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired
}

export default NoteItem