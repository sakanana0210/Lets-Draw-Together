import { canvasReducer, toolReducer, brushReducer } from './reducers'; 
import { authReducer } from './authReducer'; 
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    canvas: canvasReducer,
    tool: toolReducer,
    brush: brushReducer,
    auth: authReducer
})

export default rootReducer;