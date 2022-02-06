import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { api } from "../services/api";
import { useFaturas } from "./useFaturas";

interface Transaction {
  id: string;
  data: Date;
  produto: string;
  loja: string;
  local: string;
  numeroParcela: number;
  quantidadeParcelas: number;
  fatura: {
    observacao: string;
  };
  tipoPagamento: {
    descricao: string;
  };
  valor: string;
  observacao: string;
  faturaId: string
  tipoPagamentoId: string;
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
  orden: number;
  observacao: string;
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
  transactionsByFatura: Transaction[];
  transactionsByTipoPagamento: Transaction[];
  activeTransaction: string;
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  removeTransaction: (id: string) => void;
  removeAllTransactions: () => void;
  getTransactionsByFatura: (fatura: string) => void;
  getTransactionsByTipoPagamento: (fatura: string, tipoPagamentoId: string) => void;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionProviderProps) {

  const { faturas } = useFaturas();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionsByFatura, setTransactionsByFatura] = useState<Transaction[]>([]);
  const [transactionsByTipoPagamento, setTransactionsByTipoPagamento] = useState<Transaction[]>([]);
  const [activeTransaction, setActiveTransaction] = useState("fatura");

  async function getTransacctions() {
    const response = await api.get<Transaction[]>("/items");

    setTransactions(response.data);
    setTransactionsByFatura(response.data);
  }

  useEffect(() => {    
    getTransacctions();

  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const dateTransaction: Date = new Date(transactionInput.data);

    var fatura: Fatura = getFatura(transactionInput.faturaId, 0);
    let order = fatura.orden;

    if (transactionInput.quantidadeParcelas == 0 || transactionInput.quantidadeParcelas == undefined)
      transactionInput.quantidadeParcelas = 1;

    let contadorParcelas = transactionInput.numeroParcela;

    for (let i = contadorParcelas; i <= transactionInput.quantidadeParcelas; ++i) {

      let transactionPost = transactionInput;
      var fatura: Fatura;

      if (i > 1) {
        order += 1;
        fatura = getFatura(null, order);
      }

      let dateString = new Date(transactionPost.data).toUTCString();
      dateString = dateString.split(' ').slice(0, 4).join(' ');

      transactionPost.data = new Date(dateString);

      transactionPost.numeroParcela = contadorParcelas;
      transactionPost.data = addData(dateTransaction, i);
      transactionPost.faturaId = fatura.id;

      const response = await api.post("/items",
        {
          ...transactionPost,
          usuarioCriacao: 'web',
          usuarioModificacao: 'web'
        });

      const { transaction } = response.data;

      setTransactions([...transactions, transaction]);
      await getTransacctions();
      contadorParcelas ++;
    }
  }

  function addData(date: Date, addMeses: number) {

    if (addMeses === 1)
      return date;

    var newDate = new Date();

    newDate.setMonth(date.getMonth() + addMeses - 1);

    return newDate;

  }

  function getFatura(id: string, orden: number) {

    var faturaById = faturas.filter(function (fatura) {
      return fatura.id === id || fatura.orden === orden;
    })[0];

    return faturaById;
  }

  async function removeTransaction(id: string) {

    await api.delete(`/items/${id}`)

    var array = [...transactions]; // make a separate copy of the array

    array = transactions.filter(function (transaction) {
      return transaction.id != id;
    });

    setTransactions(array);
  }

  function removeAllTransactions() {
    setTransactions([]);
  }

  function getTransactionsByFatura(fatura: string) {

    setActiveTransaction("fatura");

    if (fatura != "null" && fatura != undefined) {
      var array = []; // make a separate copy of the array

      array = transactions.filter(function (transaction) {
        return transaction.fatura.observacao === fatura;
      });

      setTransactionsByFatura(array);
    }
    else {
      setTransactionsByFatura(transactions);
    }

  }

  function getTransactionsByTipoPagamento(fatura: string, tipoPagamentoId: string) {

    if (fatura != "null" && fatura != undefined) {
      var transactionByFatura = []; // make a separate copy of the array

      transactionByFatura = transactions.filter(function (transaction) {
        return transaction.fatura.observacao === fatura;
      });

      if (tipoPagamentoId != "null" && tipoPagamentoId != undefined) {
        var transactionByTipoPagamento = []; // make a separate copy of the array

        transactionByTipoPagamento = transactionByFatura.filter(function (transaction) {
          return transaction.tipoPagamento.id === tipoPagamentoId;
        });

        setActiveTransaction("tipoPagamento");
        setTransactionsByTipoPagamento(transactionByTipoPagamento);
      }
      else
        setTransactionsByTipoPagamento(transactionByFatura);

    }
    else
      setTransactionsByTipoPagamento(transactionByFatura);

  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        transactionsByFatura,
        transactionsByTipoPagamento,
        activeTransaction,
        createTransaction,
        removeTransaction,
        removeAllTransactions,
        getTransactionsByFatura,
        getTransactionsByTipoPagamento
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
