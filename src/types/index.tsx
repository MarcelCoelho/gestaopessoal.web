export type Fatura = {
  id: string;
  mes: string;
  ano: string;
  dataInicio: Date;
  dataFinal: Date;
  ordem: number;
  fechada: boolean;
  observacao: string;
  usuarioCriacao: string;
  usuarioModificacao: string;
  dataCriacao: Date;
  dataModificacao: Date;
  atual: boolean;
}

export type TipoPagamento = {
  id: string;
  codigo: string;
  descricao: string;
  observacao: string;
  usuarioCriacao?: string;
  usuarioModificacao?: string;
  dataCriacao?: Date;
  dataModificacao?: Date;
}

export type Transaction = {
  id: string;
  data: Date;
  dataTexto: string;
  produto: string;
  loja: string;
  local: string;
  numeroParcela: number;
  quantidadeParcelas: number;
  fatura: {
    ano: string;
    observacao: string;
    ordem: number;
    fechada: boolean;
    atual: boolean;
    dataInicio: Date;
    dataFinal: Date;
  };
  tipoPagamento: {
    id: string;
    descricao: string;
  };
  valor: string;
  observacao: string;
  faturaId: string
  tipoPagamentoId: string;
  usuarioId: string;
  usuarioCriacao: string;
  usuarioModificacao: string;
  dataCriacao: Date;
  dataModificacao: Date;
  estaSelecionado: boolean;
}

export type TotalFatura = {
  id: string,
  descricao: string,
  inicio: Date,
  fim: Date,
  fechada: boolean,
  atual: boolean,
  ordem: number,
  quantidade: number,
  total: number
}