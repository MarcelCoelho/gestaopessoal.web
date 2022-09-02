import React from 'react';
import { FormEvent, useState } from "react";
import Modal from "react-modal";

import { useTiposPagamentos } from "../../../../hooks/useTiposPagamentos";

import { Container } from "./styles";

import { FiX } from 'react-icons/fi';

interface NewTipoPagamentoModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTipoPagamentoModal({
  isOpen,
  onRequestClose
}: NewTipoPagamentoModalProps) {
  const { createTipoPagamento } = useTiposPagamentos();

  const [codigo, setCodigo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [observacao, setObservacao] = useState("");

  async function handleCreateNewTipoPagamento(event: FormEvent) {
    event.preventDefault();

    await createTipoPagamento({
      codigo,
      descricao,
      observacao
    });

    setCodigo("");
    setDescricao("");
    setObservacao("");

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
          <h2>Cadastrar Tipo de Pagamento</h2>

          <input
            placeholder="Codigo"
            value={codigo}
            onChange={(event) => setCodigo(event.target.value)}
          ></input>

          <input
            placeholder="Descrição"
            value={descricao}
            onChange={(event) => setDescricao(event.target.value)}
          ></input>

          <input
            placeholder="Observação"
            value={observacao}
            onChange={(event) => setObservacao(event.target.value)}
          ></input>

          <button type="submit">Cadastrar</button>
        </form>
      </Container>
    </Modal>
  );
}
