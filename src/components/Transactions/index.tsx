


import { Header } from "../Header";
import { Table } from "../Transactions/Table";
import { Summary } from "./Summary";
import { NewTransactionModal } from "../../components/Transactions/NewTransactionModal";

import { usePrincipal } from "../../hooks/usePrincipal";
import { Container } from "./styles";

export function Transactions() {
 
  const { 
    handleOpenNewTransactionModal,
    handleCloseNewTransactionModal,
    handleOpenTransaction,
    handleOpenNewFaturaModal,
    handleOpenFatura, 
    handleOpenNewTipoPagamentoModal,
    handleOpenTipoPagamento,
    isNewTransactionModalOpen} = usePrincipal();

  return (
    <>
      <Header 
            onOpenNewTransactionModal={handleOpenNewTransactionModal}
            onOpenTransaction={handleOpenTransaction}
            onOpenNewFatura={handleOpenNewFaturaModal}
            onOpenFatura={handleOpenFatura}
            onOpenNewTipoPagamento={handleOpenNewTipoPagamentoModal}
            onOpenTipoPagamento={handleOpenTipoPagamento}
            showButtonNewTransaction={true}
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