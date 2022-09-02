
import React from 'react';
import { useTransactions } from '../../hooks/useTransactions';

import { Component } from "./styles";

import { TotalFatura } from '../../types';
import { useFaturas } from '../../hooks/useFaturas';

interface Props {
  totalFatura: TotalFatura;
}

export function SumByPaymentType({ totalFatura }: Props) {

  const { transactionsByFatura, getTransactionsByTipoPagamento } = useTransactions();
  const { updateTipoPagamentoOn, tipoPagamentoOn } = useFaturas();

  function handleDivTipoPagamento(id: string) {
    getTransactionsByTipoPagamento(transactionsByFatura[0].fatura.observacao, id);
    updateTipoPagamentoOn(totalFatura.descricao);
  }

  return (
    <>
      {totalFatura && (
        <Component
          key={totalFatura.id}
          fechada={totalFatura.fechada}
          atual={totalFatura.atual}
          active={tipoPagamentoOn === totalFatura.descricao ? true : false}

          onClick={() => { handleDivTipoPagamento(totalFatura.id) }}>

          <div className='header'>
            <p>{totalFatura.descricao}</p>
            <span>{totalFatura.quantidade}</span>
          </div>
          <div className='footer' >
            {new Intl.NumberFormat("pt-Br", {
              style: "currency",
              currency: "BRL",
            }).format(totalFatura.total)}
          </div>

        </Component>
      )}
    </>
  );
}