import React, { Component } from 'react';
import NoteItem from './NoteItem.js'
import {inject, observer} from "mobx-react";

class Notes extends Component {
    render() {
        const store = this.props.MainStore;
        return store.notes.map((note) => (
            <NoteItem note={note}/>
        ));
    }
}

export default inject('MainStore')(observer(Notes));