import { Route, Routes, Navigate, BrowserRouter as Router } from 'react-router-dom';


import { Transactions } from "../components/Transactions";
import { TipoPagamento } from "../components/TipoPagamento";
import { Fatura } from "../components/Fatura";

const Dashboard = ({ children, redirectTo }) => {
  return <Navigate to={redirectTo} />
}

export function MainRoutes() {
  return (
    <Router>
      <Routes>

        <Route path="/dashboard" element={<Transactions />} />
        <Route path="/" element={<Dashboard redirectTo="/dashboard">
          <Transactions />
        </Dashboard>}>

        </Route>
        <Route path="/tipoPagamento" element={<TipoPagamento />} />
        <Route path="/fatura" element={<Fatura />} />
      </Routes>
    </Router>
  )
}
