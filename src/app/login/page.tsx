import React from 'react';
import { makeLogin } from '~/appRoot/main/factories/pages/login/login.factoy';

const Login: React.FC = () => {
  return makeLogin({
    message: 'Olá'
  });
};

export default Login;
