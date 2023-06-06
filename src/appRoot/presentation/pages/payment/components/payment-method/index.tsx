import React from 'react';
import { IconType } from 'react-icons';

import styles from './payment-method.module.scss';

interface PaymentMethodProps {
  id: string;
  icon: IconType;
  name: string;
  isSelected: boolean;
  setSelectPaymentMethod: (id: string) => void;
}

export function PaymentMethod({
  id,
  icon: Icon,
  name,
  isSelected,
  setSelectPaymentMethod
}: PaymentMethodProps) {
  return (
    <button
      className={`${styles.container} ${isSelected ? styles.selected : ''}`}
      onClick={() => setSelectPaymentMethod(id)}
    >
      <Icon size={32} />

      <span>{name}</span>
    </button>
  );
}
