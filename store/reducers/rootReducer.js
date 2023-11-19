import { canvasReducer, toolReducer, brushReducer } from './reducers'; 
import { authReducer } from './authReducer'; 
import { layerReducer } from './layerReducer'; 
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
    key: 'auth',
    storage,
}

const rootReducer = combineReducers({
    canvas: canvasReducer,
    tool: toolReducer,
    brush: brushReducer,
    auth: persistReducer(authPersistConfig, authReducer),
    layer: layerReducer
});

export default rootReducer;