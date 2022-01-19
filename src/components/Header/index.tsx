import { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";

import logoImg from "../../assets/logo.svg";

import { Container, Content, LinkButton } from "./styles";


interface HeaderProps {
  onOpenNewTransactionModal: () => void;
  onOpenFatura: () => void;
  onOpenTipoPagamento: () => void;
  showButtonTransacction: boolean;
  showButtonFatura: boolean;
  showButtonTipoPagamento: boolean;
}

export function Header({ onOpenNewTransactionModal, onOpenFatura, onOpenTipoPagamento, showButtonTransacction, showButtonFatura, showButtonTipoPagamento  }: HeaderProps) {
  
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="mfcmoney" />
    
        <button type="button" onClick={onOpenFatura} hidden={showButtonFatura}>
          <LinkButton to="/fatura" > Faturas </LinkButton> 
        </button>

        <button type="button" onClick={onOpenTipoPagamento} hidden={showButtonTipoPagamento}>
          <LinkButton to="/tipoPagamento" > Tipos Pagamentos </LinkButton> 
        </button>

        <button type="button" onClick={onOpenNewTransactionModal} hidden={!showButtonTransacction}>
          Nova transação
        </button>
       
      </Content>
    </Container>
  );
}
