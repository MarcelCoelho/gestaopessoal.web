import React from 'react';

import { Route, Routes, BrowserRouter as Router} from 'react-router-dom';


import { Principal } from "../pages/Principal";
import { TipoPagamento } from "../components/TipoPagamento";
import { Fatura } from "../components/Fatura";

import { TransactionsProvider } from "../hooks/useTransactions";
import { PrincipalProvider } from "../hooks/usePrincipal";
import { TiposPagamentosProvider } from "../hooks/useTiposPagamentos";
import { FaturasProvider } from "../hooks/useFaturas";
import { GlobalStyle } from "../styles/global";

export function MainRoutes() {
  return (
  <TransactionsProvider>
    <PrincipalProvider>
      <TiposPagamentosProvider>
        <FaturasProvider>
          <Router>
            <Routes>
             <Route path="/" element={<Principal />} />
              <Route path="/tipoPagamento" element={<TipoPagamento />} />
              <Route path="/fatura" element={<Fatura />} />
            </Routes>
          </Router>
          <GlobalStyle />
        </FaturasProvider>
      </TiposPagamentosProvider>
    </PrincipalProvider>
  </TransactionsProvider>
  )
}
