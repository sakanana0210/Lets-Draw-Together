import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../store/reducers/rootReducer'; 
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger'; 
import '../styles/globalStyles.css';
const middleware = [thunk, logger];
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

const store = createStore(rootReducer, (applyMiddleware(thunk)));
const persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Component {...pageProps} />
            </PersistGate>
        </Provider>
    );
}

export default MyApp;