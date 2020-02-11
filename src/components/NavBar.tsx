import React, { Component } from 'react';
import { Container, Menu } from 'semantic-ui-react'

class NavBar extends Component {
    render() {
        return (
            <Menu fixed='top' inverted>
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