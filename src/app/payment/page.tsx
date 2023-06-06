'use client';

import React from 'react';
import { makePayment } from '~/appRoot/main/factories/pages/payment/payment.factory';

const Payment: React.FC = () => {
  return makePayment();
};

export default Payment;
