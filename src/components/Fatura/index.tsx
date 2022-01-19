
import { Header } from "../Header";
import { Table } from "../Fatura/Table";
import { Title } from "../Fatura/Title";

import { Container } from "./styles";
import { usePrincipal } from "../../hooks/usePrincipal";

export function Fatura() {

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
            showButtonFatura={false} 
            showButtonTipoPagamento={true} 
          />
      <Container>
        <Title />
        <Table />
      </Container>
      </>
  );
}
