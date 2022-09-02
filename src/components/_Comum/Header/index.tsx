import "react-datepicker/dist/react-datepicker.css";

//import logoImg from "../../assets/logo3.png";
import { Perfil } from "../../Perfil";

import { Container, Content, LinkButton } from "./styles";


interface HeaderProps {
  onOpenNewTransactionModal: () => void;
  onOpenChart: () => void;
  onOpenTransaction: () => void;
  onOpenNewFatura: () => void;
  onOpenFatura: () => void;
  onOpenNewTipoPagamento: () => void;
  onOpenTipoPagamento: () => void;
  showButtonNewTransaction: boolean;
  showButtonChart: boolean;
  showButtonTransacction: boolean;
  showButtonNewFatura: boolean;
  showButtonFatura: boolean;
  showButtonNewTipoPagamento: boolean;
  showButtonTipoPagamento: boolean;
}

export function Header({
  onOpenNewTransactionModal,
  onOpenChart,
  onOpenTransaction,
  onOpenNewFatura,
  onOpenFatura,
  onOpenNewTipoPagamento,
  onOpenTipoPagamento,
  showButtonChart,
  showButtonNewTransaction,
  showButtonTransacction,
  showButtonNewFatura,
  showButtonFatura,
  showButtonNewTipoPagamento,
  showButtonTipoPagamento }: HeaderProps) {

  return (
    <Container>
      <Content>
        <Perfil />

        {/*<div className="header">
          <img src="https://avatars.githubusercontent.com/u/39440678?v=4" />
          <span>Gastos</span>
  </div>*/}

        <div>
          <div className="newPage">

            <button
              type="button"
              className="buttonEntity"
              onClick={onOpenChart}
              hidden={!showButtonChart}>
              <LinkButton to="/chart" > Gráficos </LinkButton>
            </button>

            <button
              type="button"
              className="buttonEntity"
              onClick={onOpenFatura}
              hidden={!showButtonFatura}>
              <LinkButton to="/fatura" > Faturas </LinkButton>
            </button>

            <button
              type="button"
              className="buttonEntity"
              onClick={onOpenTipoPagamento}
              hidden={!showButtonTipoPagamento}>
              <LinkButton to="/tipoPagamento" > Tipos Pagamentos </LinkButton>
            </button>

            <button
              type="button"
              className="buttonEntity"
              onClick={onOpenTransaction}
              hidden={!showButtonTransacction}>
              <LinkButton to="/transacoes" > Transacoes </LinkButton>
            </button>
          </div>

          <div className="newItem">
            <button type="button" onClick={onOpenNewFatura} hidden={!showButtonNewFatura}>
              Nova Fatura
            </button>

            <button type="button" onClick={onOpenNewTipoPagamento} hidden={!showButtonNewTipoPagamento}>
              Novo Tipo de Pagamento
            </button>

            <button type="button" onClick={onOpenNewTransactionModal} hidden={!showButtonNewTransaction}>
              Nova transação
            </button>
          </div>
        </div>
      </Content>
    </Container>
  );
}
