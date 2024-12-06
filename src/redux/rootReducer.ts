import { combineReducers } from 'redux';

import aboutReducer from './reducers/about/reducer'
import userReducer from './reducers/user/reducer'
import aiReducer from './reducers/aimodal/reducer'

const rootReducer = combineReducers({
    aboutReducer,
    userReducer,
    aiReducer,
});
  
export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;