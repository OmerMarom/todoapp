import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Input, Button } from 'semantic-ui-react'
import TodoList from './TodoList';
import {inject, observer} from "mobx-react";

class NoteItem extends Component {
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

    onEnterDown = (func, e) => {
        if (e.key === 'Enter') {
            func(e);
        }
    }

    updateTitleWrap = (e) => {
        const store = this.props.MainStore;
        if (this.state.titleString.trim()) {
            store.updateTitle.call(this, this.props.note._id, this.state.titleString);
        }
        else {
            store.updateTitle.call(this, this.props.note._id, 'Title'); // TODO: Remove hardcoded strings
        }
        e.target.blur();
    }

    addTodoWrap = (e) => {
        const store = this.props.MainStore;
        if (this.state.newItemString.trim()) {
            store.addTodo.call(this, this.props.note._id, this.state.newItemString);
            this.setState({
                newItemString: ''
            });
        }
    }

    render() {
        const store = this.props.MainStore;
        const { _id, todos, createdAt } = this.props.note;
        return <div>
            <Card>
                <Card.Content>
                    <Input
                        value={this.state.titleString}
                        onChange={this.onChange.bind(this, 'titleString')}
                        onBlur={this.updateTitleWrap}
                        onKeyDown={this.onEnterDown.bind(this, this.updateTitleWrap)}
                    />
                    <Card.Meta>{new Date(createdAt).toLocaleDateString()}</Card.Meta> {/* TODO: date is backwards */}
                    <Card.Description>
                        <Input
                            icon='plus'
                            iconPosition='left'
                            labelPosition='right'
                            placeholder='New item'
                            value={this.state.newItemString}
                            onBlur={this.addTodoWrap}
                            onKeyDown={this.onEnterDown.bind(this, this.addTodoWrap)}
                            onChange={this.onChange.bind(this, 'newItemString')}
                        />
                        <TodoList
                            todos={todos}
                            noteId={_id}
                        />
                        <Button
                            icon='trash'
                            onClick={store.deleteNote.bind(this, _id)}>
                        </Button>
                    </Card.Description>
                </Card.Content>
            </Card>
        </div>;
    }
}

NoteItem.propTypes = {
    note: PropTypes.object.isRequired,
}

export default inject('MainStore')(observer(NoteItem));
