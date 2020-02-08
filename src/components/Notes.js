import React, { Component } from 'react';
import NoteItem from './NoteItem.js'
import PropTypes from 'prop-types'

class Notes extends Component {
    render() {
        return this.props.notes.map((note) => (
            <NoteItem
                note={note}
                updateTitle={this.props.updateTitle}
                toggleCheck={this.props.toggleCheck}
                addTodo={this.props.addTodo}
                updateTodo={this.props.updateTodo}
                deleteTodo={this.props.deleteTodo}
                deleteNote={this.props.deleteNote}
            />
        ));
    }
}

Notes.propTypes = {
    notes: PropTypes.array.isRequired,
    updateTitle: PropTypes.func.isRequired,
    toggleCheck: PropTypes.func.isRequired,
    addTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired
}

export default Notes;