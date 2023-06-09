import { ReactElement, ReactNode } from 'react';
import styles from './styles.module.scss';

interface FieldsetProps {
  legendTitle: string;
  legend?: ReactElement;
  children: ReactNode;
}

export function Fieldset({ legend, legendTitle, children }: FieldsetProps) {
  return (
    <fieldset className={styles.fieldsetContainer}>
      <legend className={styles.legendContainer}>
        <span>{legendTitle}</span>
        {legend}
      </legend>

      <div className={styles.fieldsetContent}>{children}</div>
    </fieldset>
  );
}
