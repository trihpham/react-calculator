



export const DEG = 'Deg';
export const RAD = 'Rad';


export const PERCENT = '%';


export const PI = 'π';
export const PHI = 'φ';
export const NATURAL_LOG_NUMBER = 'e';

export const FACTORIAL = '!';
export const SIN = 'sin';
export const COS = 'cos';
export const TAN = 'tan';

export const LN = 'ln';
export const LOG = 'log';
export const NEG = '(-)';

export const ADD = '+';
export const SUBTRACT = '−';
export const MULTIPLY = '×';
export const DIVIDE =  '÷';
export const SQRT = '√';
export const POWER = '^';
export const MOD = 'MOD';
export const EXP = 'E';

export const DECIMAL = '.';
export const ZERO = '0';
export const ONE = '1';
export const TWO = '2';
export const THREE = '3';
export const FOUR = '4';
export const FIVE = '5';
export const SIX = '6';
export const SEVEN = '7';
export const EIGHT = '8';
export const NINE = '9';

export const LEFT_PARENTHESIS = '(';
export const RIGHT_PARENTHESIS = ')';

export const DEGREES = 'DEGREES';
export const RADIANS = 'RADIANS';

const OPERAND_TYPE =  'OPERAND_TYPE';
const BINARY_OPERATOR_TYPE = 'BINARY_OPERATOR_TYPE';
const UNARY_OPERATOR_TYPE = 'UNARY_OPERATOR_TYPE';



// - + 
const LOW_PRECEDENCE = 1;
// * /
const MED_PRECEDENCE = 2;
// ^
const HIGH_PRECEDENCE = 3;

const UNARY_PREFIX_PRECEDENCE = 4;
	
const UNARY_POSTFIX_PRECEDENCE = 5;
//
const BRACKET_PRECEDENCE = 6;

class Operator{
	constructor(arity, precedence){
		this.arity = arity;
		this.precedence = precedence;
	}
}





const OPERATOR_ADD = new Operator(BINARY_OPERATOR_TYPE, LOW_PRECEDENCE);
const OPERATOR_SUBTRACT = new Operator(BINARY_OPERATOR_TYPE, LOW_PRECEDENCE);
const OPERATOR_MULTIPLY = new Operator(BINARY_OPERATOR_TYPE, MED_PRECEDENCE);
const OPERATOR_DIVIDE = new Operator(BINARY_OPERATOR_TYPE, MED_PRECEDENCE);
const OPERATOR_POWER = new Operator(BINARY_OPERATOR_TYPE, HIGH_PRECEDENCE );
const OPERATOR_MOD = new Operator(BINARY_OPERATOR_TYPE, MED_PRECEDENCE);
const OPERATOR_EXP = new Operator(BINARY_OPERATOR_TYPE, MED_PRECEDENCE);

const OPERATOR_COS = new Operator(UNARY_OPERATOR_TYPE, UNARY_PREFIX_PRECEDENCE);
const OPERATOR_SIN =  new Operator(UNARY_OPERATOR_TYPE, UNARY_PREFIX_PRECEDENCE);
const OPERATOR_TAN = new Operator(UNARY_OPERATOR_TYPE, UNARY_PREFIX_PRECEDENCE);
const OPERATOR_NEG =  new Operator(UNARY_OPERATOR_TYPE, UNARY_PREFIX_PRECEDENCE);
const OPERATOR_LOG =  new Operator(UNARY_OPERATOR_TYPE, UNARY_PREFIX_PRECEDENCE);
const OPERATOR_LN = new Operator(UNARY_OPERATOR_TYPE, UNARY_PREFIX_PRECEDENCE);
const OPERATOR_SQRT = new Operator(UNARY_OPERATOR_TYPE, UNARY_PREFIX_PRECEDENCE);

const OPERATOR_PERCENT = new Operator(UNARY_OPERATOR_TYPE, UNARY_POSTFIX_PRECEDENCE);
const OPERATOR_FACTORIAL = new Operator(UNARY_OPERATOR_TYPE, UNARY_POSTFIX_PRECEDENCE);






//Class keeps track of two changing value. The degreeFormat and the evaluatedAnswer (for using the already evaluated answer)
class Calculator{


	constructor(){
		this.degreeFormat = DEGREES;
		this.evaluatedAnswer = 0;
	}

	getDegreeFormat(){
		return this.degreeFormat;
	}


	setDegreeFormat(format){
		if (format === RADIANS){
			this.degreeFormat = RADIANS;
		} else if (format === DEGREES) {
			this.degreeFormat = DEGREES;
		}
	}


	convertInputToInputObj(input){
		if(!isNaN(input)){
			return Number(input);
		}
		switch(input){
			case ADD:
				return OPERATOR_ADD;
			case SUBTRACT:
				return OPERATOR_SUBTRACT;
			case DIVIDE:
				return OPERATOR_DIVIDE;
			case MULTIPLY:
				return OPERATOR_MULTIPLY;
			case MOD:
				return OPERATOR_MOD;
			case EXP:
				return OPERATOR_EXP;
			case POWER:
				return OPERATOR_POWER;
			case COS:
				return OPERATOR_COS;
			case SIN:
				return OPERATOR_SIN;
			case TAN:
				return OPERATOR_TAN;
			case NEG:
				return OPERATOR_NEG;
			case LOG:
				return OPERATOR_LOG;
			case LN:
				return OPERATOR_LN;
			case SQRT:
				return OPERATOR_SQRT;
			case PERCENT:
				return OPERATOR_PERCENT;
			case FACTORIAL:
				return OPERATOR_FACTORIAL;
			case LEFT_PARENTHESIS:
				return LEFT_PARENTHESIS;
			case RIGHT_PARENTHESIS:
				return RIGHT_PARENTHESIS;
			default:
				return 'error'; 
		}

	}

	convertInputsToInputObjs(arrayOfInputs){
		var self = this;
		return arrayOfInputs.map((input)=>{
			return self.convertInputToInputObj(input);
		});
	}








	convertInfixQueueToPostfixStack(infixQueue){
		
		var temporaryStack = [];
		var postfixStack = [];

		while(infixQueue.length > 0){
			var input = infixQueue.shift();
			if(!isNaN(input)){
				postfixStack.push(input);
			} else if(input === LEFT_PARENTHESIS){
				temporaryStack.push(input);
			} else if(input === RIGHT_PARENTHESIS){
				var element = temporaryStack.pop();
				while(element !== LEFT_PARENTHESIS){
					postfixStack.push(element);
					element	 = temporaryStack.pop();
				}
			} else {
					let currentInputPrecedence = input.precedence;
					if(currentInputPrecedence){
					while(temporaryStack.length>0 && temporaryStack[temporaryStack.length - 1].precedence &&
						temporaryStack[temporaryStack.length - 1].precedence >= currentInputPrecedence){
							postfixStack.push(temporaryStack.pop());
					}
				}
				temporaryStack.push(input); 

				
			}
		}
		while(temporaryStack.length > 0){
			postfixStack.push(temporaryStack.pop());
		}
		return postfixStack;
	}


	evaluatePostfixStack(postfixStack){
		if(postfixStack.includes(LEFT_PARENTHESIS) || postfixStack.includes(RIGHT_PARENTHESIS)){
			return "ERROR CHECK PARENTHESIS";
		}

			var temporaryStack = [];
			while(postfixStack.length > 0){
				let input = postfixStack.shift();
				if(!isNaN(input)){
					temporaryStack.push(input);	
				} else {
					if(input.arity === BINARY_OPERATOR_TYPE	){
						if(temporaryStack.length < 2){
							return "ERROR: INVALID INPUT";
						}
						let b = temporaryStack.pop();
						let a = temporaryStack.pop();
						let newValue = this.performOperation(input, a, b);
					temporaryStack.push(newValue);
					} else {
						if(temporaryStack.length < 1){
							return "ERROR: INVALID INPUT";
						}
						let a = temporaryStack.pop();
						let newValue = this.performOperation(input, a);
						temporaryStack.push(newValue);
					}

				}
			}

			if(temporaryStack.length !== 1){
				return "ERROR: INVALID INPUT";
			}

			return temporaryStack.pop();
	}







	performOperation(operator, a, b){
		switch(operator){
			case OPERATOR_ADD:
				return a + b;
			case OPERATOR_SUBTRACT:
				return a - b;
			case OPERATOR_DIVIDE:
				return a / b;
			case OPERATOR_MULTIPLY:
				return a * b;
			case OPERATOR_MOD:
				return a % b;
			case OPERATOR_EXP:
				return a * Math.pow(10,b);
			case OPERATOR_POWER:
				return Math.pow(a, b);
			case OPERATOR_SIN:
				if(this.degreeFormat === DEGREES){
					return Math.sin(a * (180 / Math.PI));
				} else {
					return Math.sin(a);
				}
			case OPERATOR_COS:
				if(this.degreeFormat === DEGREES){
					return Math.cos(a * (180 / Math.PI));
				} else {
					return Math.cos(a);
				}
			case OPERATOR_TAN:
				if(this.degreeFormat === DEGREES){
					return Math.tan(a * (180 / Math.PI));
				} else {
					return Math.tan(a);
				}
			case OPERATOR_NEG:
				return -1 * a;
			case OPERATOR_LOG:
				return Math.log10(a);
			case OPERATOR_LN:
				return Math.log(a);
			case OPERATOR_SQRT:
				return Math.sqrt(a);
			case OPERATOR_PERCENT:
				return a * 0.01;
			case OPERATOR_FACTORIAL:
				return sFact(a);
			case OPERATOR_SQRT:
				return Math.sqrt(a);
			default:
				return null;
		}
	}


	combineDigitsFromInputArray(inputsArray){
		let currentNum = null;
		let newArray = [];
		inputsArray.forEach((input)=>{
			if(input === "." || !isNaN(input)){

				currentNum = currentNum !== null ? (currentNum + input) : input;
			} else {
				if(currentNum){
					newArray.push(currentNum);
					currentNum = null;
					}
				newArray.push(input); 
			}
		});

		if (currentNum){
			newArray.push(currentNum);
		}
		return newArray;
	}

	//replace constants with numbers.hmmm.. might want to change to string
	replaceConstantsFromInputsArray(array){
		const newArray =array.slice();
		for(let i=0; i < array.length; i++){
			let input = array[i];
			if(input === "e"){
				newArray[i] = Math.E ;
			} else if (input === "π"){
				newArray[i] = Math.PI ;
			} else if (input === "φ"){
			newArray[i] = (1 + Math.sqrt(5)) / 2 ;
			} else if (input === "ANS"){
				newArray[i] = this.evaluatedAnswer;
			}
		}
		return newArray;
	}

	addImplicitMultiplicationForInputObjs(array){
		const newArray = array.slice();
		let newArrayLength = array.length;
		let i = 0;
		while(i < newArrayLength){
			let input = newArray[i];
			if( (i+1) < newArrayLength ){
				let nextInput = newArray[i+1];
				const isValidToInsertMultiplication = ( input === RIGHT_PARENTHESIS || !isNaN(input) || this.isInputUnaryPostfixOperation(input) ) 
																	&& nextInput !== RIGHT_PARENTHESIS
																	&& !this.isInputBinaryOperation(nextInput) 
																	&& !this.isInputUnaryPostfixOperation(nextInput);
				if (isValidToInsertMultiplication){
						newArray.splice(i+1,0,OPERATOR_MULTIPLY);
						newArrayLength = newArray.length;
				}
			}
			i++;
		}
		return newArray;
	}
	


	isInputBinaryOperation(input){
		if (input instanceof Operator){
			return input.arity === BINARY_OPERATOR_TYPE;
		}
		return false;
	}

	isInputUnaryPostfixOperation(input){
		if (input instanceof Operator){
			return input.precedence === UNARY_POSTFIX_PRECEDENCE;
		}
		return false;
	}


	setEvaluatedAnswer(result){
		this.evaluatedAnswer = result;
	}

	evaluateInputs(inputsArray){

		const combinedDigitsInputsArray = this.combineDigitsFromInputArray(inputsArray);
		const constantsReplacedInputsArray = this.replaceConstantsFromInputsArray(combinedDigitsInputsArray);
		const infixArray = this.convertInputsToInputObjs(constantsReplacedInputsArray);
		const modifyImplicitCasesInputsArray = this.addImplicitMultiplicationForInputObjs(infixArray);
		const postfixStack = this.convertInfixQueueToPostfixStack(modifyImplicitCasesInputsArray);
		const result = this.evaluatePostfixStack(postfixStack);

		this.setEvaluatedAnswer(result);
		return result;
	}




}

//factorial function
function sFact(num)
{
    var rval=1;
    for (var i = 2; i <= num; i++)
        rval = rval * i;
    return rval;
}

export const CalculatorUtils = new Calculator();
