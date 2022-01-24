import React from 'react';

import { Route, Routes, BrowserRouter as Router} from 'react-router-dom';


import { Transactions } from "../components/Transactions";
import { TipoPagamento } from "../components/TipoPagamento";
import { Fatura } from "../components/Fatura";

export function MainRoutes() {
  return (
          <Router>
            <Routes>
             <Route path="/" element={<Transactions />} />
              <Route path="/tipoPagamento" element={<TipoPagamento />} />
              <Route path="/fatura" element={<Fatura />} />
            </Routes>
          </Router>
      )
}
