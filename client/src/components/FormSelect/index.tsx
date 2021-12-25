import { useState } from 'react';
import { FormElementProps } from '../../types/Form';
import { validate } from '../../utils/validators';
import styles from './index.module.scss';
import cn from 'classnames';
import { BsChevronDown } from 'react-icons/bs';

const FormSelect: React.FC<FormElementProps> = (props) => {
  const [errorMsg, setErrorMsg] = useState('');

  const handleInput = (event: React.ChangeEvent & React.FocusEvent<any>) => {
    const { result, error } = validate(event.target.value, props.label, props.validations);
    setErrorMsg(error);
    props.handleForm(props.id, event.target.value, result);
  };

  return (
    <div className={styles.selectContainer}>
      <label className={cn(styles.selectLabel, props.isTouched && !props.isValid && styles.labelError)}>
        {props.label}
      </label>
      <div className={styles.selectBox}>
        <div className={styles.selectIcon}>
          <BsChevronDown />
        </div>
        <select
          placeholder='Select option'
          onChange={handleInput}
          onBlur={handleInput}
          value={props.value}
          className={cn(styles.select, props.isTouched && !props.isValid && styles.selectError)}
        >
          <option value=''>Select Option</option>
          {props.options!.map((option, index) => (
            <option key={index.toString()} value={option.id}>
              {option.text}
            </option>
          ))}
        </select>
      </div>
      {props.isTouched && !props.isValid && <span className={styles.info}>{errorMsg}</span>}
    </div>
  );
};

export default FormSelect;
