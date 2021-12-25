import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import ptBr from "date-fns/locale/pt-BR";

import logoImg from "../../assets/logo.svg";

import { Container, Content } from "./styles";

registerLocale("pt", ptBr);

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="mfcmoney" />
        <DatePicker
          locale="pt"
          dateFormat="P"
          selected={startDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          onChange={(date: Date | null) => setStartDate(date)}
        />
        <DatePicker
          locale="pt"
          dateFormat="P"
          selected={endDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          onChange={(date: Date | null) => setEndDate(date)}
        />
        <button type="button" onClick={onOpenNewTransactionModal}>
          Nova transação
        </button>
      </Content>
    </Container>
  );
}
