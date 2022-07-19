
import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";

//import './styles.scss';
import { Container, Filter, Timeline, ContainerLeft, ContentLeft, ContainerRight, ContentRight } from './styles';

import { apiGenesisLocal } from "../../services/api";

import Loading from '../Loading';
import { CounterContext } from '../../hooks/useCounter';

import TextField from '@material-ui/core/TextField';
import AutoComplete from '@material-ui/lab/Autocomplete';

type itemLog = {
  "logs": [{

    "identificadorEjecucion": string,
    "fechaHoraUltimoRegistro": Date,
    "codigoVersion": string,
    "codigoHost": string,
    "codigoLogSistema": string,
    "codigoUsuario": string,
    "codigoTipoLog": string,
    "codigoIdentificadorEntidad": string,
    "codigoFuncionalidad": string,
    "remesas": [{
      "codigoRecibo": string,
      "codigoEstado": string,
      "orden": number,
    }],
    "detalleLogs": [{
      "idDetalle": string,
      "observacionInfo": string,
      "descripcionMensaje": string,
      "fechaHoraRegistro": Date,
      "infoOpen": boolean
    }]
  }]
};

type funcionalidade = {
  "funcionalidade": {
    "codigosFuncionalidades": [],
    "codigosAplicacoes": []
  }
};

type teste = {
  id: string,
  key: string,
  count: number
}


export function Panel() {
  const [itemsLog, setLogs] = useState<itemLog>();

  const [aplicacoes, setAplicacoes] = useState([]);
  const [funcionalidades, setFuncionalidades] = useState([]);

  const [aplicacion, setAplicacion] = useState("");
  const [funcionalidade, setFuncionalidade] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [loading, setLoading] = useState(false);

  const [teste, setTeste] = useState<teste>();

  const {
    resetCounter } = useContext(CounterContext);

  useEffect(() => {
    getfuncionalidades();
  }, [])

  async function getfuncionalidades() {
    try {
      //setLoading(true);

      const response = await apiGenesisLocal.get<funcionalidade>("/Funcionalidade");
      setAplicacoes(response.data.funcionalidade.codigosAplicacoes);
      setFuncionalidades(response.data.funcionalidade.codigosFuncionalidades);
      //setLoading(false);
      //resetCounter();
    }
    catch (error) {
      console.log(error.message);
      //setLoading(false);
      //resetCounter();
    }
  }

  async function getLog() {
    try {
      setLogs(null);
      setLoading(true);
      const request = {
        "codigoAplicacion": aplicacion,
        "codigoFuncionalidad": funcionalidade,
        "cantidadDiasPasados": quantidade
      };
      const response = await apiGenesisLocal.post<itemLog>("/Log", request);
      setLogs(response.data);
      console.log(response.data);
      setLoading(false);
      resetCounter();
    }
    catch (error) {
      console.log(error.message);
      setLoading(false);
      resetCounter();
    }
  }

  function handleBuscarLogs() {
    getLog();
  }

  function handleMoreInfo(idEjecucion: string, idDetalle: string) {

    let _itemsLog: itemLog;

    itemsLog.logs.forEach(log => {
      if (log.identificadorEjecucion === idEjecucion) {
        log.detalleLogs.forEach(detalle => {
          if (detalle.idDetalle === idDetalle) {
            if (detalle.infoOpen)
              detalle.infoOpen = false;
            else
              detalle.infoOpen = true;
          }
        })
        _itemsLog = itemsLog;
      }
    });

    return _itemsLog;
  }

  function handleTeste() {
    let _teste: teste;

    if (teste === undefined) {
      _teste = {
        id: "1",
        key: "1",
        count: 1
      }
    } else {
      _teste = {
        id: (teste.count + 1).toString(),
        key: (teste.count + 1).toString(),
        count: teste.count + 1
      }
    }
    setTeste(_teste);
  }

  return (
    <>
      <div onClick={handleTeste}>
        Quantidade de cliques = 
        {" " + teste && teste.count}
      </div>

      <Container>
        <Filter>

          <div className="autocomplete-aplicacoes">
            <AutoComplete
              onChange={(e, newValue) => setAplicacion(newValue)}
              options={aplicacoes}
              renderInput={(params) =>
                <TextField {...params} label="Aplicações" variant="outlined" />} />
          </div>
          <div className="autocomplete-funcionalidades">
            <AutoComplete
              onChange={(e, newValue) => setFuncionalidade(newValue)}
              options={funcionalidades}
              renderInput={(params) =>
                <TextField {...params} label="Funcionalidades" variant="outlined" />} />
          </div>
          <div className="input-quantidade">
            <input
              placeholder="Qtd Dias"
              value={quantidade}
              onChange={(event) => setQuantidade(event.target.value)}
            />
          </div>
          <button className="btn-ir" type="submit" onClick={handleBuscarLogs}>IR</button>
        </Filter>


        {loading ?
          (<Loading type={"bars"} color="#04d361" />) :
          (<Timeline>
            {itemsLog && itemsLog.logs.map((log, index) =>


              <div key={index}>
                <ContainerLeft >
                  <ContentLeft >
                    <h2>{format(new Date(log.fechaHoraUltimoRegistro), "dd/MM/yyyy HH:mm:ss")}</h2>
                    {log.remesas && log.remesas.map((remesa) => (
                      <p>{remesa.codigoRecibo} - {remesa.codigoEstado}</p>
                    ))}
                  </ContentLeft>
                </ContainerLeft>


                {log.detalleLogs && log.detalleLogs.map((detalle, indexDetalle) => (

                  <ContainerRight key={indexDetalle}>
                    <ContentRight>
                      <h2>{detalle.descripcionMensaje}</h2>
                      {detalle.observacionInfo && (
                        <button type="submit" onClick={() => handleMoreInfo(log.identificadorEjecucion, detalle.idDetalle)}>{detalle.infoOpen ? "-" : "+"}</button>
                      )}
                    </ContentRight>
                  </ContainerRight>

                ))}
              </div>
            )}

          </Timeline>)}
      </Container>
    </>

  )
}