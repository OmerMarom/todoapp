import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'mobx-react';
import Store from './stores/MainStore'

const Root = (
    <Provider store={Store}>
            <App />
    </Provider>
);

ReactDOM.render(Root, document.getElementById('root'));