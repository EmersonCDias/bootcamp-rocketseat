import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import Logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  name: Yup.string().required('O campo Nome não pode ser vazio'),
  email: Yup.string()
    .email('Insira um E-mail válido')
    .required('O campo E-mail não pode ser vazio'),
  password: Yup.string()
    .min(8, 'A Senha precisa de no mínimo 8 caracteres')
    .required('O campo Senha não pode ser vazio'),
});

const SignUp = () => {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={Logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Senha" />

        <button type="submit">Criar conta</button>

        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
};

export default SignUp;
