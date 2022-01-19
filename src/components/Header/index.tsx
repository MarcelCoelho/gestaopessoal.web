import "react-datepicker/dist/react-datepicker.css";

import logoImg from "../../assets/logo.svg";

import { Container, Content, LinkButton } from "./styles";


interface HeaderProps {
  onOpenNewTransactionModal: () => void;
  onOpenTransaction: () => void;
  onOpenFatura: () => void;
  onOpenTipoPagamento: () => void;
  showButtonNewTransaction: boolean;
  showButtonTransacction: boolean;
  showButtonFatura: boolean;
  showButtonTipoPagamento: boolean;
}

export function Header({ 
                        onOpenNewTransactionModal,
                        onOpenTransaction,
                        onOpenFatura, 
                        onOpenTipoPagamento,
                        showButtonNewTransaction,
                        showButtonTransacction, 
                        showButtonFatura, 
                        showButtonTipoPagamento  }: HeaderProps) {
  
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="mfcmoney" />
    
        <button type="button" onClick={onOpenFatura} hidden={!showButtonFatura}>
          <LinkButton to="/fatura" > Faturas </LinkButton> 
        </button>

        <button type="button" onClick={onOpenTipoPagamento} hidden={!showButtonTipoPagamento}>
          <LinkButton to="/tipoPagamento" > Tipos Pagamentos </LinkButton> 
        </button>

        <button type="button" onClick={onOpenTransaction} hidden={!showButtonTransacction}>
          <LinkButton to="/" > Dashboard </LinkButton> 
        </button>

        <button type="button" onClick={onOpenNewTransactionModal} hidden={!showButtonNewTransaction}>
          Nova transação
        </button>
       
      </Content>
    </Container>
  );
}
