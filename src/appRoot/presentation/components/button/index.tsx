import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  color?: 'primary' | 'blackAlpha';
  variant?: 'ghost' | 'solid';
}

export function Button({
  children,
  className,
  isLoading = false,
  color = 'primary',
  variant = 'solid',
  ...rest
}: ButtonProps) {
  return (
    <button
      type='button'
      className={`${styles.button} ${className} ${styles[color]} ${styles[variant]}`}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? 'Carregando...' : children}
    </button>
  );
}
