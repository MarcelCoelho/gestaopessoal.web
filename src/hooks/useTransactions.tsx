import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { api } from "../services/api";
import { useFaturas } from "./useFaturas";

import { Transaction, Fatura } from '../types';

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
  getTransactionsByFatura: (mes: string, ano: string) => void;
  filtrarTransactionsByFatura: (fatura: string) => void;
  getTransactionsByTipoPagamento: (fatura: string, tipoPagamentoId: string) => void;
  gravarTransacoesPorFatura: (transacoes: Transaction[]) => void;
  gravarTransacoesPorTipoPagamento: (transacoes: Transaction[]) => void;
  errorApi: string;
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
  const [errorApi, setErrorApi] = useState('');

  useEffect(() => {
    getTransactions();
  }, []);

  async function getTransactions() {

    try {
      const response = await api.get<Transaction[]>("/Transactions/faturasZip");
      setTransactions(response.data);
      setTransactionsByFatura(response.data);
      setErrorApi('');
    }
    catch (error) {
      setErrorApi('Error: ' + error.message)
    }
  }

  async function getTransactionsById(id: string) {
    try {
      const response = await api.get<Transaction>(`/Transactions/${id}`);
      setTransactions([...transactions, response.data]);
      setTransactionsByFatura([...transactionsByFatura, response.data]);
      setErrorApi('');
    }
    catch (error) {
      setErrorApi('Error: ' + error.message)
    }
  }

  async function getTransactionsByFatura(mes: string, ano: string) {

    try {
      const response = await api.get<Transaction[]>(`/Transactions/${mes}/${ano}`);
      setTransactions([...transactions, ...response.data]);
      setTransactionsByFatura([...transactions, ...response.data]);
      setErrorApi('');
    }
    catch (error) {
      setErrorApi('Error: ' + error.message)
    }
  }

  async function createTransaction(transactionInput: TransactionInput) {
    const dateTransaction: Date = new Date(transactionInput.data);

    var faturaRecuperada: Fatura = getFatura(transactionInput.faturaId, 0);
    let order = faturaRecuperada.orden;

    if (transactionInput.quantidadeParcelas === 0 || transactionInput.quantidadeParcelas === undefined) {
      transactionInput.numeroParcela = 1;
      transactionInput.quantidadeParcelas = 1;
    }

    let contadorParcelas = transactionInput.numeroParcela;

    for (let i = contadorParcelas; i <= transactionInput.quantidadeParcelas; ++i) {

      let transactionPost = transactionInput;
      var fatura: Fatura;

      fatura = recuperarFatura(i, order, faturaRecuperada);

      AtualizarDadosPeticao(contadorParcelas, dateTransaction, i, fatura, transactionPost);

      const response = await GravarTransacao(transactionPost);

      const transaction = response.data;

      const _transactions = [...transactions];
      _transactions.unshift(transaction);

      setTransactions([]);
      setTransactions(_transactions);

      console.log(_transactions);

      await getTransactionsById(transaction.id);
      contadorParcelas++;
    }
  }

  function recuperarFatura(i, order, faturaRecuperada) {
    var fatura: Fatura;

    if (i > 1) {
      order += i - 1;
      fatura = getFatura(null, order);
    }
    else {
      fatura = faturaRecuperada;
    }

    return fatura;
  }

  function AtualizarDadosPeticao(contadorParcelas, dateTransaction, i, fatura, transactionPost: TransactionInput) {
    transactionPost.numeroParcela = contadorParcelas;
    transactionPost.data = addData(dateTransaction, i);
    transactionPost.dataTexto = transactionPost.data.toDateString();
    transactionPost.faturaId = fatura.id;
  }

  async function GravarTransacao(transactionPost: TransactionInput) {
    const response = await api.post<Transaction>("/transactions",
      {
        ...transactionPost,
        usuarioCriacao: 'web',
        usuarioModificacao: 'web'
      });

    return response;
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

  async function remove(id: string) {
    await api.delete(`/transactions/${id}`)

    const arrayTransactions = arraysDelete(id, transactions);
    setTransactions([]);
    setTransactions(arrayTransactions);

    const arrayTransactionsByFatura = arraysDelete(id, transactionsByFatura);
    setTransactionsByFatura([]);
    setTransactionsByFatura(arrayTransactionsByFatura);

    const arrayTransactionByTipoPagamento = arraysDelete(id, transactionsByTipoPagamento);
    setTransactionsByTipoPagamento([]);
    setTransactionsByTipoPagamento(arrayTransactionByTipoPagamento);
  }

  async function removeTransaction(id: string) {
    remove(id);
  }

  function arraysDelete(id: string, array: Transaction[]) {

    if (array && array.length > 0) {
      var arrayTransactions = [...array]; // make a separate copy of the array

      arrayTransactions = array.filter(function (transaction) {
        return transaction.id !== id;
      });


      if (arrayTransactions && arrayTransactions.length > 0) {
        return arrayTransactions;
      }
      else
        return [];

    }
    else
      return [];
  }

  function removeAllTransactions() {
    setTransactions([]);
  }

  function filtrarTransactionsByFatura(fatura: string) {

    setActiveTransaction("fatura");

    if (fatura !== null && fatura !== undefined) {
      var array = []; // make a separate copy of the array

      const dataAtual = new Date();
      array = transactions.filter(function (transaction) {
        transaction.fatura.atual =
          (dataAtual >= new Date(transaction.fatura.dataInicio) &&
            dataAtual < new Date(transaction.fatura.dataFinal));
        return transaction.fatura.observacao === fatura;
      });

      setTransactionsByFatura(array);
    }
    else {
      setTransactionsByFatura(transactions);
    }

  }

  function getTransactionsByTipoPagamento(fatura: string, tipoPagamentoId: string) {

    if (fatura !== "null" && fatura !== undefined) {
      var transactionByFatura = []; // make a separate copy of the array

      transactionByFatura = transactions.filter(function (transaction) {
        return transaction.fatura.observacao === fatura;
      });

      if (tipoPagamentoId !== "null" && tipoPagamentoId !== undefined) {
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

  function gravarTransacoesPorFatura(transacoes: Transaction[]) {
    setTransactionsByFatura([]);
    setTransactionsByFatura(transacoes);
  }

  function gravarTransacoesPorTipoPagamento(transacoes: Transaction[]) {
    setTransactionsByTipoPagamento([]);
    setTransactionsByTipoPagamento(transacoes);
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
        filtrarTransactionsByFatura,
        getTransactionsByTipoPagamento,
        gravarTransacoesPorFatura,
        gravarTransacoesPorTipoPagamento,
        errorApi
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
