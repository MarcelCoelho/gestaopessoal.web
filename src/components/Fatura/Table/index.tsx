import { useFaturas } from "../../../hooks/useFaturas";

import { FiTrash, FiTrash2 } from "react-icons/fi";

import { Container, TR } from "./styles";
import { Checkbox } from "@material-ui/core";

export function Table() {
  const {
    faturas,
    removeAllFaturas,
    removeFatura
  } = useFaturas();


  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Período</th>
            <th>De</th>
            <th>Até</th>
            <th>Fechada</th>
            <th>
              <FiTrash
                size="20"
                onClick={() => {
                  removeAllFaturas();
                }}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {faturas &&
            faturas.map((fatura) => (
              <TR key={fatura.id}
                  fechada={fatura.fechada} 
                  atual={fatura.atual}>
                    
                <td>{fatura.observacao}</td>
                <td>{fatura.mes + "/" + fatura.ano}</td>
                <td>{new Intl.DateTimeFormat().format(
                  new Date(fatura.dataInicio)
                )}</td>
                <td>{new Intl.DateTimeFormat().format(
                  new Date(fatura.dataFinal)
                )}</td>
                <td><Checkbox value={fatura.fechada} checked={fatura.fechada} /></td>
                <td>
                  <FiTrash2
                    size="18"
                    onClick={() => {
                      removeFatura(fatura.id);
                    }}
                  />
                </td>
              </TR>
            ))}
        </tbody>
      </table>
    </Container>
  );
}
