
import { Header } from "../Header";
import { Table } from "../Fatura/Table";
import { Title } from "../Fatura/Title";

import { Container } from "./styles";
import { usePrincipal } from "../../hooks/usePrincipal";

export function Fatura() {

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
            showButtonNewFatura={true}
            showButtonFatura={false} 
            showButtonNewTipoPagamento={false}
            showButtonTipoPagamento={true} 
          />
      <Container>
        <Title />
        <Table />
      </Container>
      </>
  );
}
