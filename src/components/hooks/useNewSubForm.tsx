/* eslint-disable no-case-declarations */
import { useReducer } from "react";
import {Sub} from '../types'

interface FormState extends Sub {}

type FormReducerAction = {
    type: "change_value",
    payload: {
        inputName: string; // Use keyof Sub to ensure the inputName is a valid property of Sub
        inputValue: string | number;
    };
} | {
    type: "clear";
};

const INITIAL_STATE: FormState = {
    nick: '',
    subMonths: 0,
    avatar: '',
    description: '',
    gender: '',
};

const formReducer = (state: FormState, action: FormReducerAction): FormState => {
    switch (action.type) {
        case "change_value":
            const { inputName, inputValue } = action.payload;
            return {
                ...state,
                [inputName]: inputValue
            };
        case "clear":
            return INITIAL_STATE;
        default:
            return state;
    }
};

const useNewSubForm = () => {
    return useReducer(formReducer, INITIAL_STATE);
};

export default useNewSubForm;
