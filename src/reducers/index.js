import { combineReducers } from 'redux';
import CalculatorReducer from './calculator_reducer';

const rootReducer = combineReducers({
  calculator: CalculatorReducer
});

export default rootReducer;
