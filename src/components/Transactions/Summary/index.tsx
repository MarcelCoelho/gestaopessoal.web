import incomeImg from "../../../assets/income.svg";
import outcomeImg from "../../../assets/outcome.svg";
import totalImg from "../../../assets/total.svg";

import { useTransactions } from '../../../hooks/useTransactions';

import { Container } from "./styles";

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce(
    (acc, transaction) => {
     /* if (transaction.tipoPagamento.descricao === "Crédito") {
        acc.deposits += Number(transaction.valor);
        acc.total += Number(transaction.valor);
      } else {
        acc.withdraw += Number(transaction.valor);
        acc.total -= Number(transaction.valor);
      }*/

      acc.total += Number(transaction.valor);

      return acc;
    },
    {
      deposits: 0,
      withdraw: 0,
      total: 0,
    }
  );

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="" />
        </header>
        <strong>
          {new Intl.NumberFormat("pt-Br", {
            style: "currency",
            currency: "BRL",
          }).format(0)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saidas</p>
          <img src={outcomeImg} alt="" />
        </header>
        <strong>
          -{" "}
          {new Intl.NumberFormat("pt-Br", {
            style: "currency",
            currency: "BRL",
          }).format(0)}
        </strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="" />
        </header>
        <strong>
          {new Intl.NumberFormat("pt-Br", {
            style: "currency",
            currency: "BRL",
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  );
}
