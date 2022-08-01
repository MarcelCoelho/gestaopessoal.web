import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext
} from "react";
import { apiNet6 } from "../services/api";
import { Fatura } from '../types';

type FaturaInput = Omit<Fatura, "id" | "ordem" | "usuarioCriacao" | "usuarioModificacao" | "dataCriacao" | "dataModificacao">;

interface FaturaProviderProps {
  children: ReactNode;
}

interface FaturasContextData {
  faturas: Fatura[];
  createFatura: (fatura: FaturaInput) => Promise<void>;
  putFaturaFechada: (id: string, fechada: boolean) => void;
  putFaturaAtual: (id: string, atual: boolean) => void;
  removeFatura: (id: string) => void;
  removeAllFaturas: () => void;
  updateTipoPagamentoOn: (descricao: string) => void;
  tipoPagamentoOn: string;
  executeGetFaturas: (update: boolean) => void;
}

const FaturasContext = createContext<FaturasContextData>(
  {} as FaturasContextData
);

export function FaturasProvider({ children }: FaturaProviderProps) {

  const [faturas, setFaturas] = useState<Fatura[]>([]);
  const [tipoPagamentoOn, setTipoPagamentoOn] = useState("");
  const [updateData, setUpdateData] = useState(true);

  useEffect(() => {
    getFaturas();
  }, [updateData]);

  async function getFaturas() {

    if (updateData) {
      const response = await apiNet6.get<Fatura[]>("/api/Fatura");

      //let faturasTemp: Fatura[] = response.data;

      /*faturasTemp.forEach(fat => {
        fat.atual = (new Date() >= new Date(fat.dataInicio) &&
          new Date() <= new Date(fat.dataFinal));
      });*/

      //setFaturas(faturasTemp);
      setFaturas(response.data);
      setUpdateData(false);
    }
  }

  function executeGetFaturas(update: boolean) {
    setUpdateData(update);
  }

  async function createFatura(FaturaInput: FaturaInput) {
    await apiNet6.post("/api/Fatura", {
      ...FaturaInput,
      ordem: faturas.length + 1,
      usuarioCriacao: 'web',
      usuarioModificacao: 'web'
    });

    setUpdateData(true);
  }

  async function putFaturaFechada(id: string, fechada: boolean) {
    const fatura = faturas.filter(function (fat) {
      return fat.id === id;
    });

    //await apiNet6.put(`/api/Fatura/${id}`, fatura);
    await apiNet6.put(`/api/Fatura/Fechada/${id}/${fechada}`);
    setUpdateData(true);
  }

  async function putFaturaAtual(id: string, atual: boolean) {
    const fatura = faturas.filter(function (fat) {
      return fat.id === id;
    });

    //await apiNet6.put(`/api/Fatura/${id}`, fatura);
    await apiNet6.put(`/api/Fatura/Atual/${id}/${atual}`);
    setUpdateData(true);
  }

  function removeFatura(id: string) {
    var array = [...faturas]; // make a separate copy of the array

    array = faturas.filter(function (transaction) {
      return transaction.id !== id;
    });

    setFaturas(array);
  }

  function removeAllFaturas() {
    setFaturas([]);
  }

  function updateTipoPagamentoOn(descricao: string) {
    setTipoPagamentoOn(descricao);
  }

  return (
    <FaturasContext.Provider
      value={{
        faturas,
        createFatura,
        putFaturaFechada,
        putFaturaAtual,
        removeFatura,
        removeAllFaturas,
        updateTipoPagamentoOn,
        tipoPagamentoOn,
        executeGetFaturas
      }}
    >
      {children}
    </FaturasContext.Provider>
  );
}

export function useFaturas() {
  const context = useContext(FaturasContext);
  return context;
}
