import React from 'react';

import { useTiposPagamentos } from "../../../../hooks/useTiposPagamentos";

import { FiTrash, FiTrash2 } from "react-icons/fi";

import { Container } from "./styles";

import { TableStandard } from '../../../TableStandard';

export function Table() {
  const {
    tiposPagamentos,
    removeAllTiposPagamentos,
    removeTipoPagamento
  } = useTiposPagamentos();

  return (
    <Container>
      <TableStandard>
        <table>
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Descrição</th>
              <th>Observação</th>
              <th className="close">
                <FiTrash
                  size="20"
                  onClick={() => {
                    removeAllTiposPagamentos();
                  }}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {tiposPagamentos &&
              tiposPagamentos.map((tpPagamento) => (
                <tr key={tpPagamento.id}>
                  <td>{tpPagamento.codigo}</td>
                  <td>{tpPagamento.descricao}</td>
                  <td>{tpPagamento.observacao}</td>
                  <td className="close">
                    <FiTrash2
                      size="18"
                      onClick={() => {
                        removeTipoPagamento(tpPagamento.id);
                      }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </TableStandard>
    </Container>
  );
}
