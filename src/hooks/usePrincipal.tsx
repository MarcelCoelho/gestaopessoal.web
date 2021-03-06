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
    handleOpenTipoPagamento: () => void;
    isNewTransactionModalOpen: boolean;
    isOpenTransaction: boolean;
    isNewFaturaModalOpen: boolean;
    isOpenFautra: boolean;
    isOpenTipoPagamento: boolean;
  }
  
  const PrincipalContext = createContext<PrincipalContextData>(
    {} as PrincipalContextData
  );
  
  export function PrincipalProvider({ children }: PrincipalProviderProps) { 
    
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
    const [isNewFaturaModalOpen, setIsNewFaturaModalOpen] = useState(false);
   
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
            handleOpenTipoPagamento,
            isNewTransactionModalOpen,
            isOpenTransaction,
            isNewFaturaModalOpen,
            isOpenFautra,
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
  