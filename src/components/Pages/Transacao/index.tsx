import React, { useEffect } from 'react';

import { useState } from "react";
import { Header } from "../../_Comum/Header";
import { Table } from "../Transacao/Table";
import { Summary } from "./Summary";
import { NewTransactionModal } from "../../../components/Pages/Transacao/NewTransactionModal";

import { usePrincipal } from "../../../hooks/usePrincipal";
import { Container } from "./styles";
import { Transaction } from '../../../types';
import { useTransactions } from '../../../hooks/useTransactions';

export function Transacao() {



  const {
    atualizarTransacaoEditar, transacaoEditar
  } = useTransactions();

  useEffect(() => {
  }, [transacaoEditar])

  const {
    handleOpenChart,
    handleOpenTransaction,
    handleOpenFatura,
    handleOpenTipoPagamento } = usePrincipal();

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    atualizarTransacaoEditar(null);
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    atualizarTransacaoEditar(null);
    setIsNewTransactionModalOpen(false);
  }

  function handleAbrirModalTransacaoModoEdicao(transacao: Transaction) {
    atualizarTransacaoEditar(transacao);
    setIsNewTransactionModalOpen(true);
  }

  return (

    <>
      <Header
        onOpenNewTransactionModal={handleOpenNewTransactionModal}
        onOpenChart={handleOpenChart}
        onOpenTransaction={handleOpenTransaction}
        onOpenNewFatura={() => { }}
        onOpenFatura={handleOpenFatura}
        onOpenNewTipoPagamento={() => { }}
        onOpenTipoPagamento={handleOpenTipoPagamento}
        showButtonNewTransaction={true}
        showButtonChart={true}
        showButtonTransacction={false}
        showButtonNewFatura={false}
        showButtonFatura={true}
        showButtonNewTipoPagamento={false}
        showButtonTipoPagamento={true}
      />
      <Container>
        <Summary />
        <Table AbrirModalTransacaoModoEdicao={handleAbrirModalTransacaoModoEdicao} />
      </Container>

      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </>
  );
}