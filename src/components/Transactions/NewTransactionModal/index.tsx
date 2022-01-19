import { FormEvent, useState } from "react";
import Modal from "react-modal";

import closeImg from "../../../assets/close.svg";
import incomeImg from "../../../assets/income.svg";
import outcomeImg from "../../../assets/outcome.svg";
import { useTransactions } from "../../../hooks/useTransactions";

import { Container, TransactionTypeContainer, RadioBox } from "./styles";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [data, setData] = useState(new Date());
  const [produto, setProduto] = useState("");
  const [loja, setLoja] = useState("");
  const [local, setLocal] = useState("");
  const [numeroParcela, setNumeroParcela] = useState(0);
  const [quantidadeParcelas, setQuantidadeParcelas] = useState(0);
  const [valor, setValor] = useState(0);
  const [tipo, setTipo] = useState("");
  const [observacao, setObservacao] = useState("");

  const [type, setType] = useState("deposit");

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      data,
      produto,
      loja,
      local,
      numeroParcela,
      quantidadeParcelas,      
      valor,
      tipo,
      observacao
    });

    setData(new Date());
    setProduto("");
    setLoja("");
    setLocal("");
    setNumeroParcela(0);
    setQuantidadeParcelas(0);
    setValor(0);
    setTipo("");
    setObservacao("");
    setType("deposit");
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
        <img src={closeImg} alt="Fechar Modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transacao</h2>

        <input
          placeholder="Titulo"
          value={produto}
          onChange={(event) => setProduto(event.target.value)}
        ></input>
        <input
          placeholder="Valor"
          type="number"
          value={valor}
          onChange={(event) => setValor(Number(event.target.value))}
        ></input>

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            isActive={type === "deposit"}
            activeColor="green"
            onClick={() => {
              setType("deposit");
            }}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            isActive={type === "whitdraw"}
            activeColor="red"
            onClick={() => {
              setType("whitdraw");
            }}
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={tipo}
          onChange={(event) => setTipo(event.target.value)}
        ></input>
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
