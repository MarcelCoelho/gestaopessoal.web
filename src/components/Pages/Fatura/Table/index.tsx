import React from 'react';
import { useFaturas } from "../../../../hooks/useFaturas";

import { FiTrash, FiTrash2 } from "react-icons/fi";

import { Container, Tr } from "./styles";
import { Checkbox } from "@material-ui/core";

import { TableStandard } from '../../../TableStandard';
import { ChangeEvent } from "react";

export function Table() {
  const {
    faturas,
    putFaturaFechada,
    putFaturaAtual,
    removeAllFaturas,
    removeFatura
  } = useFaturas();

  function handleOnChangeFaturaFechada(e: ChangeEvent<HTMLInputElement>, id: string) {
    putFaturaFechada(id, Boolean(e.target.checked))
  }

  function handleOnChangeFaturaAtual(e, id: string) {
    putFaturaAtual(id, e.target.checked)
  }

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
              <th>Atual</th>
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
                  <td className="title">
                    <Checkbox
                      value={fatura.fechada}
                      checked={fatura.fechada}
                      onChange={(e) => handleOnChangeFaturaFechada(e, fatura.id)} />
                  </td>
                  <td className="title">
                    <Checkbox
                      value={fatura.atual}
                      checked={fatura.atual}
                      onChange={(e) => handleOnChangeFaturaAtual(e, fatura.id)} />
                  </td>
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
