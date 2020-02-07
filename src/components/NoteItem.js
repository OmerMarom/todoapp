import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

export class NoteItem extends Component {
    getStyle = () => {
        return {
            background: '#f4f4f4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textDecoration: this.props.note.completed ?
                'line-through' : 'none'
        }
    }

    render() {
        const { id, title, completed } = this.props.note
        return (
            <div style={this.getStyle()}>
                <p>
                    <input
                        type="checkbox"
                        defaultChecked={completed}
                        onChange={this.props.toggleComplete.bind(this, id)}
                    />
                    {title}
                    <button onClick={this.props.deleteNote.bind(this, id)} style={btnStyle}>X</button>
                    <Button color='red'>Red</Button>

                </p>
            </div>
        )
    }
}

NoteItem.propTypes = {
    note: PropTypes.object.isRequired
}

const btnStyle = {
    background: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
}

export default NoteItem