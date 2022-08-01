import { useTransactions } from "../../../hooks/useTransactions";

import { FiTrash, FiTrash2 } from "react-icons/fi";

import { Container, Search, Barra, Total, ContentTable } from "./styles";
import { useEffect, useState } from "react";

import { Checkbox } from "@material-ui/core";

import { Transaction } from '../../../types';

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

  const [headerChecked, setHeaderChecked] = useState(true);

  useEffect(() => {
    setItemsByFaturaOrTipoPagamento();
  }, [activeTransaction, transactionsByFatura, transactionsByTipoPagamento])

  function setItemsByFaturaOrTipoPagamento() {
    if (activeTransaction === "fatura") {
      IniciarHeaderChecked(transactionsByFatura);
      setItems(transactionsByFatura);
      SumTransactions(transactionsByFatura);
    }
    else {
      IniciarHeaderChecked(transactionsByTipoPagamento);
      setItems(transactionsByTipoPagamento);
      SumTransactions(transactionsByTipoPagamento);
    }

  }

  function IniciarHeaderChecked(array: Transaction[]) {
    if (array != undefined && array.length > 0) {
      let existeTransacaoNaoSelecionada = true;

      array.forEach(transacao => {
        if (!transacao.estaSelecionado) {
          setHeaderChecked(false);
          existeTransacaoNaoSelecionada = false;
          return false;
        }
      });
      if (existeTransacaoNaoSelecionada)
        setHeaderChecked(true);
    }
  }

  function indexOf(valor: string) {
    return (valor.toLocaleLowerCase().indexOf(paramPesquisa.toLocaleLowerCase()) > -1);
  }

  function handleKeypress(e) {

    if (e.key === 'Enter') {
      handlePesquisar();
    }
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

        setParamPesquisa("");

      });

      if (arrayItems.length > 0) {
        setItems(arrayItems);
        SumTransactions(arrayItems);
      }

    }
    else {
      setItemsByFaturaOrTipoPagamento();
    }

    const input = document.querySelector("input");
    input.addEventListener("click", function () {
      this.select();
    })
  }

  function SumTransactions(array: Transaction[]) {
    if (array !== undefined && array.length > 0) {
      let sumAmount: number = 0;
      array.forEach(transaction => {
        if (transaction.estaSelecionado)
          sumAmount += Number(transaction.valor);
      });
      setAmount(sumAmount);
    }
    else {
      setAmount(0);
    }
  }

  function handleCheckHeader() {
    setHeaderChecked(!headerChecked);
    items.forEach(item => item.estaSelecionado = !headerChecked);
    setItems(items);
    SumTransactions(items);
  }

  function hanldeCheckedItem(id: string) {
    let newItems: Transaction[] = [];
    let counterFalse: number = 0;

    items.forEach(item => {
      if (item.id === id)
        item.estaSelecionado = !item.estaSelecionado;

      if (!item.estaSelecionado) {
        setHeaderChecked(false);
        counterFalse += 1;
      }

      if (counterFalse === 0)
        setHeaderChecked(true);

      newItems.push(item);

    });

    setItems(newItems);
    SumTransactions(newItems);
  }

  function handleDeleteTransaction(id: string) {
    if (window.confirm('Tem certeza que deseja remover?')) {
      removeTransaction(id);
    }
  }

  return (
    <>
      <Container>
        {items.length > 0 &&
          <Barra>
            <Search className="searchData">
              <input
                placeholder="Escreva o que deseja pesquisar e clique Enter/Ir..."
                value={paramPesquisa}
                onChange={(event) => setParamPesquisa(event.target.value)}
                onKeyPress={handleKeypress}
              />
              <button type="submit" onClick={handlePesquisar} >IR</button>

            </Search>
            <Total className="totalData">
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
                <th><Checkbox
                  checked={headerChecked}
                  onClick={handleCheckHeader} /></th>
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
                    <td><Checkbox
                      value={transaction.estaSelecionado}
                      checked={transaction.estaSelecionado}
                      onClick={() => hanldeCheckedItem(transaction.id)} /></td>
                    <td className="close">
                      <FiTrash2
                        size="18"
                        onClick={() => {
                          handleDeleteTransaction(transaction.id);
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
