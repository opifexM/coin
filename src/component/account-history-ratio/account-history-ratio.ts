import Chart from 'chart.js/auto';
import {Account, Transaction} from "../../api/account-schema.ts";
import './account-history-ratio.css';
import {ACCOUNT} from "../../const.ts";

interface TransactionReport {
  month: string;
  date: Date;
  incomePercentage: number;
  expensePercentage: number;
}

function aggregateTransaction(transactions: Transaction[], account: string): TransactionReport[] {
  const groupedTransactions = transactions
    .reduce((acc, transaction) => {
      const isNegativeAmount = transaction.from === account;
      const date = new Date(transaction.date);
      const month = date.toLocaleString("en-EN", {month: "long", year: "numeric"});

      let monthData: TransactionReport | undefined = acc.find((item) => item.month === month);
      if (!monthData) {
        monthData = {
          month: month,
          date: new Date(date.getFullYear(), date.getMonth()),
          incomePercentage: 0,
          expensePercentage: 0,
        };
        acc.push(monthData);
      }
      if (!isNegativeAmount) {
        monthData.incomePercentage += transaction.amount;
      } else {
        monthData.expensePercentage += Math.abs(transaction.amount);
      }

      return acc;
    }, [] as TransactionReport[]);

  return groupedTransactions
    .toSorted((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, ACCOUNT.CHART_TIME_FRAME_MONTH)
    .reverse();
}

export function getAccountHistoryRatioComponent(currentAccount: Account): HTMLDivElement {
  const {account, transactions} = currentAccount;
  const component = document.createElement('div');
  component.classList.add('account-ratio-component');

  const title = document.createElement('p');
  title.textContent = 'Ratio of incoming outgoing transactions';
  title.classList.add('account-ratio-title');
  component.appendChild(title);

  const canvas = document.createElement("canvas");
  canvas.classList.add("account-ratio-chart");
  component.appendChild(canvas);
  const transactionReport = aggregateTransaction(transactions, account);

  const ctx = canvas.getContext("2d");
  if (ctx) {
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: transactionReport.map(report => report.month),
        datasets: [
          {
            data: transactionReport.map(report => report.incomePercentage),
            backgroundColor: "rgba(0, 128, 0, 0.7)",
            borderColor: "green",
            borderWidth: 1,
          },
          {
            data: transactionReport.map(report => report.expensePercentage),
            backgroundColor: "rgba(255, 0, 0, 0.7)",
            borderColor: "red",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {display: false, position: "top"},
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  return component;
}
