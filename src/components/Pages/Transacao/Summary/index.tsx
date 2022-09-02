import React from 'react';

import { useEffect, useState } from 'react';

import { Content, Component, ContentTipoPagamento } from "./styles";

import { useTransactions } from '../../../../hooks/useTransactions';
import { useFaturas } from '../../../../hooks/useFaturas';
import { useTiposPagamentos } from '../../../../hooks/useTiposPagamentos';
import { SumByPaymentType } from '../../../../components/SumByPaymentType';

import { Transaction, TotalFatura } from '../../../../types';

export function Summary() {
  const { faturas, updateTipoPagamentoOn } = useFaturas();
  const { transactions, gravarTransacoesPorFatura, gravarTransacoesPorTipoPagamento } = useTransactions();
  const { tiposPagamentos } = useTiposPagamentos();

  const [items, setItems] = useState<TotalFatura[]>([]);
  const [itemSelecionado, setItemSelecionado] = useState("");

  const [itemsPagamentos, setItemsPagamentos] = useState<TotalFatura[]>([]);

  const [filtro, setFiltro] = useState(false);

  const [transactionsByFatura, setTransactionsByFatura] = useState<Transaction[]>([]);

  useEffect(() => {
    get();
  }, [transactions, faturas, tiposPagamentos])

  async function get() {
    filtrarTransactionsByFatura('', false);
    getTotalPorFatura([]);
  }

  function filtrarTransactionsByFatura(descricaoFatura: string, ativo: boolean) {

    setTransactionsByFatura([]);

    if (descricaoFatura !== null && descricaoFatura !== undefined && descricaoFatura !== '') {
      var array: Transaction[] = [];

      const dataAtual = new Date();
      array = transactions.filter(function (transaction) {
        transaction.fatura.atual =
          (dataAtual >= new Date(transaction.fatura.dataInicio) &&
            dataAtual < new Date(transaction.fatura.dataFinal));
        return transaction.fatura.observacao === descricaoFatura;
      });

      setTransactionsByFatura(array);
      getTotalByTipoPagamento(array, ativo);
      getTotalPorFatura(array);
      gravarTransacoesPorFatura(array);
      gravarTransacoesPorTipoPagamento(array);
    }
    else {
      setTransactionsByFatura(transactions);
      getTotalByTipoPagamento(transactions, ativo);
      getTotalPorFatura(transactions);
      gravarTransacoesPorFatura(transactions);
      gravarTransacoesPorTipoPagamento(transactions);
    }
  }

  function getArrayByFatura(array: Transaction[]) {

    let arrayAgrupadoPorFatura: TotalFatura[] = [];
    let idNumber = 1;
    faturas.forEach(fatura => {
      const descricao = fatura.observacao;
      const inicio = fatura.dataInicio;
      const fim = fatura.dataFinal;
      const fechada = fatura.fechada;
      const atual = fatura.atual;
      const ordem = fatura.ordem;

      let item: TotalFatura = {
        id: (idNumber).toString(),
        descricao,
        inicio,
        fim,
        fechada,
        atual,
        ordem,
        quantidade: 0,
        total: 0
      };

      idNumber++;

      let arrayTransactions: Transaction[] = [];
      if (array !== null && array.length > 0)
        arrayTransactions = array;
      else if (transactionsByFatura != null && transactionsByFatura.length > 0)
        arrayTransactions = transactionsByFatura
      else
        arrayTransactions = transactions;

      arrayTransactions.forEach(transaction => {
        if (transaction.fatura.observacao === item.descricao) {
          item.total += Number(transaction.valor);
          item.quantidade += 1;
        }
      })

      if (item.total > 0)
        arrayAgrupadoPorFatura.push(item);

    });

    return arrayAgrupadoPorFatura;
  }

  function getArrayOrdenado(array: TotalFatura[]) {
    let arrayFiltrado: TotalFatura[] = [];

    if (array && array.length > 1) {

      const faturaAtual: TotalFatura[] = array.filter(arr => {
        return (arr.atual === true);
      });

      if (faturaAtual !== undefined && faturaAtual.length > 0) {
        const faturaAnteriorAtual: TotalFatura[] = array.filter(arr => {
          return (arr.ordem === faturaAtual[0].ordem - 1);
        });

        array.forEach(arr => {
          if (arr.ordem > faturaAtual[0].ordem && arr.ordem <= faturaAtual[0].ordem + 3) {
            arrayFiltrado.push(arr);
          }
        });

        if (faturaAtual[0] !== undefined)
          arrayFiltrado.unshift(faturaAtual[0]);

        if (faturaAnteriorAtual !== undefined && faturaAnteriorAtual.length > 0)
          arrayFiltrado.unshift(faturaAnteriorAtual[0]);
      }
      array = []
      array = arrayFiltrado;
      return array;
    }
    return array;
  }

  function getTotalPorFatura(array: Transaction[]) {

    const resultadoArray = getArrayByFatura(array);
    const arrayOrdenado = getArrayOrdenado(resultadoArray);

    setItems([]);
    setItems(arrayOrdenado);

  }

  function handleDivFatura(descricao: string) {
    if (itemSelecionado === descricao) {
      setFiltro(false);
      setItemSelecionado('');
      filtrarTransactionsByFatura('', false);
    }
    else {
      setFiltro(true);
      setItemSelecionado(descricao);
      filtrarTransactionsByFatura(descricao, true);
    }

    updateTipoPagamentoOn('');
  }

  /*function handleNext() {

    let array: TotalFatura[] = [...items];

    const lastArray = array[array.length - 1];
    arrayByFatura();

    const nextArray = arrayAgrupadoPorFatura.filter(fat => {
      return fat.orden === lastArray.orden + 1;
    });

    if (nextArray !== undefined && nextArray[0] !== undefined) {
      array.shift();
      array.push(nextArray[0]);

      setItems([]);
      setItems(array);
    }
  }*/

  function handleBuscarProximaFatura() {
    //let array: TotalFatura[] = [...items];

    //const ultimaFaturaListada = array[array.length - 1];
    //const mes = ultimaFaturaListada.ordem.toString();
    //const ano = ultimaFaturaListada.descricao.split('/')[1];

    // getTransactionsByFatura(mes, ano);
  }

  function handleBuscarFaturaAnterior() {
    //let array: TotalFatura[] = [...items];

    //const primeiraFaturaListada = array[0];
    //const mes = primeiraFaturaListada.ordem;
    //const ano = primeiraFaturaListada.descricao.split('/')[1];
  }

  /*function handlePrevious() {
    let array: TotalFatura[] = [];
    array = [...items];

    const lastArray = array[0];
    arrayByFatura();

    const previousArray = arrayAgrupadoPorFatura.filter(fat => {
      return fat.orden === lastArray.orden - 1;
    });

    if (previousArray !== undefined && previousArray[0] !== undefined) {
      array.unshift(previousArray[0]);
      array.pop();

      setItems([]);
      setItems(array);
    }
  }*/

  function getTotalByTipoPagamento(array: Transaction[], ativo: boolean) {
    setItemsPagamentos([]);
    let agrupadorFaturaByTipoPagamento: TotalFatura[] = [];

    tiposPagamentos.forEach(tp => {

      let item: TotalFatura = {
        id: tp.id,
        fim: new Date(),
        inicio: new Date(),
        descricao: tp.descricao,
        quantidade: 0,
        total: 0,
        fechada: false,
        atual: false,
        ordem: 0
      };

      array.forEach(transaction => {
        if (transaction.tipoPagamentoId === item.id) {
          item.total += Number(transaction.valor);
          item.quantidade += 1;
          item.atual = transaction.fatura.atual;
          item.fechada = transaction.fatura.fechada;
        }
      })

      if (item !== undefined && item.total > 0)
        agrupadorFaturaByTipoPagamento.push(item);
    });

    if (agrupadorFaturaByTipoPagamento.length > 0) {
      agrupadorFaturaByTipoPagamento.sort((a, b) => Number(b.total) - Number(a.total));

      if (ativo === true)
        setItemsPagamentos(agrupadorFaturaByTipoPagamento);
    }
  }

  return (

    <Content className="contentSummary">

      {items.length > 0 &&
        <button onClick={handleBuscarFaturaAnterior}>
          <span>{'<'}</span>
        </button>
      }
      {items.length > 0 && items.map((item) => (
        <Component
          className="componentSummary"
          fechada={item.fechada}
          atual={item.atual}
          active={filtro}
          key={item.descricao}
          onClick={() => handleDivFatura(item.descricao)}>
          <div>
            <header>
              <p>{item.descricao}</p>
            </header>
            <main>
              <p>
                {new Intl.DateTimeFormat().format(new Date(item.inicio))}-
                {new Intl.DateTimeFormat().format(new Date(item.fim))}
              </p>
            </main>
            <footer>
              {new Intl.NumberFormat("pt-Br", {
                style: "currency",
                currency: "BRL",
              }).format(item.total)}
            </footer>
            <strong>{item.quantidade}</strong>
          </div>
        </Component>
      ))}

      {items.length > 0 && !filtro &&
        <button onClick={handleBuscarProximaFatura}>
          <span>{'>'}</span>
        </button>
      }

      <ContentTipoPagamento>
        {itemsPagamentos.length > 0 &&
          itemsPagamentos.map((totalFatura) => (
            <SumByPaymentType key={totalFatura.id} totalFatura={totalFatura} />
          ))}
      </ContentTipoPagamento>
    </Content>

  );
}
