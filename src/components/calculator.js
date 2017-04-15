import React, { Component } from 'react';
import { connect } from 'react-redux';
import CalculatorButtons from './calculator_buttons';

class Calculator extends Component {


	render(){
		const inputArray = this.props.inputArray;
		const cursorLocation = this.props.cursorLocation;
		const inputBeforeCursor = inputArray.slice(0, cursorLocation);
		const inputAfterCursor = inputArray.slice(cursorLocation);

		const inputBeforeCursorStr = inputBeforeCursor.join('');
		const inputAfterCursorStr = inputAfterCursor.join('');

		const degreeFormat = this.props.degreeFormat;
		const result = this.props.result;		
		return(



			<div id="calculator-container">
				<div id="calculator">
					<div id="calculator-current-settings">
						<span id="degree-format">{degreeFormat}</span>
						<span id="evaluated-answer">Ans = {result}</span>
					</div>
					<div id="calculator-display" >{inputBeforeCursorStr}<span className="blinking-cursor">|</span>{inputAfterCursorStr}</div>
					<CalculatorButtons />
				</div>
			</div>
			);

	}





}


function mapStateToProps(state){
	const {inputArray, result, cursorLocation, degreeFormat } = state.calculator;
	return {inputArray, result, cursorLocation, degreeFormat };
}

export default connect(mapStateToProps)(Calculator);