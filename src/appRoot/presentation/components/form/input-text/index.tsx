import {
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  forwardRef,
} from 'react';
import styles from './input-text.module.scss';

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  error?: any;
}

const BaseInputText: ForwardRefRenderFunction<
  HTMLInputElement,
  InputTextProps
> = ({ name, label, error, ...rest }, ref) => (
  <div className={styles.inputContainer}>
    <label className={styles.label} htmlFor={name}>
      {label}
    </label>

    <input
      className={styles.input}
      ref={ref}
      type='text'
      id={name}
      name={name}
      placeholder='Digite aqui...'
      {...rest}
    />

    {!!error && <span className={styles.error}>{error.message}</span>}
  </div>
);

export default forwardRef(BaseInputText);
