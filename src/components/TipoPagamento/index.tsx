import {
  useState
} from "react";

import { Header } from "../Header";
import { Table } from "../TipoPagamento/Table";
import { Title } from "../TipoPagamento/Title";
import { NewTipoPagamentoModal } from "../../components/TipoPagamento/NewTipoPagamentoModal";

import { Container } from "./styles";
import { usePrincipal } from "../../hooks/usePrincipal";
import { TiposPagamentosProvider } from "../../hooks/useTiposPagamentos";

export function TipoPagamento() {

  const { 
    handleOpenNewTransactionModal,
    handleOpenTransaction,
    handleOpenNewFaturaModal,
    handleOpenFatura,
    handleOpenTipoPagamento} = usePrincipal();

  const [isNewTipoPagamentoModalOpen, setIsNewTipoPagamentoModalOpen] = useState(false);
   
  function handleOpenNewTipoPagamentoModal() {
    setIsNewTipoPagamentoModalOpen(true);
  } 

  function handleCloseNewTipoPagamentoModal() {
    setIsNewTipoPagamentoModalOpen(false);
  }

  return ( 
    <TiposPagamentosProvider>
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
      <NewTipoPagamentoModal
        isOpen={isNewTipoPagamentoModalOpen}
        onRequestClose={handleCloseNewTipoPagamentoModal}
      />
    </TiposPagamentosProvider>
  );
}
