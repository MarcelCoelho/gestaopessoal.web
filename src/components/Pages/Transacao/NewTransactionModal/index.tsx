
import React from 'react';
import { FormEvent, useEffect, useState } from "react";
import Modal from "react-modal";

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';

import { FiX } from 'react-icons/fi';
import { useTransactions } from "../../../../hooks/useTransactions";

import { Content } from "./styles";
import { useTiposPagamentos } from "../../../../hooks/useTiposPagamentos";
import { useFaturas } from "../../../../hooks/useFaturas";
import { Checkbox } from "@material-ui/core";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

registerLocale('pt', pt);


export function NewTransactionModal({
  isOpen,
  onRequestClose
}: NewTransactionModalProps) {
  const { createTransaction, transacaoEditar } = useTransactions();

  const { tiposPagamentos } = useTiposPagamentos();
  const { faturas } = useFaturas();

  const [optionsTipoPagamento, setOptionsTipoPagamento] = useState<string[]>([]);
  const [optionsFatura, setOptionsFatura] = useState<string[]>([]);

  useEffect(() => {
    getOptionsTipoPagamento();
    getOptionsFatura();
    carregarDadosTransacao();
  }, [transacaoEditar]);

  const [data, setData] = useState(new Date());
  const [produto, setProduto] = useState("");
  const [loja, setLoja] = useState("");
  const [local, setLocal] = useState("");
  const [numeroParcela, setNumeroParcela] = useState<number>(0);
  const [quantidadeParcelas, setQuantidadeParcelas] = useState<number>(0);
  const [valor, setValor] = useState("");
  const [observacao, setObservacao] = useState("");
  const [estaSelecionado, setEstaSelecionado] = useState(true);

  const [faturaId, setFaturaId] = useState<string | null>("");
  const [tipoPagamentoId, setTipoPagamentoId] = useState<string | null>("Crédito");

  function transacaoExiste() {
    return transacaoEditar != null && transacaoEditar != undefined;
  }

  function carregarDadosTransacao() {
    setData(transacaoExiste() ? transacaoEditar.data : new Date());
    setProduto(transacaoExiste() ? transacaoEditar.produto : "");
    setLoja(transacaoExiste() ? transacaoEditar.loja : "");
    setLocal(transacaoExiste() ? transacaoEditar.local : "");
    setNumeroParcela(transacaoExiste() ? transacaoEditar.numeroParcela : 1);
    setQuantidadeParcelas(transacaoExiste() ? transacaoEditar.quantidadeParcelas : 1);
    setValor(transacaoExiste() ? transacaoEditar.valor : "");
    setObservacao(transacaoExiste() ? transacaoEditar.observacao : "");
    setEstaSelecionado(transacaoExiste() ? transacaoEditar.estaSelecionado : true);
    setFaturaId(transacaoExiste() ? buscarDescricaoPorFaturaId(transacaoEditar.faturaId) : buscarPrimeiraFatura());
    setTipoPagamentoId(transacaoExiste() ? buscarDescricaoPorTipoPagamentoId(transacaoEditar.tipoPagamentoId) : "Crédito");
  }

  function buscarPrimeiraFatura() {
    if (faturas != null && faturas != undefined && faturas.length > 0) {
      var ft = faturas.filter(f => f.atual)[0];
      return ft.observacao;
    }
    return "";
  }

  function getOptionsTipoPagamento() {
    let optionsTemporary: string[] = []

    for (let i = 0; i < tiposPagamentos.length; ++i)
      optionsTemporary[i] = tiposPagamentos[i].descricao;

    setOptionsTipoPagamento(optionsTemporary);
  }

  function getOptionsFatura() {
    let optionsTemporary: string[] = []

    for (let i = 0; i < faturas.length; ++i) {
      if (!faturas[i].fechada)
        optionsTemporary[i] = faturas[i].observacao;
    }

    setOptionsFatura(optionsTemporary);
  }

  function buscarDescricaoPorFaturaId(id: string) {
    for (let i = 0; i < faturas.length; ++i) {
      if (faturas[i].id === id) {
        return faturas[i].observacao;
      }
    }
    return "";
  }

  function buscarDescricaoPorTipoPagamentoId(id: string) {
    for (let i = 0; i < tiposPagamentos.length; ++i) {
      if (tiposPagamentos[i].id === id) {
        return tiposPagamentos[i].descricao;
      }
    }
    return "";
  }

  function getFaturaId(value: string | null) {
    for (let i = 0; i < faturas.length; ++i) {
      if (faturas[i].observacao === value) {
        return faturas[i].id;
      }
    }
    return '';
  }

  function getTipoPagamentoId(value: string | null) {
    for (let i = 0; i < tiposPagamentos.length; ++i) {
      if (tiposPagamentos[i].descricao === value) {

        return tiposPagamentos[i].id;
      }
    }
    return '';
  }

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    const _faturaId = getFaturaId(faturaId);
    const _tipoPagamentoId = getTipoPagamentoId(tipoPagamentoId);

    const _valor = Number.parseFloat(valor).toFixed(2);

    const newDate = new Date(data);

    await createTransaction({
      data: newDate,
      dataTexto: newDate.toDateString(),
      produto,
      loja,
      local,
      numeroParcela,
      quantidadeParcelas,
      valor: _valor,
      observacao,
      faturaId: _faturaId,
      fatura: {
        ano: "",
        atual: false,
        dataFinal: new Date(),
        dataInicio: new Date(),
        fechada: false,
        observacao: "",
        ordem: 0,
      },
      tipoPagamento: {
        id: "",
        descricao: ""
      },
      tipoPagamentoId: _tipoPagamentoId,
      usuarioId: "",
      estaSelecionado
    });

    setData(new Date());
    setProduto("");
    setLoja("");
    setLocal("");
    setNumeroParcela(1);
    setQuantidadeParcelas(1);
    setValor("");
    setObservacao("");
    setFaturaId("");
    setTipoPagamentoId("");
    setEstaSelecionado(true);
    onRequestClose();
  }

  const handleFaturaSelecionada = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFaturaId(event.target.value);
  };
  const handleTipoPagamentoSelecionado = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTipoPagamentoId(event.target.value);
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >

      <h2>Cadastrar Transação</h2>

      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >

        <FiX size={24} stroke="#5429CC" />
      </button>

      <Content className="contentModal">

        <form onSubmit={handleCreateNewTransaction}>

          <DatePicker
            placeholderText="Data"
            locale="pt"
            selected={new Date(data)}
            onChange={(date: Date) => setData(new Date(date))}
            dateFormat="dd/MM/yyyy">
          </DatePicker>

          <input
            placeholder="Produto"
            value={produto}
            onChange={(event) => setProduto(event.target.value)}
          ></input>

          <input
            placeholder="Loja"
            value={loja}
            onChange={(event) => setLoja(event.target.value)}
          ></input>

          <input
            placeholder="Local"
            value={local}
            onChange={(event) => setLocal(event.target.value)}
          ></input>

          <input
            placeholder="N. Parcela"
            type='text'
            value={numeroParcela}
            onChange={(event) => setNumeroParcela(Number(event.target.value))}
          ></input>

          <input
            placeholder="Qnt. Parcela"
            type="text"
            value={quantidadeParcelas}
            onChange={(event) => setQuantidadeParcelas(Number(event.target.value))}
          ></input>

          <input
            placeholder="Valor"
            value={valor}
            onChange={(event) => setValor(event.target.value)}
          ></input>

          <Checkbox
            title="duehduehdheu"
            placeholder="mmdede"
            style={{ padding: 0 }}
            value={estaSelecionado}
            checked={estaSelecionado}
            onChange={(event) => setEstaSelecionado(event.target.checked)} />

          <input
            placeholder="Observação"
            value={observacao}
            onChange={(event) => setObservacao(event.target.value)}
          ></input>

          <TextField
            style={{ width: '100%', height: '100%', marginTop: '1rem' }}
            id="outlined-select-currency-native"
            select
            label="Fatura"
            value={faturaId}
            onChange={handleFaturaSelecionada}
            SelectProps={{
              native: true,
            }}
          >
            {optionsFatura.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>

          <TextField
            style={{ width: '100%', height: '100%', marginTop: '1.5rem' }}
            id="outlined-select-currency-native"
            select
            label="Tipo de Pagamento"
            value={tipoPagamentoId}
            onChange={handleTipoPagamentoSelecionado}
            SelectProps={{
              native: true,
            }}
          >
            {optionsTipoPagamento.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>


          <button type="submit">Cadastrar</button>
        </form>
      </Content>
    </Modal>
  );
}
