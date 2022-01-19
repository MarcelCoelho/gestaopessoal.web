import { useTransactions } from "../../../hooks/useTransactions";

import { FiTrash, FiTrash2 } from "react-icons/fi";

import { Container } from "./styles";

export function Table() {
  const {
    tiposPagamentos,
    removeAllTransactions,
    removeTransaction
  } = useTransactions();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Descrição</th>
            <th>
              <FiTrash
                size="20"
                onClick={() => {
                  removeAllTransactions();
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
                <td>
                  <FiTrash2
                    size="18"
                    onClick={() => {
                      removeTransaction(tpPagamento.id);
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
