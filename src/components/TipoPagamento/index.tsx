
import { Header } from "../Header";
import { Table } from "../TipoPagamento/Table";
import { Title } from "../TipoPagamento/Title";

import { Container } from "./styles";
import { usePrincipal } from "../../hooks/usePrincipal";

export function TipoPagamento() {

  const { 
    handleOpenNewTransactionModal, 
    handleCloseNewTransactionModal, 
    handleOpenFatura, 
    handleOpenTipoPagamento, 
    isNewTransactionModalOpen, 
    isOpenFautra, 
    isOpenTipoPagamento} = usePrincipal();

  return (
    <>
      <Header 
            onOpenNewTransactionModal={handleOpenNewTransactionModal} 
            onOpenFatura={handleOpenFatura}
            onOpenTipoPagamento={handleOpenTipoPagamento}
            showButtonTransacction={true} 
            showButtonFatura={isOpenFautra} 
            showButtonTipoPagamento={isOpenFautra} 
          />
      <Container>
        <Title />
        <Table />
      </Container>
      </>
  );
}
