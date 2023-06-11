import { ReactNode } from 'react';
import styles from './styles.module.scss';

interface InputRowProps {
  children: ReactNode;
}

export function InputRow({ children }: InputRowProps) {
  return <div className={styles.row}>{children}</div>;
}
