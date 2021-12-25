import { useReducer } from 'react';
import { InputsMap } from '../types/Form';

type Action =
  | {
      type: 'CHANGE_INPUT';
      payload: {
        inputId: string;
        inputValue: string;
        inputIsValid: boolean;
      };
    }
  | {
      type: 'SET_ERROR';
      payload: string;
    }
  | {
      type: 'RESET_FORM';
      payload: InputsMap;
    };

interface State {
  inputs: InputsMap;
  isValid: boolean;
  error: string;
}

const formReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'CHANGE_INPUT': {
      let formIsValid = true;

      for (const input in state.inputs) {
        if (input === action.payload.inputId) {
          formIsValid = formIsValid && action.payload.inputIsValid;
        } else {
          formIsValid = formIsValid && state.inputs[input].isValid;
        }
      }

      return {
        ...state,
        error: '',
        isValid: formIsValid,
        inputs: {
          ...state.inputs,
          [action.payload.inputId]: {
            ...state.inputs[action.payload.inputId],
            value: action.payload.inputValue,
            isValid: action.payload.inputIsValid,
            isTouched: true,
          },
        },
      };
    }
    case 'SET_ERROR': {
      return {
        ...state,
        isValid: false,
        error: action.payload,
      };
    }

    case 'RESET_FORM': {
      return {
        ...state,
        isValid: false,
        inputs: {
          ...action.payload,
        },
      };
    }

    default:
      return state;
  }
};

const useForm = (
  initialInputs: InputsMap,
  onSubmit: (results: { formData: any; reset: () => void; setError: (err: string) => void }) => void
) => {
  const [formState, dispatch] = useReducer(formReducer, {
    isValid: false,
    error: '',
    inputs: initialInputs,
  });

  const handleForm = (inputId: string, inputValue: string, inputIsValid: boolean) => {
    dispatch({
      type: 'CHANGE_INPUT',
      payload: { inputId, inputValue, inputIsValid },
    });
  };

  const setError = (err: string) => {
    dispatch({ type: 'SET_ERROR', payload: err });
  };

  const reset = () => {
    dispatch({
      type: 'RESET_FORM',
      payload: initialInputs,
    });
  };

  const handleSubmit = () => {
    let formData = {};

    for (const input in formState.inputs) {
      formData = {
        ...formData,
        [input]: formState.inputs[input].value,
      };
    }

    onSubmit({ formData, reset, setError });
  };

  return {
    formInputs: formState.inputs,
    formIsValid: formState.isValid,
    formError: formState.error,
    handleForm,
    handleSubmit,
  };
};

export default useForm;
