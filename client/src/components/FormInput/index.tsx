import { useState } from "react";
import { FormElementProps } from "../../types/Form";
import { validate } from "../../utils/validators";
import styles from './index.module.scss';
import cn from 'classnames'

const FormInput: React.FC<FormElementProps> = (props) => {
  const [errorMsg, setErrorMsg] = useState('');

  const handleInput = (event: React.ChangeEvent & React.FocusEvent<any>) => {
    const { result, error } = validate(event.target.value, props.label, props.validations);
    setErrorMsg(error);
    props.handleForm(props.id, event.target.value, result);
  };

  return (
    <div className={styles.inputContainer}>
      <label className={cn(styles.inputLabel, props.isTouched && !props.isValid && styles.labelError)}>
        {props.label}
      </label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        onChange={handleInput}
        onBlur={handleInput}
        value={props.value}
        className={cn(styles.input, props.isTouched && !props.isValid && styles.inputError)}
      />
      {props.isTouched && !props.isValid && (
        <span className={styles.info}>
          {errorMsg}
        </span>
      )}
    </div>
  );
};

export default FormInput;
