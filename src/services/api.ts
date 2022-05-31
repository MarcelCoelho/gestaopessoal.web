import axios from "axios";

export const api = axios.create({
  // baseURL: "https://gestaopessoal:7009",
  baseURL: "https://localhost:7009",
});

export const apiSoccer = axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com//http://jsuol.com.br/c/monaco/utils/gestor/commons.js?callback=simulador_dados_jsonp&file=commons.uol.com.br/sistemas/esporte/modalidades/futebol/campeonatos/dados/{ano}/{campeonato}/dados.json",
});
