import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { api } from "../services/api";

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

type TipoPagamentoInput = Omit<TipoPagamento, "id" | "usuarioCriacao" | "usuarioModificacao" | "dataCriacao" | "dataModificacao">;

interface TipoPagamentoProviderProps {
  children: ReactNode;
}

interface TiposPagamentosContextData {
  tiposPagamentos: TipoPagamento[];
  createTipoPagamento: (tipoPagamento: TipoPagamentoInput) => Promise<void>;
  removeTipoPagamento: (id: string) => void;
  removeAllTiposPagamentos: () => void;
}

const TiposPagamentosContext = createContext<TiposPagamentosContextData>(
  {} as TiposPagamentosContextData
);

export function TiposPagamentosProvider({ children }: TipoPagamentoProviderProps) {
 
  const [tiposPagamentos, setTiposPagamentos] = useState<TipoPagamento[]>([]);

  useEffect(() => {

    async function getTiposPagamentos() {
      const response = await api.get<TipoPagamento[]>("/tiposPagamentos");
      setTiposPagamentos(response.data);
    }

    getTiposPagamentos();
    
  }, []);

  async function createTipoPagamento(tipoPagamentoInput: TipoPagamentoInput) {
    const response = await api.post("/tiposPagamentos", {
      ...tipoPagamentoInput
    });
    const { transaction } = response.data;

    setTiposPagamentos([...tiposPagamentos, transaction]);
  }

  function removeTipoPagamento(id: string) {
    var array = [...tiposPagamentos]; // make a separate copy of the array

    array = tiposPagamentos.filter(function (transaction) {
      return transaction.id !== id;
    });

    setTiposPagamentos(array);
  }

  function removeAllTiposPagamentos() {
    setTiposPagamentos([]);
  }

  return (
    <TiposPagamentosContext.Provider
      value={{
        tiposPagamentos,
        createTipoPagamento,
        removeTipoPagamento,
        removeAllTiposPagamentos,
      }}
    >
      {children}
    </TiposPagamentosContext.Provider>
  );
}

export function useTiposPagamentos() {
  const context = useContext(TiposPagamentosContext);
  return context;
}
