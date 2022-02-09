
import { useState, useEffect } from 'react';
import { useTiposPagamentos } from '../../hooks/useTiposPagamentos';
import { useTransactions } from '../../hooks/useTransactions';

import { Container, Component, Header, Footer } from "./styles";

interface TotalFatura {
  id: string,
  descricaoTipoPagamento: string,
  quantidade: number;
  total: number,
  fechada: boolean,
  atual: boolean,
  orden: number
};

export function TotalByTipoPagamento() {

  const [items, setItems] = useState<TotalFatura[]>([]);

  const { transactionsByFatura, getTransactionsByTipoPagamento } = useTransactions();
  const { tiposPagamentos } = useTiposPagamentos();

  useEffect(() => {
    getTotalByTipoPagamento();
  }, [transactionsByFatura])

  let agrupadorFaturaByTipoPagamento: TotalFatura[] = [];

  function getTotalByTipoPagamento() {

    tiposPagamentos.forEach(tp => {

      let item: TotalFatura = {
        id: tp.id,
        descricaoTipoPagamento: tp.descricao,
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
      setItems(agrupadorFaturaByTipoPagamento);
    }
    else
      setItems([]);

  }

  function handleDivTipoPagamento(id: string) {
    getTransactionsByTipoPagamento(transactionsByFatura[0].fatura.observacao, id);
  }

  return (
    <>
      <Container>
        {items &&
          items.map((item) => (
            <Component
              key={item.id}
              fechada={item.fechada}
              atual={item.atual}
              onClick={() => { handleDivTipoPagamento(item.id) }}>
              <div className='header'>
                <p>{item.descricaoTipoPagamento}</p>
                <span>{item.quantidade}</span>
              </div>
              <div className='footer' >
                {new Intl.NumberFormat("pt-Br", {
                  style: "currency",
                  currency: "BRL",
                }).format(item.total)}
              </div>
            </Component>
          ))}
      </Container>
    </>
  );
}