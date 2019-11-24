import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import Logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um E-mail válido')
    .required('O campo E-mail não pode ser vazio'),
  password: Yup.string().required('O campo Senha não pode ser vazio'),
});

const SignIn = () => {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={Logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Senha" />

        <button type="submit">Logar</button>

        <Link to="/register">Criar conta gratuita</Link>
      </Form>
    </>
  );
};

export default SignIn;
