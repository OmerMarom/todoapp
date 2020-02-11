import React, { Component } from 'react'
import { Card, Input, Button } from 'semantic-ui-react'
import TodoList from './todo_list/TodoList';
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

    componentWillReceiveProps(nextProps: Props) { // TODO: replace this
        // TODO: check if newItemString needs to be reset too. 
        // What happens when adding a new note while focus is on newNote field and text is entered
        this.setState({
            // newItemString: '',
            titleString: nextProps.note.title 
        });
    }

    onChange = (inputString: string, e: any) => {
        this.setState({
            [inputString]: e.target.value
        });
    }

    onEnterDown = (action: any, e: any) => {
        if (e.key === 'Enter') {
            action(e);
        }
    }

    onUpdateTitle = (e: any) => {
        if (!this.state.titleString.trim()) {
            this.setState({titleString: 'Title'}); // TODO: Remove hardcoded strings
        }
        this.props.store.updateTitle(this.props.note._id, this.state.titleString);
        e.target.blur();
    }

    onAddTodo = (e: any) => {
        if (this.state.newItemString.trim()) {
            this.props.store.addTodo.call(this, this.props.note._id, this.state.newItemString);
            this.setState({
                newItemString: ''
            });
        }
    }

    render() {
        const { _id, todos, createdAt } = this.props.note;
        return <div>
            <Card className="noteCard">
                <Card.Content>
                    <Input
                        value={this.state.titleString}
                        onChange={this.onChange.bind(this, 'titleString')}
                        onBlur={this.onUpdateTitle}
                        onKeyDown={this.onEnterDown.bind(this, this.onUpdateTitle)}
                    />
                    <Card.Meta>
                        {new Date(createdAt).toLocaleDateString()}
                    </Card.Meta>  
                    <Card.Description>
                        <Input
                            icon='plus'
                            iconPosition='left'
                            labelPosition='right'
                            placeholder='New item'
                            value={this.state.newItemString}
                            onBlur={this.onAddTodo}
                            onKeyDown={this.onEnterDown.bind(this, this.onAddTodo)}
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
