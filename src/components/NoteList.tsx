import React, { Component } from 'react';
import NoteItem from './NoteItem'
import { inject, observer } from 'mobx-react';

interface Props {
  store?: any;
}

@inject('store')
@observer
class Notes extends Component<Props> {
    render() {
        return this.props.store.notes.map((note) => (
            <NoteItem note={note}/>
        ));
    }
}

export default Notes;