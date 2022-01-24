import { useTransactions } from "../../../hooks/useTransactions";

import { FiTrash, FiTrash2 } from "react-icons/fi";

import { Container } from "./styles";

export function Table() {
  const {
    transactions,
    removeTransaction,
    removeAllTransactions,
  } = useTransactions();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Fatura</th>
            <th>Produto</th>
            <th>Loja</th>
            <th>Local</th>
            <th>Parcelas</th>
            <th>Forma Pagto</th>
            <th>Valor</th>
            <th>Observação</th>
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
          {transactions &&
            transactions.map((transaction) => (
              <tr key={transaction.id}>
              <td>
                  {new Intl.DateTimeFormat().format(
                    new Date(transaction.data)
                  )}
                </td>
                <td>{transaction.fatura.observacao}</td>
                <td>{transaction.produto}</td>
                <td>{transaction.loja}</td>
                <td>{transaction.local}</td>
                <td>{(transaction.numeroParcela !== 0 && (transaction.numeroParcela + "/" + transaction.quantidadeParcelas))}</td>
                <td>{transaction.tipoPagamento.descricao}</td>
                <td>{new Intl.NumberFormat("pt-Br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(transaction.valor))}</td>
                <td>{transaction.observacao}</td>
                <td>
                  <FiTrash2
                    size="18"
                    onClick={() => {
                      removeTransaction(transaction.id);
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
