


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
    handleOpenFatura, 
    handleOpenTipoPagamento, 
    isNewTransactionModalOpen} = usePrincipal();

  return (
    <>
      <Header 
            onOpenNewTransactionModal={handleOpenNewTransactionModal}
            onOpenTransaction={handleOpenTransaction}
            onOpenFatura={handleOpenFatura}
            onOpenTipoPagamento={handleOpenTipoPagamento}
            showButtonNewTransaction={true}
            showButtonTransacction={false} 
            showButtonFatura={true} 
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