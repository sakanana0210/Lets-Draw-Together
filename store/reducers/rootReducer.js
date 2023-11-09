import { canvasReducer, toolReducer, brushReducer } from './reducers'; 
import { authReducer } from './authReducer'; 
import { layerReducer } from './layerReducer'; 
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    canvas: canvasReducer,
    tool: toolReducer,
    brush: brushReducer,
    auth: authReducer,
    layer: layerReducer
})

export default rootReducer;