'use client';

import React from 'react';
import { makeService } from '~/appRoot/main/factories/pages';

const Register: React.FC = (props: any) =>
  makeService({ establishmentId: props.params.establishmentId });

export default Register;
