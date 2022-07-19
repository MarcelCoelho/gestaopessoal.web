import axios from "axios";

export const api = axios.create({
  // baseURL: "https://gestaopessoal:7009",
  baseURL: "https://localhost:7009",
});

export const apiSoccer = axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com//http://jsuol.com.br/c/monaco/utils/gestor/commons.js?callback=simulador_dados_jsonp&file=commons.uol.com.br/sistemas/esporte/modalidades/futebol/campeonatos/dados/{ano}/{campeonato}/dados.json",
});

export const apiGenesis = axios.create({
  // baseURL: "https://gestaopessoal:7009",
  baseURL: "http://10.83.0.47:8010/Genesis.Api.Logging.1.0",
});

export const apiGenesisLocal = axios.create({
  // baseURL: "https://gestaopessoal:7009",
  baseURL: "http://10.83.0.47:8010/Genesis.Api.Logging.1.0",
});
