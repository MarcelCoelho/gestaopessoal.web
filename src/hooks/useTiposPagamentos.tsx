import React from 'react';

import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { apiNet6 } from "../services/api";

interface TipoPagamento {
  id: string;
  codigo: string;
  descricao: string;
  observacao: string;
  usuarioCriacao?: string;
  usuarioModificacao?: string;
  dataCriacao?: Date;
  dataModificacao?: Date;
}

type TipoPagamentoInput = Omit<TipoPagamento, "id" | "usuarioCriacao" | "usuarioModificacao" | "dataCriacao" | "dataModificacao">;

interface TipoPagamentoProviderProps {
  children: ReactNode;
}

interface TiposPagamentosContextData {
  tiposPagamentos: TipoPagamento[];
  createTipoPagamento: (tipoPagamentoInput: TipoPagamentoInput) => Promise<void>;
  removeTipoPagamento: (id: string) => void;
  removeAllTiposPagamentos: () => void;
}

const TiposPagamentosContext = createContext<TiposPagamentosContextData>(
  {} as TiposPagamentosContextData
);

export function TiposPagamentosProvider({ children }: TipoPagamentoProviderProps) {


  const [tiposPagamentos, setTiposPagamentos] = useState<TipoPagamento[]>([]);
  const [updateData, setUpdateData] = useState(true);

  async function getTiposPagamentos() {
    if (updateData) {
      const response = await apiNet6.get<TipoPagamento[]>("/api/TipoPagamento");
      setTiposPagamentos(response.data);
      setUpdateData(false);
    }
  }

  useEffect(() => {
    getTiposPagamentos();
  }, [updateData]);

  async function createTipoPagamento(tipoPagamentoInput: TipoPagamentoInput) {

    await apiNet6.post("/api/TipoPagamento",
      {
        ...tipoPagamentoInput,
        usuarioCriacao: 'web',
        usuarioModificacao: 'web'
      });

    setUpdateData(true);
  }

  async function removeTipoPagamento(id: string) {

    await apiNet6.delete(`/api/TipoPagamento/${id}`)

    var array = [...tiposPagamentos]; // make a separate copy of the array

    array = tiposPagamentos.filter(function (tipoPagamento) {
      return tipoPagamento.id !== id;
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
        removeAllTiposPagamentos
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
