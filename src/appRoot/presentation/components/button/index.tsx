import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  color?: 'primary' | 'blackAlpha';
}

export function Button({
  children,
  className,
  isLoading = false,
  color = 'primary',
  ...rest
}: ButtonProps) {
  return (
    <button
      type='button'
      className={`${styles.button} ${className} ${styles[color]}`}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? 'Carregando...' : children}
    </button>
  );
}
