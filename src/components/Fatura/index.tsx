import { useEffect, useState } from "react";
import { Header } from "../Header";
import { Table } from "../Fatura/Table";
import { Title } from "../Fatura/Title";

import { Container } from "./styles";

import { NewFaturaModal } from "./NewFaturaModal";

import { usePrincipal } from "../../hooks/usePrincipal";
import { FaturasProvider } from "../../hooks/useFaturas";

export function Fatura() {

  const {
    handleOpenTransaction,
    handleOpenTipoPagamento,
    handleOpenChart } = usePrincipal();

  const [isNewFaturaModalOpen, setIsNewFaturaModalOpen] = useState(false);

  function handleOpenNewFaturaModal() {
    setIsNewFaturaModalOpen(true);
  }

  function handleCloseNewFaturaModal() {
    setIsNewFaturaModalOpen(false);
  }

  return (
    <FaturasProvider>
      <Header
        onOpenNewTransactionModal={() => { }}
        onOpenNewTipoPagamento={() => { }}
        onOpenNewFatura={handleOpenNewFaturaModal}
        onOpenFatura={() => { }}
        onOpenChart={handleOpenChart}
        onOpenTransaction={handleOpenTransaction}
        onOpenTipoPagamento={handleOpenTipoPagamento}
        showButtonNewTransaction={false}
        showButtonChart={true}
        showButtonTransacction={true}
        showButtonNewFatura={true}
        showButtonFatura={false}
        showButtonNewTipoPagamento={false}
        showButtonTipoPagamento={true}
      />
      <Container>
        <Title />
        <Table />
      </Container>
      <NewFaturaModal
        isOpen={isNewFaturaModalOpen}
        onRequestClose={handleCloseNewFaturaModal}
      />
    </FaturasProvider>
  );
}
