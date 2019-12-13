import { combineReducers } from 'redux';
import { authReducer } from './reducers/auth';
import { vehicleReducer } from './reducers/vehicles';

const rootReducer = combineReducers({
  auth: authReducer,
  vehicles: vehicleReducer
});

export default rootReducer;
