import React from 'react';
import {
    Container,
    Image,
    Menu,
} from 'semantic-ui-react'

function NavBar() {
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

export default NavBar;