import Chart from 'chart.js/auto';
import {Account, Transaction} from "../../api/account-schema.ts";
import {ACCOUNT} from "../../const.ts";
import {renderAccountHistoryPage} from "../../page/account-history-page/account-history-page.ts";
import './account-history-dynamic.css';

const handleHistoryDynamicClick = async (event: MouseEvent, account: Account): Promise<void> => {
  event.preventDefault();
  await renderAccountHistoryPage(account);
};

interface TransactionReport {
  month: string;
  date: Date;
  totalAmount: number
}

function aggregateTransaction(transactions: Transaction[]): TransactionReport[] {
  const groupedTransactions = transactions
    .reduce((acc, transaction) => {
      const date = new Date(transaction.date);
      const month = date.toLocaleString("en-EN", {month: "long", year: "numeric"});

      let monthData: TransactionReport | undefined = acc.find((item) => item.month === month);
      if (!monthData) {
        monthData = {
          month: month,
          date: new Date(date.getFullYear(), date.getMonth()),
          totalAmount: 0
        };
        acc.push(monthData);
      }

      monthData.totalAmount += transaction.amount;

      return acc;
    }, [] as TransactionReport[]);

  return groupedTransactions
    .toSorted((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, ACCOUNT.CHART_TIME_FRAME_MONTH)
    .reverse();
}

export function getAccountHistoryDynamicComponent(account: Account, isExtend = false): HTMLDivElement {
  const {transactions} = account;
  const component = document.createElement('div');
  component.classList.add('account-dynamic-component');
  if (!isExtend) {
    component.addEventListener('click', (event) => handleHistoryDynamicClick(event, account));
  }

  const title = document.createElement('p');
  title.textContent = 'Balance dynamic';
  title.classList.add('account-dynamic-title');
  component.appendChild(title);

  const canvas = document.createElement("canvas");
  canvas.classList.add("account-dynamic-chart");
  component.appendChild(canvas);
  const transactionReport = aggregateTransaction(transactions);

  const ctx = canvas.getContext("2d");
  if (ctx) {
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: transactionReport.map(report => report.month),
        datasets: [
          {
            data: transactionReport.map(report => report.totalAmount),
            backgroundColor: "rgba(13,90,173,0.74)",
            borderColor: "#094a8c",
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
