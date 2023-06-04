'use client';

import React from 'react';
import { makeCreatePaymentMethod } from '~/appRoot/main/factories/pages/create-payment-method/create-payment-method.factory';

const CreatePaymentMethod: React.FC = () => {
  return makeCreatePaymentMethod();
};

export default CreatePaymentMethod;
