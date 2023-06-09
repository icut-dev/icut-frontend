import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: 'primary' | 'blackAlpha';
}

export function Button({
  children,
  className,
  color = 'primary',
  ...rest
}: ButtonProps) {
  return (
    <button
      type='button'
      className={`${styles.button} ${className} ${styles[color]}`}
      {...rest}
    >
      {children}
    </button>
  );
}
