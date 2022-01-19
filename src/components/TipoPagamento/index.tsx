import { Header } from "../Header";
import { Table } from "../TipoPagamento/Table";
import { Title } from "../TipoPagamento/Title";

import { Container } from "./styles";
import { usePrincipal } from "../../hooks/usePrincipal";

export function TipoPagamento() {

  const { 
    handleOpenNewTransactionModal,
    handleOpenTransaction,
    handleOpenFatura, 
    handleOpenTipoPagamento} = usePrincipal();

  return (
    <>
      <Header 
            onOpenNewTransactionModal={handleOpenNewTransactionModal}
            onOpenTransaction={handleOpenTransaction}
            onOpenFatura={handleOpenFatura}
            onOpenTipoPagamento={handleOpenTipoPagamento}
            showButtonNewTransaction={false}
            showButtonTransacction={true} 
            showButtonFatura={true} 
            showButtonTipoPagamento={false} 
          />
      <Container>
        <Title />
        <Table />
      </Container>
      </>
  );
}
