import { useFaturas } from "../../../hooks/useFaturas";

import { FiTrash, FiTrash2 } from "react-icons/fi";

import { Container, Tr } from "./styles";
import { Checkbox } from "@material-ui/core";

import { TableStandard } from '../../TableStandard';

export function Table() {
  const {
    faturas,
    updateCloseFatura,
    removeAllFaturas,
    removeFatura
  } = useFaturas();


  return (
    <Container>
      <TableStandard>
        <table>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Período</th>
              <th>De</th>
              <th>Até</th>
              <th>Fechada</th>
              <th className="close">
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
                <Tr key={fatura.id}
                  fechada={fatura.fechada}
                  atual={fatura.atual}>

                  <td className="title">{fatura.observacao}</td>
                  <td className="title">{fatura.mes + "/" + fatura.ano}</td>
                  <td className="title">{new Intl.DateTimeFormat().format(
                    new Date(fatura.dataInicio)
                  )}</td>
                  <td className="title">{new Intl.DateTimeFormat().format(
                    new Date(fatura.dataFinal)
                  )}</td>
                  <td className="title"><Checkbox value={fatura.fechada} checked={fatura.fechada} onClick={() => updateCloseFatura(fatura.id)} /></td>
                  <td className="close">
                    <FiTrash2
                      size="18"
                      onClick={() => {
                        removeFatura(fatura.id);
                      }}
                    />
                  </td>
                </Tr>
              ))}
          </tbody>
        </table>
      </TableStandard>
    </Container>
  );
}
