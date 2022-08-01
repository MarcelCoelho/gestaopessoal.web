import { FormEvent, useEffect, useState } from "react";
import Modal from "react-modal";

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';

import { FiX } from 'react-icons/fi';
import { useTransactions } from "../../../hooks/useTransactions";

import { Content } from "./styles";
import { useTiposPagamentos } from "../../../hooks/useTiposPagamentos";
import { useFaturas } from "../../../hooks/useFaturas";
import { Checkbox } from "@material-ui/core";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

registerLocale('pt', pt);

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const { tiposPagamentos } = useTiposPagamentos();
  const { faturas } = useFaturas();

  const [optionsTipoPagamento, setOptionsTipoPagamento] = useState<string[]>([]);
  const [optionsFatura, setOptionsFatura] = useState<string[]>([]);

  const [data, setData] = useState(new Date());
  const [produto, setProduto] = useState("");
  const [loja, setLoja] = useState("");
  const [local, setLocal] = useState("");
  const [numeroParcela, setNumeroParcela] = useState<number>();
  const [quantidadeParcelas, setQuantidadeParcelas] = useState<number>();
  const [valor, setValor] = useState("");
  const [observacao, setObservacao] = useState("");
  const [estaSelecionado, setEstaSelecionado] = useState(true);

  const [faturaId, setFaturaId] = useState("");
  const [tipoPagamentoId, setTipoPagamentoId] = useState("");

  useEffect(() => {
    getOptionsTipoPagamento();
    getOptionsFatura();

  }, [tiposPagamentos, faturas]);

  function getOptionsTipoPagamento() {
    let optionsTemporary = []

    for (let i = 0; i < tiposPagamentos.length; ++i)
      optionsTemporary[i] = tiposPagamentos[i].descricao;

    setOptionsTipoPagamento(optionsTemporary);
  }

  function getOptionsFatura() {
    let optionsTemporary = []

    for (let i = 0; i < faturas.length; ++i) {
      if (!faturas[i].fechada)
        optionsTemporary[i] = faturas[i].observacao;
    }

    setOptionsFatura(optionsTemporary);
  }

  function getFaturaId(value: string) {
    for (let i = 0; i < faturas.length; ++i) {
      if (faturas[i].observacao === value) {
        return faturas[i].id;
      }
    }
  }

  function getTipoPagamentoId(value: string) {
    for (let i = 0; i < tiposPagamentos.length; ++i) {
      if (tiposPagamentos[i].descricao === value) {

        return tiposPagamentos[i].id;
      }
    }
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
        descricao: ""
      },
      tipoPagamentoId: _tipoPagamentoId,
      usuarioId: "marcelfillipe@hotmail.com",
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

          <Autocomplete
            options={optionsFatura}
            onChange={(event, value) => setFaturaId(value)}
            style={{ width: '100%', height: '100%', marginTop: '0.3rem' }}
            renderInput={(params) =>
              <TextField {...params} label="Fatura" variant="outlined" />}
          />

          <Autocomplete
            options={optionsTipoPagamento}
            onChange={(event, value) => {
              setTipoPagamentoId(value)
            }}
            style={{ width: '100%', height: '100%', marginTop: '0.3rem' }}
            renderInput={(params) =>
              <TextField {...params} label="Tipo Pagamento" variant="outlined" />}
          />


          <button type="submit">Cadastrar</button>
        </form>
      </Content>
    </Modal>
  );
}
