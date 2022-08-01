import { FormEvent, useState } from "react";
import DatePicker from 'react-datepicker';

import { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';


import Modal from "react-modal";

import { useFaturas } from "../../../hooks/useFaturas";

import { Container } from "./styles";
import { Checkbox } from "@material-ui/core";

import { FiX } from 'react-icons/fi';

registerLocale('pt', pt)

interface NewFaturaModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewFaturaModal({
  isOpen,
  onRequestClose
}: NewFaturaModalProps) {
  const { createFatura } = useFaturas();

  const [periodo, setPeriodo] = useState("");
  const [observacao, setObservacao] = useState("");
  const [dataInicio, setDataInicio] = useState(new Date());
  const [dataFinal, setDataFinal] = useState(new Date());
  const [fechada, setFechada] = useState(false);
  const [atual, setAtual] = useState(false);

  async function handleCreateNewTipoPagamento(event: FormEvent) {
    event.preventDefault();

    const mes = periodo.split("/")[0];
    const ano = periodo.split("/")[1];

    await createFatura({
      mes,
      ano,
      dataInicio,
      dataFinal,
      fechada,
      observacao,
      atual
    });

    setPeriodo("");
    setObservacao("");
    setDataInicio(new Date());
    setDataFinal(new Date());
    setFechada(false);
    setAtual(false);

    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <FiX size={20} stroke="#5429CC" />
      </button>

      <Container className="contentModal">
        <form onSubmit={handleCreateNewTipoPagamento}>
          <h2>Cadastrar Fatura</h2>

          <input
            placeholder="Título"
            value={observacao}
            onChange={(event) => setObservacao(event.target.value)}
          ></input>

          <input
            placeholder="Periodo"
            value={periodo}
            onChange={(event) => setPeriodo(event.target.value)}
          ></input>

          <DatePicker
            placeholderText="Data Inicio"
            locale="pt"
            selected={dataInicio}
            onChange={(date: Date) => setDataInicio(date)}
            dateFormat="dd/MM/yyyy">
          </DatePicker>

          <DatePicker
            placeholderText="Data Final"
            locale="pt"
            selected={dataFinal}
            onChange={(date: Date) => setDataFinal(date)}
            dateFormat="dd/MM/yyyy">
          </DatePicker>

          <Checkbox
            value={fechada}
            onChange={(event) => setFechada(Boolean(event.target.value))}
          />

          <Checkbox
            value={atual}
            onChange={(event) => setAtual(Boolean(event.target.value))}
          />

          <button type="submit">Cadastrar</button>
        </form>
      </Container>
    </Modal>
  );
}
