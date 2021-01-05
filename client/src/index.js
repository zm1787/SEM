import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Provider keeps track of the store we want to access throughout the app (global store)
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './App';

//const enhancers = compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
