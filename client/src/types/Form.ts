export type Validator = (inputValue: string, inputLabel: string) => { isValid: boolean; message: string };

export interface Input {
  id: string;
  value: string;
  isValid: boolean;
  isTouched: boolean;
  errorMessage?: string;
}

export interface FormElementProps extends Input {
  placeholder?: string;
  type?: string;
  options?: { id: string; text: string }[];
  label: string;
  validations: Validator[];
  handleForm: (inputId: string, inputValue: string, inputIsValid: boolean) => void;
}

export interface InputsMap {
  [key: string]: Input;
}
