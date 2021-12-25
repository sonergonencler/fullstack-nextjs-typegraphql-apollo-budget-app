import { Validator } from '../types/Form';

type ValidatorsMap = {
  [key: string]: (val?: any) => Validator;
};

export const validators: ValidatorsMap = {
  notEmpty: () => {
    return (inputValue, inputLabel) => {
      const value = inputValue.trim();

      const isValid = value.length > 0;

      return {
        isValid,
        message: `${inputLabel} field is required`,
      };
    };
  },
  minLength: (min) => {
    return (inputValue, inputLabel) => {
      const value = inputValue.length;

      const isValid = value >= min;
      const message = `${inputLabel} field must be at least ${min} characters`;

      return {
        isValid,
        message,
      };
    };
  },
  maxLength: (max) => {
    return (inputValue, inputLabel) => {
      const value = inputValue.length;

      const isValid = value <= max;
      const message = `${inputLabel} field cannot be longer than ${max} characters`;

      return {
        isValid,
        message,
      };
    };
  },
  min: (min) => {
    return (inputValue, inputLabel) => {
      const value = Number(inputValue);

      const isValid = value > Number(min);
      const message = `${inputLabel} field must be greater than ${min}`;

      return {
        isValid,
        message,
      };
    };
  },
  max: (max) => {
    return (inputValue, inputLabel) => {
      const value = Number(inputValue);

      const isValid = value <= Number(max);
      const message = `${inputLabel} field cannot be greater than ${max}`;

      return {
        isValid,
        message,
      };
    };
  },
  isPattern: (pattern) => {
    return (inputValue, inputLabel) => {
      const value = inputValue;

      const isValid = new RegExp(pattern).test(value);
      const message = `${inputLabel} field contains invalid characters`;

      return {
        isValid,
        message,
      };
    };
  },
};

export const validate = (value: string, label: string, validations: Validator[]) => {
  const results = [];

  for (const validator of validations) {
    const result = validator(value, label);

    if (!result.isValid) {
      results.push(result);
    }
  }

  const result = !results.some((result) => !result.isValid);
  const error = results.length > 0 ? results[0].message : '';

  return {
    result,
    error,
  };
};
