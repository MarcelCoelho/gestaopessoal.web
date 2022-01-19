import { Header } from "../Header";
import { Table } from "../TipoPagamento/Table";
import { Title } from "../TipoPagamento/Title";

import { Container } from "./styles";
import { usePrincipal } from "../../hooks/usePrincipal";

export function TipoPagamento() {

  const { 
    handleOpenNewTransactionModal,
    handleOpenTransaction,
    handleOpenNewFaturaModal,
    handleOpenFatura, 
    handleOpenNewTipoPagamentoModal,
    handleOpenTipoPagamento} = usePrincipal();

  return (
    <>
      <Header 
            onOpenNewTransactionModal={handleOpenNewTransactionModal}
            onOpenTransaction={handleOpenTransaction}
            onOpenNewFatura={handleOpenNewFaturaModal}
            onOpenFatura={handleOpenFatura}
            onOpenNewTipoPagamento={handleOpenNewTipoPagamentoModal}
            onOpenTipoPagamento={handleOpenTipoPagamento}
            showButtonNewTransaction={false}
            showButtonTransacction={true} 
            showButtonNewFatura={false}
            showButtonFatura={true} 
            showButtonNewTipoPagamento={true}
            showButtonTipoPagamento={false} 
          />
      <Container>
        <Title />
        <Table />
      </Container>
      </>
  );
}
