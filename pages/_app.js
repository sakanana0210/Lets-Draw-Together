import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../store/reducers/rootReducer'; 
import thunk from 'redux-thunk';
import '../styles/globalStyles.css';

const store = createStore(rootReducer, applyMiddleware(thunk));

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;