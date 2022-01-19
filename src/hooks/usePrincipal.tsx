import {
    createContext,
    useEffect,
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
    handleOpenFatura: () => void;
    handleOpenTipoPagamento: () => void;
    isNewTransactionModalOpen: boolean;
    isOpenFautra: boolean;
    isOpenTipoPagamento: boolean;
  }
  
  const PrincipalContext = createContext<PrincipalContextData>(
    {} as PrincipalContextData
  );
  
  export function PrincipalProvider({ children }: PrincipalProviderProps) { 
    
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(
        false
      );
    
      const [isOpenFautra, setOpenFatura] = useState( true  );
      const [isOpenTipoPagamento, setOpenTipoPagamento] = useState( true  );
    
      function handleOpenNewTransactionModal() {
        setIsNewTransactionModalOpen(true);
      }
    
      function handleCloseNewTransactionModal() {
        setIsNewTransactionModalOpen(false);
      }
    
    function handleOpenFatura() {
      setOpenFatura(false);
      setOpenTipoPagamento(true);
    }
    
    function handleOpenTipoPagamento() {
      setOpenFatura(true);
      setOpenTipoPagamento(false);
    }
  
    return (
      <PrincipalContext.Provider
        value={{
            handleOpenNewTransactionModal,
            handleCloseNewTransactionModal,
            handleOpenFatura,
            handleOpenTipoPagamento,
            isNewTransactionModalOpen,
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
  