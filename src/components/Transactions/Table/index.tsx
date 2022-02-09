import { useTransactions } from "../../../hooks/useTransactions";

import { FiTrash, FiTrash2 } from "react-icons/fi";

import { Container } from "./styles";
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
  } = useTransactions();

  const [items, setItems] = useState<Transaction[]>([]);

  const [paramPesquisa, setParamPesquisa] = useState("");

  useEffect(() => {
    setItemsByFaturaOrTipoPagamento();

  }, [activeTransaction, transactionsByFatura, transactionsByTipoPagamento])

  function setItemsByFaturaOrTipoPagamento() {
    if (activeTransaction === "fatura")
      setItems(transactionsByFatura);
    else
      setItems(transactionsByTipoPagamento);
  }

  function indexOf(valor: string) {
    return (valor.toLocaleLowerCase().indexOf(paramPesquisa.toLocaleLowerCase()) > -1);
  }

  function handlePesquisar() {

    if (paramPesquisa.trim() !== "") {

      let arrayItems = [];
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

        if (item.valor === paramPesquisa)
          itemEncontrado = true;

        if (new Date(item.data) === new Date(paramPesquisa))
          itemEncontrado = true;

        if (itemEncontrado)
          arrayItems.push(item);

        itemEncontrado = false;

      });

      if (arrayItems.length > 0)
        setItems(arrayItems);

      setParamPesquisa("");
    }
    else {
      setItemsByFaturaOrTipoPagamento();
    }
  }

  function handleHeader(event) {

    switch (event.target.innerText) {
      case "Data":        
        break;
      case "Fatura":
        // code block
        break;
      case "Fatura":
        // code block
        break;
      case "Fatura":
        // code block
        break;
      case "Fatura":
        // code block
        break;
      case "Fatura":
        // code block
        break;
      case "Fatura":
        // code block
        break;
      case "Fatura":
        // code block
        break;
      default:
      // code block
    }

  }

  return (
    <Container>
      <input
        placeholder="Começe a escrever para pesquisar..."
        value={paramPesquisa}
        onChange={(event) => setParamPesquisa(event.target.value)}
      />
      <button type="submit" onClick={handlePesquisar} >IR</button>
      <table>
        <thead>
          <tr onClick={(event) => handleHeader(event)}>
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
          {items &&
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
