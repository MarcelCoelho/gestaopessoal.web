import { useTransactions } from "../../hooks/useTransactions";

import { FiTrash, FiTrash2 } from "react-icons/fi";

import { Container } from "./styles";

export function TransactionTable() {
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
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
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
                <td>{transaction.title}</td>
                <td className={transaction.type}>
                  {transaction.type === "withdraw" ? "-" : ""}
                  {new Intl.NumberFormat("pt-Br", {
                    style: "currency",
                    currency: "BRL",
                  }).format(transaction.amount)}
                </td>
                <td>{transaction.category}</td>
                <td>
                  {new Intl.DateTimeFormat().format(
                    new Date(transaction.createdAt)
                  )}
                </td>
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
