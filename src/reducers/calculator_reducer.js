import { ADD_INPUT, EVALUATE_INPUTS, CLEAR_INPUTS, REMOVE_INPUT, MOVE_CURSOR, DEGREE_FORMAT_CHANGE } from '../actions/index';
import { CalculatorUtils } from '../tools/calculator_utils';
const INITIAL_STATE = { result: "", inputArray: [], cursorLocation: 0, degreeFormat: CalculatorUtils.getDegreeFormat()}

export default function( state= INITIAL_STATE, action){
	switch(action.type){

		case ADD_INPUT: {
			const input = action.payload;
			const inputArray = state.inputArray.slice();
			inputArray.splice( state.cursorLocation, 0, input);
			const cursorLocation = state.cursorLocation + 1;
			return {...state, inputArray,  cursorLocation};
		}
		case REMOVE_INPUT: {
				const inputArray = state.inputArray.slice();
				const cursorLocation = state.cursorLocation - 1;
					inputArray.splice(cursorLocation, 1);
				return {...state, inputArray, cursorLocation};
		}
		case EVALUATE_INPUTS:{
			const result = CalculatorUtils.evaluateInputs(state.inputArray);
			return {...state, result };
		}
		case CLEAR_INPUTS:{
			const inputArray = [];
			const cursorLocation = 0;
			return {...state, inputArray, cursorLocation};
		}
		case MOVE_CURSOR: {
			const moveDirection = action.payload;
			const newCursorLocation = state.cursorLocation + moveDirection;
			if(newCursorLocation >= 0 && newCursorLocation <= state.inputArray.length){
				return {...state, cursorLocation: newCursorLocation};
			}
			return state;
		}

		case DEGREE_FORMAT_CHANGE: {
			const degreeChange = action.payload;
			CalculatorUtils.setDegreeFormat(degreeChange);
			const degreeFormat = CalculatorUtils.getDegreeFormat();
			return {...state, degreeFormat};
		}
		default:
			return state;
	}
}