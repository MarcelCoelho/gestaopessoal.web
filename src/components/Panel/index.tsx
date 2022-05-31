
import { Container } from "./styles";
import { useEffect } from "react";

import { apiSoccer } from "../../services/api";
import axios from 'axios';

export function Panel() {

  /*useEffect(() => {

    const ano = "2022";
    const campeonato = "13";

    const urlApiSoccer = apiSoccer.getUri().replace("{ano}", ano).replace("{campeonato}", campeonato);
    const response = getJsonApi(urlApiSoccer);
    response.then(res => {
      console.log(res);
    });

  }, [])*/

  useEffect(() => {
  }, [])

  async function getJsonApi(url) {
    //axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    return await axios.get(url);
  }

  return (
    <Container>PANEL APLICACOES</Container>
  )
}