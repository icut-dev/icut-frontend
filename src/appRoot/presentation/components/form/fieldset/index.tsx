import { FieldsetHTMLAttributes, ReactElement, ReactNode } from 'react';
import styles from './styles.module.scss';

interface FieldsetProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legendTitle?: string;
  legend?: ReactElement;
  children: ReactNode;
}

export function Fieldset({
  legend,
  legendTitle,
  children,
  className,
  ...rest
}: FieldsetProps) {
  return (
    <fieldset className={`${styles.fieldsetContainer} ${className}`} {...rest}>
      {legendTitle && (
        <legend className={styles.legendContainer}>
          <span>{legendTitle}</span>
          {legend}
        </legend>
      )}

      <div className={styles.fieldsetContent}>{children}</div>
    </fieldset>
  );
}
