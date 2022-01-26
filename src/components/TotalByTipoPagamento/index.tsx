
import { useState, useEffect } from 'react';
import { useTiposPagamentos } from '../../hooks/useTiposPagamentos';
import { useTransactions } from '../../hooks/useTransactions';

import { Container } from "./styles";

interface TotalFatura {
  id: string,
  descricaoTipoPagamento: string,
  total: number
};

export function TotalByTipoPagamento() {

  const [items, setItems] = useState<TotalFatura[]>([]);

  const { transactionsByFatura } = useTransactions();
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
        total: 0
      };

      transactionsByFatura.forEach(transaction => {
        if (transaction.tipoPagamentoId === item.id) {
          item.total += Number(transaction.valor);
        }
      })

      if (item.total > 0)
        agrupadorFaturaByTipoPagamento.push(item);
    });

    setItems(agrupadorFaturaByTipoPagamento);

  }
  return (
    <>
      {items &&
        items.map((item) => (
          <Container key={item.id}>
            <div className="totalbytipopagamento">
              <div className="header">
                <p>{item.descricaoTipoPagamento}</p>
              </div>
              <div className="footer">
                {new Intl.NumberFormat("pt-Br", {
                  style: "currency",
                  currency: "BRL",
                }).format(item.total)}
              </div>
            </div>
          </Container>
        ))}
    </>
  );
}