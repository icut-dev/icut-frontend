/* eslint-disable arrow-parens */
import {
  ForwardRefRenderFunction,
  SelectHTMLAttributes,
  forwardRef,
} from 'react';
import styles from './styles.module.scss';

interface InputSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name: string;
  error?: any;
  options: Array<{ value: string | number; label: string; disabled?: boolean }>;
}

const BaseInputSelect: ForwardRefRenderFunction<
  HTMLSelectElement,
  InputSelectProps
> = ({ label, name, error, options, ...rest }, ref) => (
  <div className={styles.inputContainer}>
    {label && (
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
    )}

    <select
      id={name}
      name={name}
      placeholder='Selecione...'
      ref={ref}
      className={styles.input}
      {...rest}
    >
      {options.map((o) => (
        <option key={o.value} disabled={o?.disabled || false} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>

    {!!error && <span className={styles.error}>{error.message}</span>}
  </div>
);

export default forwardRef(BaseInputSelect);
