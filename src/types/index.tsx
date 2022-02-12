export type Fatura = {
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
      observacao: string;
      orden: number;
      fechada: boolean;
      atual: boolean;
      dataInicio: Date;
      dataFinal: Date;
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

export type TotalFatura = {
    id: string,
    descricao: string,
    inicio: Date,
    fim: Date,
    fechada: boolean,
    atual: boolean,
    orden: number,
    quantidade: number,
    total: number
}