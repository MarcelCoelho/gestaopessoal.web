import { useTransactions } from '../../../hooks/useTransactions';
import { useFaturas } from '../../../hooks/useFaturas';
import { TotalByTipoPagamento } from '../../../components/TotalByTipoPagamento';

import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';

import { Content, Component } from "./styles";
import { useEffect, useState } from 'react';

interface TotalFatura {
  descricao: string,
  inicio: Date,
  fim: Date,
  fechada: boolean,
  atual: boolean,
  orden: number,
  quantidade: number,
  total: number
};

export function Summary() {
  const { transactionsByFatura, getTransactionsByFatura } = useTransactions();
  const { faturas } = useFaturas();

  const [items, setItems] = useState<TotalFatura[]>([]);
  const [itemSelecionado, setItemSelecionado] = useState("");

  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    getTotalPorFatura();
  }, [transactionsByFatura])

  let arrayAgrupadoPorFatura: TotalFatura[] = [];
  let faturaAnterior1: TotalFatura;
  let faturaAnterior2: TotalFatura;
  let faturaProxima: TotalFatura;

  function arrayByFatura() {
    faturas.forEach(fatura => {
      const descricao = fatura.observacao;
      const inicio = fatura.dataInicio;
      const fim = fatura.dataFinal;
      const fechada = fatura.fechada;
      const atual = fatura.atual;
      const orden = fatura.orden;

      let item: TotalFatura = {
        descricao,
        inicio,
        fim,
        fechada,
        atual,
        orden,
        quantidade: 0,
        total: 0
      };

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
        if (arr.orden === faturaAtual[0].orden - 1) {
          faturaAnterior1 = {
            inicio: arr.inicio,
            fim: arr.fim,
            atual: arr.atual,
            descricao: arr.descricao,
            fechada: arr.fechada,
            orden: arr.orden,
            quantidade: arr.quantidade,
            total: arr.total
          }
        }
        else if (arr.orden === faturaAtual[0].orden - 2) {
          faturaAnterior2 = {
            inicio: arr.inicio,
            fim: arr.fim,
            atual: arr.atual,
            descricao: arr.descricao,
            fechada: arr.fechada,
            orden: arr.orden,
            quantidade: arr.quantidade,
            total: arr.total
          }
        }
      });

      arrayAgrupadoPorFatura.forEach(arr => {
        if (arr.orden > faturaAtual[0].orden && arr.orden <= faturaAtual[0].orden + 3) {
          arrayFiltrado.push(arr);
        }
        else if (arr.orden == faturaAtual[0].orden + 4) {
          faturaProxima = {
            inicio: arr.inicio,
            fim: arr.fim,
            atual: arr.atual,
            descricao: arr.descricao,
            fechada: arr.fechada,
            orden: arr.orden,
            quantidade: arr.quantidade,
            total: arr.total
          }
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
      setFiltro(null);
      setItemSelecionado(null);
      getTransactionsByFatura(null);
    }
    else {
      setFiltro(descricao);
      setItemSelecionado(descricao);
      getTransactionsByFatura(descricao);
    }
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

  return (
    <>
      <Content>

        <button onClick={handlePrevious}>
          <span>{'<'}</span>
        </button>

        {items.length > 0 &&
          items.map((item) => (
            <Component fechada={item.fechada} atual={item.atual} key={item.descricao} onClick={() => handleDivFatura(item.descricao)}>
              <div>
                <header>
                  <p>{item.descricao}</p>
                </header>
                <main>
                  <p> {new Intl.DateTimeFormat().format(new Date(item.inicio))}-{new Intl.DateTimeFormat().format(new Date(item.fim))}   </p>
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

        {!filtro &&
          <button onClick={handleNext}>
            <span>{'>'}</span>
          </button>
        }
        {itemSelecionado &&
          (
            <TotalByTipoPagamento />
          )}
      </Content>
    </>
  );
}
