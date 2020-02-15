import React, { Component } from 'react'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import { Card, Button, Icon } from 'semantic-ui-react'
import TodoList from './todo_list/TodoList';
import { inject, observer } from 'mobx-react';
import './NoteItem.css';
import {MainStore} from '../../../stores/MainStore'
import Note from '../../../models/Note';

interface Props {
    store?: MainStore;
    note: Note;
}

@inject('store')
@observer
class NoteItem extends Component<Props> {
    state = {
        newTodoString: '',
        titleString: this.props.note.title.trim()
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({
            titleString: nextProps.note.title.trim()
        });
    }

    onChange = (inputString: string, e: ContentEditableEvent) => {
        this.setState({
            [inputString]: e.target.value
        });
    }

    onEnterDown = (action: Function, e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            action(e);
        }
    }

    onUpdateTitle = (e: any) => {
        if (!this.state.titleString.trim()) {
            this.setState({ titleString: '' });
        }
        this.props.store.updateTitle(this.props.note._id, this.state.titleString);
        e.target.blur();
    }

    onAddTodo = (e: React.FocusEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (this.state.newTodoString.trim()) {
            this.props.store.addTodo(this.props.note._id, this.state.newTodoString);
            this.setState({
                newTodoString: ''
            });
        }
    }

    render() {
        const { _id, todos, createdAt } = this.props.note;
        return <div>
            <Card className="noteCard">
                <Card.Content>
                    <ContentEditable
                        className="customInput noteTitle"
                        html={this.state.titleString}
                        placeholder="Title"
                        onChange={this.onChange.bind(this, 'titleString')}
                        onBlur={this.onUpdateTitle}
                        onKeyDown={this.onEnterDown.bind(this, this.onUpdateTitle)}
                    />
                    <Card.Meta
                        className="noteDate">
                        {new Date(createdAt).toLocaleDateString()}
                    </Card.Meta>
                    <Card.Description>
                        <div>
                            <Icon name='plus' />
                            <ContentEditable
                                className="customInput addTodoInput"
                                html={this.state.newTodoString}
                                placeholder="New todo"
                                onBlur={this.onAddTodo}
                                onKeyDown={this.onEnterDown.bind(this, this.onAddTodo)}
                                onChange={this.onChange.bind(this, 'newTodoString')}
                            />
                        </div>
                        <div className="todoListContainer">
                            <TodoList
                                todos={todos}
                                noteId={_id}
                            />
                        </div>
                        <Button
                            className="deleteNoteButton"
                            icon='trash'
                            onClick={this.props.store.deleteNote.bind(this, _id)}
                            disabled={this.props.note.notSaved}    
                        />
                    </Card.Description>
                </Card.Content>
            </Card>
        </div>;
    }
}

export default NoteItem;

