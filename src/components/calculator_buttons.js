import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addInput, removeInput, evaluateInputs, clearInputs, moveCursor, changeDegreeFormat} from '../actions/index';
import {DEG,RAD,PERCENT,PI,PHI,NATURAL_LOG_NUMBER,FACTORIAL,SIN,COS,TAN,LN,LOG,NEG,ADD,SUBTRACT,MULTIPLY,DIVIDE,SQRT,POWER,MOD,EXP,DECIMAL,ZERO,ONE,TWO,THREE,FOUR,FIVE,SIX,SEVEN,EIGHT,NINE,LEFT_PARENTHESIS,RIGHT_PARENTHESIS,DEGREES,RADIANS} from '../tools/calculator_utils';

const CLEAR = 'CLEAR';
const EVALUATE = '=';
const ANS = 'ANS';
const LEFT_ARROW = '←';
const RIGHT_ARROW = '→';
const BACKSPACE = 'CE';


class CalculatorButtons extends Component {

	constructor(props){
		super(props);
		this.onInputClick = this.onInputClick.bind(this);
	}

	generateButtons(array, styles){
		return array.map((input)=>{
			return (<div className={"calculator-input-btn " + styles} onClick={()=>{this.onInputClick(input)}}>
				{input}</div>);
			});
	}

	generateLightButtons(array){
		return this.generateButtons(array, 'lighten-btn');
	}
	generateDarkButtons(array){
		return this.generateButtons(array, 'darken-btn');
	}

	generatePlaceHolderButtons(num){
		const placeHolderArrays = [];
		for(let i=0; i < num; i++){
			placeHolderArrays.push(	<div className="calculator-input-btn darken-btn placeholder-btn"> </div>);
		}
		return placeHolderArrays;
	}

	render(){
		return(
			<div>
			<div className="calculator-input-row">
				{this.generateButtons([CLEAR], "red-btn")}
				{this.generatePlaceHolderButtons(2)}
				{this.generateDarkButtons([LEFT_ARROW, RIGHT_ARROW, BACKSPACE])}
				{this.generateDarkButtons([POWER], "common-operation")}
			</div>
			<div className="calculator-input-row">
				{this.generateDarkButtons([RAD, DEG, FACTORIAL, LEFT_PARENTHESIS, RIGHT_PARENTHESIS, PERCENT])}
				{this.generateDarkButtons([DIVIDE], "common-operation")}
			</div>
			<div className="calculator-input-row">
				{this.generateDarkButtons([PI,SIN,LN])}
				{this.generateLightButtons([SEVEN,EIGHT,NINE])}
				{this.generateDarkButtons([MULTIPLY], "common-operation")}
			</div>
				<div className="calculator-input-row">
				{this.generateDarkButtons([NATURAL_LOG_NUMBER, COS, LOG])}
				{this.generateLightButtons([FOUR,FIVE,SIX])}
				{this.generateDarkButtons([SUBTRACT], "common-operation")}
			</div>
				<div className="calculator-input-row">
				{this.generateDarkButtons([PHI, TAN, SQRT])}
				{this.generateLightButtons([ONE, TWO, THREE])}
				{this.generateDarkButtons([ADD], "common-operation")}
			</div>
				<div className="calculator-input-row">
				{this.generateDarkButtons([ANS, EXP, MOD])}
				{this.generateLightButtons([ZERO, DECIMAL, NEG])}
				{this.generateButtons([EVALUATE], "blue-btn common-operation")}
			</div>
			</div>
);
	}

	onInputClick(input){

		if(input === EVALUATE){
			this.props.evaluateInputs();
		} else if (input === CLEAR){
			this.props.clearInputs();
		} else if(input === BACKSPACE){
			this.props.removeInput();
		} else if(input === LEFT_ARROW){
			this.props.moveCursor(-1);
		} else if(input === RIGHT_ARROW){
			this.props.moveCursor(+1);
		} else if(input === RAD){
			this.props.changeDegreeFormat(RADIANS);
		}else if(input === DEG){
			this.props.changeDegreeFormat(DEGREES);
		}
		else {
			this.props.addInput(input);
		}
	}
}


export default connect(null, {addInput, evaluateInputs, clearInputs, removeInput, moveCursor, changeDegreeFormat})(CalculatorButtons);