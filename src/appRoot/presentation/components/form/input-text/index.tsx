import {
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  forwardRef,
} from 'react';
import styles from './input-text.module.scss';

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const BaseInputText: ForwardRefRenderFunction<
  HTMLInputElement,
  InputTextProps
> = ({ name, label, ...rest }, ref) => (
  <div className={styles.inputContainer}>
    <label className={styles.label} htmlFor={name}>
      {label}
    </label>

    <input
      className={styles.input}
      ref={ref}
      type='text'
      id={name}
      placeholder='Digite aqui...'
      {...rest}
    />
  </div>
);

export default forwardRef(BaseInputText);
