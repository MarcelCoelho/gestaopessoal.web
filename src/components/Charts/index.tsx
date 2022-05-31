import { Container } from "./styles";
import { Header } from "../Header";
import { Title } from "../Charts/Title";

import { Transaction } from '../../types';

import { Chart } from "react-google-charts";

import { usePrincipal } from "../../hooks/usePrincipal";
import { useTransactions } from "../../hooks/useTransactions";
import { useEffect, useState } from "react";

import _ from 'lodash';

export function Charts() {
  const [chartData, setChartData] = useState([]);

  const {
    handleOpenChart } = usePrincipal();

  const {
    transactions
  } = useTransactions();

  const loadData = () => {

    const currentDate = new Date();
    let faturasFilter = transactions.filter(transaction => {
      return String(transaction.fatura.ano) === String(currentDate.getFullYear());
    });

    let faturas = _.groupBy(faturasFilter, (transacition: Transaction) => {
      return transacition.fatura.observacao
    });

    const tiposPagamentos: [] = _.groupBy(transactions, (transaction: Transaction) => {
      return transaction.tipoPagamento.descricao;
    });

    var arrTiposPagamentos = [];
    _.forEach(tiposPagamentos, (value, key) => {
      arrTiposPagamentos.push(key);
    });
    arrTiposPagamentos = _.orderBy(arrTiposPagamentos);
    arrTiposPagamentos.unshift('Fatura');
    arrTiposPagamentos.push('Average');

    let totalPorTiposPagamentos = [];

    _.forEach(faturas, (value, key) => {

      const tps = _.groupBy(value, (item) => {
        return item.tipoPagamento.descricao;
      });

      const sumTiposPagamentos = _.map(tps, (value, key) => [
        key,
        _.sumBy(tps[key], (v) => v.valor)
      ])

      totalPorTiposPagamentos.push(key, sumTiposPagamentos);

    });

    const arrayChart = [arrTiposPagamentos];

    let index = 0;
    _.forEach(totalPorTiposPagamentos, (value, key) => {

      const fatura: string = totalPorTiposPagamentos[index];
      index++;

      let alimentacao = 0; let boleto = 0; let credito = 0; let debito = 0; let picpay = 0; let pix = 0; let refeicao = 0;
      let media = 0;
      arrTiposPagamentos.forEach(tp => {

        if (tp === 'Fatura' || tp === 'Average')
          return;

        _.forEach(totalPorTiposPagamentos[index], (value, key) => {

          if (tp === value[0] && value[1] > 0) {
            switch (tp) {
              case 'Alimentação':
                alimentacao = getValor(value[1]);
                break;
              case 'Boleto':
                boleto = getValor(value[1]);
                break;
              case 'Crédito':
                credito = getValor(value[1]);
                break;
              case 'Débito':
                debito = getValor(value[1]);
                break;
              case 'PicPay':
                picpay = getValor(value[1]);
                break;
              case 'Pix':
                pix = getValor(value[1]);
                break;
              case 'Refeição':
                refeicao = getValor(value[1]);
                break;
            }
          }
        })
      })

      if (fatura !== undefined) {

        media = (Number(alimentacao) +
          Number(boleto) +
          Number(credito) +
          Number(debito) +
          Number(picpay) +
          Number(pix) +
          Number(refeicao));

        arrayChart.push([fatura,
          Number(alimentacao.toFixed(2)),
          Number(boleto.toFixed(2)),
          Number(credito.toFixed(2)),
          Number(debito.toFixed(2)),
          Number(picpay.toFixed(2)),
          Number(pix.toFixed(2)),
          Number(refeicao.toFixed(2)),
          Number(media.toFixed(2))]);
      }
      index++

    })
    return arrayChart;
  }

  function getValor(valor) {
    return valor;
  }

  useEffect(() => {
    setChartData(loadData());
  }, [])

  const options = {
    title: "Faturas Por Tipos de Pagamentos",
    vAxis: { title: "Valores" },
    hAxis: { title: "Faturas" },
    seriesType: "bars",
    series: { 7: { type: "line" } }
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