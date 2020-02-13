import React, { Component } from 'react';
import NoteItem from './note_item/NoteItem'
import { inject, observer } from 'mobx-react';
import { MainStore } from '../../stores/MainStore'
import Note from '../../models/Note'

interface Props {
    store?: MainStore;
}

@inject('store')
@observer
class Notes extends Component<Props> {
    render() {
        return this.props.store.notes.map((note: Note) => (
            <NoteItem note={note} />
        ));
    }
}

export default Notes;