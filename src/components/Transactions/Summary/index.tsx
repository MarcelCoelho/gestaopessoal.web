import { useTransactions } from '../../../hooks/useTransactions';
import { useFaturas } from '../../../hooks/useFaturas';
import { useTiposPagamentos } from '../../../hooks/useTiposPagamentos';
import { SumByPaymentType } from '../../../components/SumByPaymentType';


import { Content, Component, ContentTipoPagamento } from "./styles";
import { useEffect, useState } from 'react';

import { TotalFatura } from '../../../types';

export function Summary() {
  const { transactionsByFatura, getTransactionsByFatura } = useTransactions();
  const { faturas, updateTipoPagamentoOn } = useFaturas();
  const { tiposPagamentos } = useTiposPagamentos();

  const [items, setItems] = useState<TotalFatura[]>([]);
  const [itemSelecionado, setItemSelecionado] = useState("");

  const [itemsPagamentos, setItemsPagamentos] = useState<TotalFatura[]>([]);

  const [filtro, setFiltro] = useState(false);

  useEffect(() => {
    getTotalPorFatura();
    getTotalByTipoPagamento();
  }, [transactionsByFatura])

  let arrayAgrupadoPorFatura: TotalFatura[] = [];
  let agrupadorFaturaByTipoPagamento: TotalFatura[] = [];

  function arrayByFatura() {

    let idNumber = 1;
    faturas.forEach(fatura => {
      const descricao = fatura.observacao;
      const inicio = fatura.dataInicio;
      const fim = fatura.dataFinal;
      const fechada = fatura.fechada;
      const atual = fatura.atual;
      const orden = fatura.orden;

      let item: TotalFatura = {
        id: (idNumber).toString(),
        descricao,
        inicio,
        fim,
        fechada,
        atual,
        orden,
        quantidade: 0,
        total: 0
      };

      idNumber++;

      transactionsByFatura.forEach(transaction => {
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

  function arrayOrdenado() {
    let arrayFiltrado = [];

    if (arrayAgrupadoPorFatura.length > 1) {

      const faturaAtual: TotalFatura[] = arrayAgrupadoPorFatura.filter(arr => {
        return (arr.atual === true);
      });

      const faturaAnteriorAtual: TotalFatura[] = arrayAgrupadoPorFatura.filter(arr => {
        return (arr.orden === faturaAtual[0].orden - 1);
      });



      arrayAgrupadoPorFatura.forEach(arr => {
        if (arr.orden > faturaAtual[0].orden && arr.orden <= faturaAtual[0].orden + 3) {
          arrayFiltrado.push(arr);
        }
      });

      if (faturaAtual[0] !== undefined)
        arrayFiltrado.unshift(faturaAtual[0]);

      if (faturaAnteriorAtual !== undefined)
        arrayFiltrado.unshift(faturaAnteriorAtual[0]);

      arrayAgrupadoPorFatura = []
      arrayAgrupadoPorFatura = arrayFiltrado;
    }
  }

  function getTotalPorFatura() {

    arrayByFatura();
    arrayOrdenado();
    setItems(arrayAgrupadoPorFatura);

  }

  function handleDivFatura(descricao: string) {
    if (itemSelecionado === descricao) {
      setFiltro(false);
      setItemSelecionado(null);
      getTransactionsByFatura(null);
    }
    else {
      setFiltro(true);
      setItemSelecionado(descricao);
      getTransactionsByFatura(descricao);
    }
    updateTipoPagamentoOn(null);
  }

  function handleNext() {

    let array: TotalFatura[] = [];
    array = [...items];

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
  }

  function handlePrevious() {
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
  }

  function getTotalByTipoPagamento() {

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
        orden: 0
      };

      transactionsByFatura.forEach(transaction => {
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

      if (filtro)
        setItemsPagamentos(agrupadorFaturaByTipoPagamento);
      else
        setItemsPagamentos([]);
    }
    else
      setItemsPagamentos([]);

  }

  return (

    <Content className="contentSummary">

      {items.length > 0 &&
        <button onClick={handlePrevious}>
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
        <button onClick={handleNext}>
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
