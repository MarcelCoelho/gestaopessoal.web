import { Transactions } from "../components/Transactions";
import { Header } from "../components/Header";
import { NewTransactionModal } from "../components/Transactions/NewTransactionModal";
import { usePrincipal } from "../hooks/usePrincipal";

export function Principal() {
 
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
      <Transactions />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
     
    </>
  );
}