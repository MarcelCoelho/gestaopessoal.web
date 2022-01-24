import { useState } from "react";
import { Header } from "../Header";
import { Table } from "../Fatura/Table";
import { Title } from "../Fatura/Title";

import { Container } from "./styles";

import { NewFaturaModal } from "./NewFaturaModal";

import { usePrincipal } from "../../hooks/usePrincipal";
import { FaturasProvider } from "../../hooks/useFaturas";

export function Fatura() {

  const { 
    handleOpenNewTransactionModal,
    handleOpenTransaction,
    handleOpenTipoPagamento} = usePrincipal();

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
            onOpenNewTransactionModal={handleOpenNewTransactionModal}
            onOpenTransaction={handleOpenTransaction}
            onOpenNewFatura={handleOpenNewFaturaModal}
            onOpenFatura={() => {}}
            onOpenNewTipoPagamento={handleOpenTipoPagamento}
            onOpenTipoPagamento={handleOpenTipoPagamento}
            showButtonNewTransaction={false}
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
