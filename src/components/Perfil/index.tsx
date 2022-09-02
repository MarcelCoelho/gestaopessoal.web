
import React from 'react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import { Profile } from './styles';
export function Perfil() {

  const [avatarUrl, setAvatarUsuario] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("");

  useEffect(() => {
    setNomeUsuario(Cookies.get('nome_usuario'));
    setAvatarUsuario(Cookies.get('avatar_usuario'));
  }, [])

  return (
    <Profile>
      <img src={avatarUrl} alt={nomeUsuario} />
      <div>
        <span>Gastos</span>
        <b>{nomeUsuario}</b>
      </div>
    </Profile>
  )
}