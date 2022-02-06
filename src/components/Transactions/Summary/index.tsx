import { useTransactions } from '../../../hooks/useTransactions';
import { useFaturas } from '../../../hooks/useFaturas';
import { TotalByTipoPagamento } from '../../../components/TotalByTipoPagamento';

import { Content, Component } from "./styles";
import { useEffect, useState } from 'react';

interface TotalFatura {
  descricao: string,
  inicio: Date,
  fim: Date,
  fechada: boolean,
  quantidade: number,
  total: number
};

export function Summary() {
  const { transactionsByFatura, getTransactionsByFatura } = useTransactions();
  const { faturas } = useFaturas();

  const [items, setItems] = useState<TotalFatura[]>([]);
  const [itemSelecionado, setItemSelecionado] = useState("");

  useEffect(() => {
    getTotalPorFatura();
  }, [transactionsByFatura])

  let arrayAgrupadoPorFatura: TotalFatura[] = [];

  function getTotalPorFatura() {

    faturas.forEach(fatura => {
      const descricao = fatura.observacao;
      const inicio = fatura.dataInicio;
      const fim = fatura.dataFinal;
      const fechada = fatura.fechada;

      let item: TotalFatura = {
        descricao,
        inicio,
        fim,
        fechada,
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

    setItems(arrayAgrupadoPorFatura);
  }

  function handleDivFatura(descricao: string) {
    if (itemSelecionado === descricao) {
      setItemSelecionado(null);
      getTransactionsByFatura(null);
    }
    else {
      setItemSelecionado(descricao);
      getTransactionsByFatura(descricao);
    }
  }

  return (
    <>
      <Content>

        {items &&
          items.map((item) => (
            <Component fechada={item.fechada} key={item.descricao} onClick={() => handleDivFatura(item.descricao)}>
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

        {itemSelecionado &&
          (
            <TotalByTipoPagamento />
          )}
      </Content>
    </>
  );
}
