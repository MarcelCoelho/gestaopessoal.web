
import React from 'react';
import { useState } from 'react';
import { FiUser, FiLock, FiGithub } from 'react-icons/fi';

import Input from "../../_Comum/Input";

import { useNavigate } from 'react-router-dom';

import { Container, ContainerInfo } from "./styles";
import axios from 'axios';

import Cookies from 'js-cookie';

type UsuarioGithub = {
  id: string;
  login: string;
  name: string;
  avatar_url: string;
  email: string;
  html_url: string;
}

export function Login() {

  const navigate = useNavigate();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  function UsuarioEstaLogado() {

    const usuario_logado_cookie = Cookies.get('usuario_logado');
    //const usuariosDecodificados = decodeURIComponent(usuarios)?.split(',');

    return (usuario_logado_cookie !== undefined && usuario_logado_cookie === usuario)

  }

  async function logarGithub() {

    const api = axios.create({
      baseURL: "https://api.github.com/users",
    });

    const user = await api.get<UsuarioGithub>(`/${usuario}`);

    GravarUsuarioCookies(user.data);
    NavegarParaPaginaTransacoes();

  }

  function GravarUsuarioCookies(user: UsuarioGithub) {
    if (user !== undefined) {
      Cookies.set('usuario_logado', usuario);
      Cookies.set('id_usuario', user.id);
      Cookies.set('login_usuario', user.login);
      Cookies.set('nome_usuario', user.name);
      Cookies.set('avatar_usuario', user.avatar_url);
      Cookies.set('url_github', user.html_url);
      //Cookies.set('users', usersCookies);
    }
  }

  function handleLogin(event) {
    event.preventDefault();

    if (usuario && senha) {

      if (!UsuarioEstaLogado())
        logarGithub();
      else
        NavegarParaPaginaTransacoes();
    }
  }

  function NavegarParaPaginaTransacoes() {
    navigate("/transacoes");
  }
  return (
    <Container>

      <ContainerInfo>

        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <Input
            value={usuario}
            onChange={(event) => setUsuario(event.target.value)}
            name="usuario"
            placeholder="Nome de usuário"
            icon={FiUser} />

          <Input
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <button onClick={handleLogin}>
            <span>Entrar com Github </span>
            <FiGithub size={18} />
          </button>
        </form>
      </ContainerInfo>
    </Container>
  )
}