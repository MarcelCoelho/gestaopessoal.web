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
}

type FaturaInput = Omit<Fatura, "id" | "orden" | "usuarioCriacao" | "usuarioModificacao" | "dataCriacao" | "dataModificacao">;

interface FaturaProviderProps {
  children: ReactNode;
}

interface FaturasContextData {
  faturas: Fatura[];
  createFatura: (fatura: FaturaInput) => Promise<void>;
  removeFatura: (id: string) => void;
  removeAllFaturas: () => void;
}

const FaturasContext = createContext<FaturasContextData>(
  {} as FaturasContextData
);

export function FaturasProvider({ children }: FaturaProviderProps) {
 
  const [faturas, setFaturas] = useState<Fatura[]>([]);

  useEffect(() => {

    async function getFaturas() {
      const response = await api.get<Fatura[]>("/Faturas");
      setFaturas(response.data);
    }

    getFaturas();
    
  }, []);

  async function createFatura(FaturaInput: FaturaInput) {
    const response = await api.post("/Faturas", {
      ...FaturaInput,
      orden: 0,
      usuarioCriacao: 'web',
      usuarioModificacao: 'web'
    });
    const { fatura } = response.data;

    setFaturas([...faturas, fatura]);
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

  return (
    <FaturasContext.Provider
      value={{
        faturas,
        createFatura,
        removeFatura,
        removeAllFaturas,
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
