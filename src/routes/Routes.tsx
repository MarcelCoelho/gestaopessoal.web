import React from 'react';
import { Route, Routes, Navigate, BrowserRouter as Router } from 'react-router-dom';

import { TransactionsProvider } from "..//hooks/useTransactions";
import { TiposPagamentosProvider } from "..//hooks/useTiposPagamentos";
import { FaturasProvider } from "..//hooks/useFaturas";
import { CounterProvider } from "..//hooks/useCounter";

import { Panel } from "../components/Panel";

import { Login } from "../components/Pages/Login";
import { Transacao } from "../components/Pages/Transacao";
import { TipoPagamento } from "../components/Pages/TipoPagamento";
import { Fatura } from "../components/Pages/Fatura";
import { Charts } from "../components/Charts";

const Dashboard = ({ children, redirectTo }) => {
  return <Navigate to={redirectTo} />
}

export function MainRoutes() {
  return (
    <Router>
      <TiposPagamentosProvider>
        <FaturasProvider>
          <TransactionsProvider>
            <CounterProvider>
              <Routes>

                {/* <Route path="/panelaplicacoes" element={<Panel />} />
                <Route path="/" element={<Dashboard redirectTo="/panelaplicacoes">
                  <Panel />
                </Dashboard>}>
                </Route>*/}
                {/*<Route path="/dashboard" element={<Transactions />} />
            <Route path="/" element={<Dashboard redirectTo="/dashboard">
              <Transactions />
            </Dashboard>}>
  </Route>*/}

                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Dashboard redirectTo="/login">
                  <Panel />
                </Dashboard>}>
                </Route>

                <Route path="/transacoes" element={<Transacao />} />
                <Route path="/tipoPagamento" element={<TipoPagamento />} />
                <Route path="/fatura" element={<Fatura />} />

                <Route path="/chart" element={<Charts />} />

              </Routes>
            </CounterProvider>
          </TransactionsProvider>
        </FaturasProvider>
      </TiposPagamentosProvider>
    </Router>
  )
}
