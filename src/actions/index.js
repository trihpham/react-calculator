export const REMOVE_INPUT = 'REMOVE_INPUT';
export const ADD_INPUT = 'ADD_INPUT';
export const EVALUATE_INPUTS = 'EVALUATE_INPUTS';
export const CLEAR_INPUTS = 'CLEAR_INPUTS';
export const MOVE_CURSOR = 'MOVE_CURSOR';
export const DEGREE_FORMAT_CHANGE = 'DEGREE_FORMAT_CHANGE';
export const PREV_INPUT = 'PREV_INPUT';

export function revertToPrevInputs() {
    return {
        type: PREV_INPUT,
        payload: null
    };
}

export function addInput(input) {
    return {
        type: ADD_INPUT,
        payload: input
    };
}

export function removeInput(input) {
    return {
        type: REMOVE_INPUT,
        payload: input
    };
}

export function evaluateInputs() {
    return {
        type: EVALUATE_INPUTS,
        payload: null
    };
}

export function clearInputs() {
    return {
        type: CLEAR_INPUTS,
        payload: null
    };
}

export function moveCursor(direction) {
    return {
        type: MOVE_CURSOR,
        payload: direction
    }
}

export function changeDegreeFormat(input) {
    return {
        type: DEGREE_FORMAT_CHANGE,
        payload: input
    }
}
;