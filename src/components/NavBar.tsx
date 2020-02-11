import React, { Component } from 'react';
import { Container, Menu } from 'semantic-ui-react'
import './NavBar.css'

class NavBar extends Component {
    render() {
        return (
            <Menu inverted fixed="top" className="NavBar">
                <Container>
                    <Menu.Item as='a' header>
                        NotesApp
                </Menu.Item>
                </Container>
            </Menu>
        );
    }
}

export default NavBar;