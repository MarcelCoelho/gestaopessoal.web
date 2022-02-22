import { Container } from "./styles";
import { Header } from "../Header";
import { Title } from "../Charts/Title";

import { Transaction } from '../../types';

import { Chart } from "react-google-charts";

import { usePrincipal } from "../../hooks/usePrincipal";
import { useTransactions } from "../../hooks/useTransactions";
import { useTiposPagamentos } from "../../hooks/useTiposPagamentos";
import { useEffect, useState } from "react";

import _ from 'lodash';

export function Charts() {
  const [chartData, setChartData] = useState<Transaction[]>([]);

  const {
    handleOpenChart } = usePrincipal();

  const {
    transactions
  } = useTransactions();

  let data = [];

  const loadData = () => {
    const faturas = _.groupBy(transactions, (transacition: Transaction) => {
      return transacition.fatura.observacao
    });

    console.log('faturas', faturas);

    const tiposPagamentos: [] = _.groupBy(transactions, (transaction: Transaction) => {
      return transaction.tipoPagamento.descricao;
    });

    var arrTiposPagamentos = [];
    _.forEach(tiposPagamentos, (value, key) => {
      arrTiposPagamentos.push(key);
    });
    arrTiposPagamentos.unshift('Fatura');
    arrTiposPagamentos.push('Media');

    const tiposPagamentosOrdenados = _.orderBy(arrTiposPagamentos);
    console.log('ordenados', tiposPagamentosOrdenados);


    tiposPagamentosOrdenados.forEach(tp => {

      if (tp === 'Fatura' || tp === 'Media')
        return;

      console.log('tp Loop: ', tp);

      _.forEach(faturas, (value, key) => {

        console.log('Fatura: ', key, value)

        const tps = _.groupBy(value, (item) => {
          return item.tipoPagamento.descricao;
        });

        const result = _.map(tps, (value, key) => [
          key,
          _.sumBy(tps[key], (v) => v.valor)
        ])

        //console.log('---> ', result);

      });
    });

    return arrTiposPagamentos;
  }

  useEffect(() => {
    setChartData(loadData());
  }, [])

  /*const data = [
    ["Fatura", "Credito", "Debito", "Pix", "Boleto", "Média"],
    ["Fev/2022", 165, 938, 522, 998, 614.6],
    ["Mar/2022", 135, 1120, 599, 1268, 682],
    ["Abr/2022", 157, 1167, "", 807, 623],
    ["Mai/2022", 139, 1110, 615, 968, 609.4],
    ["Jun/2022", 136, 691, 629, 1026, 569.6]
  ];*/

  const options = {
    title: "Monthly Coffee Production by Country",
    vAxis: { title: "Valores" },
    hAxis: { title: "Faturas" },
    seriesType: "bars",
    series: { 4: { type: "line" } }
  };
  return (
    <>
      <Header
        onOpenNewTransactionModal={() => { }}
        onOpenTransaction={() => { }}
        onOpenNewFatura={() => { }}
        onOpenFatura={() => { }}
        onOpenNewTipoPagamento={() => { }}
        onOpenTipoPagamento={() => { }}
        onOpenChart={handleOpenChart}
        showButtonChart={false}
        showButtonTransacction={true}
        showButtonFatura={true}
        showButtonTipoPagamento={true}
        showButtonNewTransaction={false}
        showButtonNewTipoPagamento={false}
        showButtonNewFatura={false}
      />
      <Container>
        <Title />
        <Chart
          chartType="ComboChart"
          width="100%"
          height="30rem"
          data={chartData}
          options={options}
        />
      </Container>
    </>
  )
}