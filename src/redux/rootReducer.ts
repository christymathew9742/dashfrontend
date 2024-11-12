import { combineReducers } from 'redux';

import aboutReducer from './reducers/about/reducer'

const rootReducer = combineReducers({
    aboutReducer
});
  
export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;