import { useTransactions } from "../../../hooks/useTransactions";

import { FiTrash, FiTrash2 } from "react-icons/fi";

import { Container, Search, Barra, Total, ContentTable } from "./styles";
import { useEffect, useState } from "react";

interface Transaction {
  id: string;
  data: Date;
  produto: string;
  loja: string;
  local: string;
  numeroParcela: number;
  quantidadeParcelas: number;
  fatura: {
    observacao: string;
  };
  tipoPagamento: {
    descricao: string;
  };
  valor: string;
  observacao: string;
  faturaId: string
  tipoPagamentoId: string;
  usuarioCriacao: string;
  usuarioModificacao: string;
  dataCriacao: Date;
  dataModificacao: Date;
}

export function Table() {
  const {
    transactionsByFatura,
    transactionsByTipoPagamento,
    activeTransaction,
    removeTransaction,
    removeAllTransactions,
    errorApi
  } = useTransactions();

  const [items, setItems] = useState<Transaction[]>([]);
  const [paramPesquisa, setParamPesquisa] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    setItemsByFaturaOrTipoPagamento();
  }, [activeTransaction, transactionsByFatura, transactionsByTipoPagamento])

  function setItemsByFaturaOrTipoPagamento() {
    if (activeTransaction === "fatura") {
      setItems(transactionsByFatura);
      SumTransactions(transactionsByFatura);
    }
    else {
      setItems(transactionsByTipoPagamento);
      SumTransactions(transactionsByTipoPagamento);
    }

  }

  function indexOf(valor: string) {
    return (valor.toLocaleLowerCase().indexOf(paramPesquisa.toLocaleLowerCase()) > -1);
  }

  function handlePesquisar() {

    if (paramPesquisa.trim() !== "") {

      let arrayItems: Transaction[] = [];
      let itemEncontrado = false;

      items.forEach((item) => {

        if (indexOf(item.produto))
          itemEncontrado = true;

        if (indexOf(item.loja))
          itemEncontrado = true;

        if (indexOf(item.local))
          itemEncontrado = true;

        if (indexOf(item.observacao))
          itemEncontrado = true;

        if (indexOf(item.tipoPagamento.descricao))
          itemEncontrado = true;

        if (Number(item.valor) === Number(paramPesquisa))
          itemEncontrado = true;

        if (new Date(item.data).getDate() === new Date(paramPesquisa).getDate())
          itemEncontrado = true;

        if (itemEncontrado)
          arrayItems.push(item);

        itemEncontrado = false;

      });

      if (arrayItems.length > 0) {
        setItems(arrayItems);
        SumTransactions(arrayItems);
      }

      setParamPesquisa("");
    }
    else {
      setItemsByFaturaOrTipoPagamento();
    }
  }

  function SumTransactions(array: Transaction[]) {
    if (array !== undefined && array.length > 0) {
      let sumAmount: number = 0;
      array.forEach(transaction => {
        sumAmount += Number(transaction.valor);
      });
      setAmount(sumAmount);
    }
    else {
      setAmount(0);
    }
  }

  return (
    <>
      <Container>
        {items.length > 0 &&
          <Barra>
            <Search>
              <input
                placeholder="Começe a escrever para pesquisar..."
                value={paramPesquisa}
                onChange={(event) => setParamPesquisa(event.target.value)}
              />
              <button type="submit" onClick={handlePesquisar} >IR</button>

            </Search>
            <Total>
              <span>{new Intl.NumberFormat("pt-Br", {
                style: "currency",
                currency: "BRL",
              }).format(Number(amount))}</span>
            </Total>
          </Barra>
        }
        <ContentTable>
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
                <th className="close">
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
              {items.length > 0 ? (
                items.map((transaction) => (
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
                    <td className="obs">{transaction.observacao}</td>
                    <td className="close">
                      <FiTrash2
                        size="18"
                        onClick={() => {
                          removeTransaction(transaction.id);
                        }}
                      />
                    </td>
                  </tr>
                ))) :
                (<tr>
                  <td>{errorApi}</td>
                  <td>{errorApi}</td>
                  <td>{errorApi}</td>
                  <td>{errorApi}</td>
                  <td>{errorApi}</td>
                  <td>{errorApi}</td>
                  <td>{errorApi}</td>
                  <td>{errorApi}</td>
                  <td>{errorApi}</td>                  
                </tr>)}

            </tbody>
          </table>

        </ContentTable>

      </Container>
    </>
  );
}
