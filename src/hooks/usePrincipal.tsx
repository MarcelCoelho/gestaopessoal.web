import {
    createContext,
    useState,
    ReactNode,
    useContext,
  } from "react";
 
  interface PrincipalProviderProps {
    children: ReactNode;
  }
  
  interface PrincipalContextData {
    handleOpenNewTransactionModal: () => void;
    handleCloseNewTransactionModal: () => void;
    handleOpenTransaction: () => void;
    handleOpenNewFaturaModal: () => void;
    handleCloseNewFaturaModal: () => void;
    handleOpenFatura: () => void;
    handleOpenNewTipoPagamentoModal: () => void;
    handleCloseNewTipoPagamentoModal: () => void;
    handleOpenTipoPagamento: () => void;
    isNewTransactionModalOpen: boolean;
    isOpenTransaction: boolean;
    isNewFaturaModalOpen: boolean;
    isOpenFautra: boolean;
    isNewTipoPagamentoModalOpen: boolean;
    isOpenTipoPagamento: boolean;
  }
  
  const PrincipalContext = createContext<PrincipalContextData>(
    {} as PrincipalContextData
  );
  
  export function PrincipalProvider({ children }: PrincipalProviderProps) { 
    
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
    const [isNewFaturaModalOpen, setIsNewFaturaModalOpen] = useState(false);
    const [isNewTipoPagamentoModalOpen, setIsNewTipoPagamentoModalOpen] = useState(false);
    
      const [isOpenTransaction, setOpenTransaction] = useState(false);
      const [isOpenFautra, setOpenFatura] = useState(false);
      const [isOpenTipoPagamento, setOpenTipoPagamento] = useState(false);
    
      function handleOpenNewTransactionModal() {
        setIsNewTransactionModalOpen(true);
      }

      function handleCloseNewTransactionModal() {
        setIsNewTransactionModalOpen(false);
      }

      function handleOpenNewFaturaModal() {
        setIsNewFaturaModalOpen(true);
      }

      function handleCloseNewFaturaModal() {
        setIsNewFaturaModalOpen(false);
      }

      function handleOpenNewTipoPagamentoModal() {
        setIsNewTipoPagamentoModalOpen(true);
      }
    
      function handleCloseNewTipoPagamentoModal() {
        setIsNewTipoPagamentoModalOpen(false);
      }
    
      function handleOpenTransaction() {
        setOpenTransaction(false);
        setOpenFatura(true);
        setOpenTipoPagamento(true);
        setIsNewTransactionModalOpen(false);
      }

      function handleOpenFatura() {
      setOpenTransaction(true);
      setOpenFatura(false);
      setOpenTipoPagamento(true);
      setIsNewTransactionModalOpen(false);
      }
    
      function handleOpenTipoPagamento() {
      setOpenTransaction(true);
      setOpenFatura(true);
      setOpenTipoPagamento(false);
      setIsNewTransactionModalOpen(false);
      }
  
    return (
      <PrincipalContext.Provider
        value={{
            handleOpenNewTransactionModal,
            handleCloseNewTransactionModal,
            handleOpenTransaction,
            handleOpenNewFaturaModal,
            handleCloseNewFaturaModal,
            handleOpenFatura,
            handleOpenNewTipoPagamentoModal,
            handleCloseNewTipoPagamentoModal,
            handleOpenTipoPagamento,
            isNewTransactionModalOpen,
            isOpenTransaction,
            isNewFaturaModalOpen,
            isOpenFautra,
            isNewTipoPagamentoModalOpen,
            isOpenTipoPagamento,
        }}
      >
        {children}
      </PrincipalContext.Provider>
    );
  }
  
  export function usePrincipal() {
    const context = useContext(PrincipalContext);
    return context;
  }
  