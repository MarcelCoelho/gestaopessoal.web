import "react-datepicker/dist/react-datepicker.css";

import logoImg from "../../assets/logo.svg";

import { Container, Content, LinkButton } from "./styles";


interface HeaderProps {
  onOpenNewTransactionModal: () => void;
  onOpenTransaction: () => void;
  onOpenNewFatura: () => void;
  onOpenFatura: () => void;
  onOpenNewTipoPagamento: () => void;
  onOpenTipoPagamento: () => void;
  showButtonNewTransaction: boolean;
  showButtonTransacction: boolean;
  showButtonNewFatura: boolean;
  showButtonFatura: boolean;
  showButtonNewTipoPagamento: boolean;
  showButtonTipoPagamento: boolean;
}

export function Header({ 
                        onOpenNewTransactionModal,
                        onOpenTransaction,
                        onOpenNewFatura,
                        onOpenFatura,
                        onOpenNewTipoPagamento,
                        onOpenTipoPagamento,
                        showButtonNewTransaction,
                        showButtonTransacction, 
                        showButtonNewFatura,
                        showButtonFatura,
                        showButtonNewTipoPagamento,
                        showButtonTipoPagamento}: HeaderProps) {
  
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

        <button type="button" onClick={onOpenNewFatura} hidden={!showButtonNewFatura}>
           Nova Fatura 
        </button>

        <button type="button" onClick={onOpenNewTipoPagamento} hidden={!showButtonNewTipoPagamento}>
           Novo Tipo de Pagamento 
        </button>

        <button type="button" onClick={onOpenNewTransactionModal} hidden={!showButtonNewTransaction}>
          Nova transação
        </button>
       
      </Content>
    </Container>
  );
}
