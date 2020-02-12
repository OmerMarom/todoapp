import React, { Component } from 'react';
import { Container, Menu, Icon } from 'semantic-ui-react'
import './NavBar.css'

class NavBar extends Component {
    render() {
        return (
            <Menu inverted fixed="top" className="NavBar">
                <Container className="navBarContainer">
                    <Menu.Item header>
                        <Icon className="logo" name="sticky note outline"/>
                        TODO
                    </Menu.Item>
                </Container>
            </Menu>
        );
    }
}

export default NavBar;