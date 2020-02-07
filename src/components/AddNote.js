import React, { Component } from 'react'

export class AddNote extends Component {
    onSubmit = (e) => {
        e.preventDefault(); // TODO: what is this? (1:10:00)
        this.props.addNote(e.target[0].value);
        this.refs.addNoteField.value = '';
    }

    render() {
        return (
            <form 
                onSubmit={this.onSubmit} 
                style={{ display: 'flex' }}>
                <input
                    ref="addNoteField"
                    type="text"
                    name="title"
                    style = {{ flex: '10', padding: '5px' }}
                    placeholder="Add Note"
                    // value={this.state.title}
                    // onChange={this.onChange}
                />
                <input 
                    type="submit" 
                    value="Submit"
                    className="btn" 
                    style={{ flex: '1' }}
                />
            </form>
        )
    }
}

export default AddNote