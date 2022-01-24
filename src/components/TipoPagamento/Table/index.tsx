import { useTiposPagamentos } from "../../../hooks/useTiposPagamentos";

import { FiTrash, FiTrash2 } from "react-icons/fi";

import { Container } from "./styles";

export function Table() {
  const {
    tiposPagamentos,
    removeAllTiposPagamentos,
    removeTipoPagamento
  } = useTiposPagamentos();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Descrição</th>
            <th>Observação</th>
            <th>
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
                <td>
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
    </Container>
  );
}
