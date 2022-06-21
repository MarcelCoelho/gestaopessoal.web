
//import { Container } from "./styles";
import { useEffect } from "react";

import './styles.scss';
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

    <div className="timeline">
      <div className="container left">
        <div className="content">
          <h2>2017</h2>
          <p>Lorem ipsum..</p>
        </div>
      </div>
      <div className="container right">
        <div className="content">
          <h2>2016</h2>
          <p>Lorem ipsum..</p>
        </div>
      </div>
      <div className="container right">
        <div className="content">
          <h2>2015</h2>
          <p>Lorem ipsum..</p>
        </div>
      </div>
      <div className="container left">
        <div className="content">
          <h2>2015</h2>
          <p>Lorem ipsum..</p>
        </div>
      </div>
      <div className="container left">
        <div className="content">
          <h2>2015</h2>
          <p>Lorem ipsum..</p>
        </div>
      </div>
      <div className="container left">
        <div className="content">
          <h2>2015</h2>
          <p>Lorem ipsum..</p>
        </div>
      </div>
      <div className="container left">
        <div className="content">
          <h2>2015</h2>
          <p>Lorem ipsum..</p>
        </div>
      </div>
      <div className="container left">
        <div className="content">
          <h2>2015</h2>
          <p>Lorem ipsum..</p>
        </div>
      </div>
      <div className="container left">
        <div className="content">
          <h2>2015</h2>
          <p>Lorem ipsum..</p>
        </div>
      </div>
      <div className="container left">
        <div className="content">
          <h2>2015</h2>
          <p>Lorem ipsum..</p>
        </div>
      </div>
      <div className="container left">
        <div className="content">
          <h2>2015</h2>
          <p>Lorem ipsum..</p>
        </div>
      </div>
      <div className="container left">
        <div className="content">
          <h2>2015</h2>
          <p>Lorem ipsum..</p>
        </div>
      </div>
    </div>
  )
}