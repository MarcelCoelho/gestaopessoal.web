import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { api } from "../services/api";

interface Transaction {
  id:	string;  
  data:	Date;
  produto:	string;
  loja:	string;
  local:	string;
  numeroParcela:	number;
  quantidadeParcelas:	number;
  fatura: {
    observacao: string;
  };
  tipoPagamento: {
    descricao: string;
  };
  valor: string;
  observacao:	string;
  faturaId:	string
  tipoPagamentoId: string;
  usuarioCriacao: string;
  usuarioModificacao: string;
  dataCriacao: Date;
  dataModificacao: Date;
}

type TransactionInput = Omit<Transaction, "id" | "tipoPagamento" | "fatura" | "usuarioCriacao" | "usuarioModificacao" | "dataCriacao" | "dataModificacao">;

interface TransactionProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  removeTransaction: (id: string) => void;
  removeAllTransactions: () => void;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    
    async function getTransacctions() {
      const response = await api.get<Transaction[]>("/items");
      
      setTransactions(response.data);
    }
    getTransacctions();
    
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post("/items", 
    {
      ...transactionInput,
      usuarioCriacao: 'web',
      usuarioModificacao: 'web'
    });

    const { transaction } = response.data;
    
    setTransactions([...transactions, transaction]);
  }

  async function removeTransaction(id: string) {

    await api.delete(`/items/${id}`)

   var array = [...transactions]; // make a separate copy of the array

   array = transactions.filter(function (transaction) {
     return transaction.id !== id;
   });

   setTransactions(array);
 }

  function removeAllTransactions() {
    setTransactions([]);
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        createTransaction,
        removeTransaction,
        removeAllTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  return context;
}
