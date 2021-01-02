import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Provider keeps track of the store we want to access throughout the app (global store)
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

import App from './App';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
