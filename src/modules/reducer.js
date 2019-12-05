import { combineReducers } from 'redux';
import { authReducer } from './auth/reducers/auth';

const rootReducer = combineReducers({
  auth: authReducer
});

export default rootReducer;
