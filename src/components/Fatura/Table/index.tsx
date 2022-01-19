import { useTransactions } from "../../../hooks/useTransactions";

import { FiTrash, FiTrash2 } from "react-icons/fi";

import { Container } from "./styles";

export function Table() {
  const {
    faturas,
    removeAllTransactions,
    removeTransaction
  } = useTransactions();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Período</th>
            <th>De</th>
            <th>Até</th>
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
          {faturas &&
            faturas.map((fatura) => (
              <tr key={fatura.id}>
                <td>{fatura.observacao}</td>               
                <td>{fatura.mes + "/" + fatura.ano }</td>
                <td>{new Intl.DateTimeFormat().format(
                    new Date(fatura.dataInicio)
                  )}</td>
               <td>{new Intl.DateTimeFormat().format(
                    new Date(fatura.dataFinal)
                  )}</td>    
                <td>
                  <FiTrash2
                    size="18"
                    onClick={() => {
                      removeTransaction(fatura.id);
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
