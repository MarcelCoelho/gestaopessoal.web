import { useState } from "react";
import { Header } from "../Header";
import { Table } from "../Transactions/Table";
import { Summary } from "./Summary";
import { NewTransactionModal } from "../../components/Transactions/NewTransactionModal";

import { usePrincipal } from "../../hooks/usePrincipal";
import { TransactionsProvider } from "../../hooks/useTransactions";
import { TiposPagamentosProvider } from "../../hooks/useTiposPagamentos";
import { FaturasProvider } from "../../hooks/useFaturas";
import { Container } from "./styles";

export function Transactions() {

  const {
    handleOpenTransaction,
    handleOpenFatura,
    handleOpenTipoPagamento } = usePrincipal();

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <>
      <FaturasProvider>
        <TiposPagamentosProvider>
          <TransactionsProvider>


            <Header
              onOpenNewTransactionModal={handleOpenNewTransactionModal}
              onOpenTransaction={handleOpenTransaction}
              onOpenNewFatura={() => { }}
              onOpenFatura={handleOpenFatura}
              onOpenNewTipoPagamento={() => { }}
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

          </TransactionsProvider>
        </TiposPagamentosProvider>
      </FaturasProvider>
    </>
  );
}