import React from 'react';

import { useState } from "react";
import { Header } from "../../_Comum/Header";
import { Table } from "../Transacao/Table";
import { Summary } from "./Summary";
import { NewTransactionModal } from "../../../components/Pages/Transacao/NewTransactionModal";

import { usePrincipal } from "../../../hooks/usePrincipal";
import { Container } from "./styles";

export function Transacao() {

  const {
    handleOpenChart,
    handleOpenTransaction,
    handleOpenFatura,
    handleOpenTipoPagamento } = usePrincipal();

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (

    <>
      {console.log('transacao')}
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
        <Table />
      </Container>

      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </>
  );
}