import { Route, Routes, Navigate, BrowserRouter as Router } from 'react-router-dom';

import { TransactionsProvider } from "..//hooks/useTransactions";
import { TiposPagamentosProvider } from "..//hooks/useTiposPagamentos";

import { Panel } from "../components/Panel";
import { Transactions } from "../components/Transactions";
import { TipoPagamento } from "../components/TipoPagamento";
import { Fatura } from "../components/Fatura";
import { Charts } from "../components/Charts";

const Dashboard = ({ children, redirectTo }) => {
  return <Navigate to={redirectTo} />
}

export function MainRoutes() {
  return (
    <Router>
      <TiposPagamentosProvider>
        <TransactionsProvider>
          <Routes>

            <Route path="/panelaplicacoes" element={<Panel />} />
            <Route path="/panelaplicacoes" element={<Panel />} />
            <Route path="/" element={<Dashboard redirectTo="/panelaplicacoes">
              <Panel />
            </Dashboard>}>
            </Route>
            {/*<Route path="/dashboard" element={<Transactions />} />
            <Route path="/" element={<Dashboard redirectTo="/dashboard">
              <Transactions />
            </Dashboard>}>
  </Route>*/}

            <Route path="/dashboard" element={<Transactions />} />
            <Route path="/tipoPagamento" element={<TipoPagamento />} />
            <Route path="/fatura" element={<Fatura />} />

            <Route path="/chart" element={<Charts />} />

          </Routes>
        </TransactionsProvider>
      </TiposPagamentosProvider>
    </Router>
  )
}
