import React from 'react';

import { Route, Routes, BrowserRouter as Router} from 'react-router-dom';


import { Principal } from "../pages/Principal";
import { TipoPagamento } from "../components/TipoPagamento";
import { Fatura } from "../components/Fatura";

import { TransactionsProvider } from "../hooks/useTransactions";
import { GlobalStyle } from "../styles/global";

export function MainRoutes() {
  return (
  <TransactionsProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/tipoPagamento" element={<TipoPagamento />} />
        <Route path="/fatura" element={<Fatura />} />
      </Routes>
    </Router>
    <GlobalStyle />
  </TransactionsProvider>
  )
}
