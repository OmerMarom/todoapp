import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'mobx-react';
import MainStore from './stores/MainStore'

const Root = (
    <Provider MainStore={MainStore}>
        <App />
    </Provider>
);

ReactDOM.render(Root, document.getElementById('root'));