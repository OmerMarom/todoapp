import React, { Component } from 'react'
import { Card, Input, Button } from 'semantic-ui-react'
import TodoList from './TodoList';
import { inject, observer } from 'mobx-react';
import './NoteItem.css';

interface Props {
    store?: any;
    note: any;
}

@inject('store')
@observer
class NoteItem extends Component<Props> {
    state = {
        newItemString: '',
        titleString: this.props.note.title
    }

    componentWillReceiveProps(nextProps) { // TODO: replace this
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
        if (this.state.titleString.trim()) {
            this.props.store.updateTitle(this.props.note._id, this.state.titleString);
        }
        else {
            this.props.store.updateTitle(this.props.note._id, 'Title');
            this.setState({titleString: 'Title'}); // TODO: Remove hardcoded strings
        }
        e.target.blur();
    }

    addTodoWrap = (e) => {
        if (this.state.newItemString.trim()) {
            this.props.store.addTodo.call(this, this.props.note._id, this.state.newItemString);
            this.setState({
                newItemString: ''
            });
        }
    }
// TODO remove style from tags
    render() {
        const { _id, todos, createdAt } = this.props.note;
        return <div>
            <Card className="noteCard">
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
                            onClick={this.props.store.deleteNote.bind(this, _id)}>
                        </Button>
                    </Card.Description>
                </Card.Content>
            </Card>
        </div>;
    }
}

export default NoteItem;
