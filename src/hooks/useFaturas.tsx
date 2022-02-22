import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { api } from "../services/api";

interface Fatura {
  id: string;
  mes: string;
  ano: string;
  dataInicio: Date;
  dataFinal: Date;
  orden: number;
  fechada: boolean;
  observacao: string;
  usuarioCriacao: string;
  usuarioModificacao: string;
  dataCriacao: Date;
  dataModificacao: Date;
  atual: boolean;
}

type FaturaInput = Omit<Fatura, "id" | "orden" | "atual" | "usuarioCriacao" | "usuarioModificacao" | "dataCriacao" | "dataModificacao">;

interface FaturaProviderProps {
  children: ReactNode;
}

interface FaturasContextData {
  faturas: Fatura[];
  createFatura: (fatura: FaturaInput) => Promise<void>;
  updateCloseFatura: (id: string) => void;
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
      const response = await api.get<Fatura[]>("/Faturas");

      let faturasTemp: Fatura[] = response.data;

      faturasTemp.forEach(fat => {
        fat.atual = (new Date() >= new Date(fat.dataInicio) &&
          new Date() <= new Date(fat.dataFinal));
      });

      setFaturas(faturasTemp);
      setUpdateData(false);
    }
  }

  function executeGetFaturas(update: boolean) {
    setUpdateData(update);
  }

  async function createFatura(FaturaInput: FaturaInput) {
    const response = await api.post("/Faturas", {
      ...FaturaInput,
      orden: 0,
      usuarioCriacao: 'web',
      usuarioModificacao: 'web'
    });
    const { fatura } = response.data;
    setUpdateData(true);
  }

  async function updateCloseFatura(id: string) {
    await api.put(`/fatura/${id}`);
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
        updateCloseFatura,
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
