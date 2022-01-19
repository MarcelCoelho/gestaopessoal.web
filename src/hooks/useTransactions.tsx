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
  tipo:	string
  valor:	number;
  observacao:	string;
  
  faturaId:	string
  tipoPagamentoId: string;
  type?: "deposit" | "withdraw";
  usuarioCriacao: string;
  usuarioModificacao: string;
  dataCriacao: Date;
  dataModificacao: Date;
}

interface Fatura {
  id: string;
  mes: string;
  ano: string;
  dataInicio: Date;
  dataFinal: Date;
  observacao: string;
  usuarioCriacao: string;
  usuarioModificacao: string;
  dataCriacao: Date;
  dataModificacao: Date;
}

interface TipoPagamento {
  id: string;
  codigo: string;
  descricao: string;
  observacao: string;
  usuarioCriacao: string;
  usuarioModificacao: string;
  dataCriacao: Date;
  dataModificacao: Date;
}

type TransactionInput = Omit<Transaction, "id" | "usuarioCriacao" | "usuarioModificacao" | "dataCriacao" | "dataModificacao" | "type" | "faturaId" | "tipoPagamentoId">;

interface TransactionProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  faturas: Fatura[];
  tiposPagamentos: TipoPagamento[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  removeTransaction: (id: string) => void;
  removeAllTransactions: () => void;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [faturas, setFaturas] = useState<Fatura[]>([]);
  const [tiposPagamentos, setTiposPagamentos] = useState<TipoPagamento[]>([]);


  useEffect(() => {
    
    async function getFaturas() {
      const response = await api.get<Fatura[]>("/faturas");
      
      setFaturas(response.data);
    }

    async function getTiposPagamentos() {
      const response = await api.get<TipoPagamento[]>("/tiposPagamentos");
      setTiposPagamentos(response.data);
    }

    async function getTransacctions() {
      const response = await api.get<Transaction[]>("/items");
      
      setTransactions(response.data);
    }

    getFaturas();
    getTiposPagamentos();
    getTransacctions();
    
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post("/transactions", {
      ...transactionInput
    });
    const { transaction } = response.data;

    setTransactions([...transactions, transaction]);
  }

  function removeTransaction(id: string) {
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
        faturas,
        tiposPagamentos,
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
