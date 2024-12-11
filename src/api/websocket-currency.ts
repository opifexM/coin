import {updateCurrencyMonitoringComponent} from "../component/currency-monitoring/currency-monitoring.ts";
import {BACKEND_WEBSOCKET_URL, WebSocketAPIRoute} from "../const.ts";
import {store} from "../store/store.ts";
import {TrendType} from "../type/trend-type.enum.ts";
import {ExchangeRate, ExchangeRateChangeSchema} from "./exchange-rate-schema.ts";

let socket: WebSocket | null = null;

export function getCurrencyWebSocket(): WebSocket {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    socket = new WebSocket(`${BACKEND_WEBSOCKET_URL}${WebSocketAPIRoute.Currency}`);

    socket.addEventListener('open', () => {
      store.exchangeRate = [];
    });

    socket.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);
        const validatedData = ExchangeRateChangeSchema.parse(data);
        const {from, to, rate, change, type} = validatedData;
        if (from && to && rate && type === 'EXCHANGE_RATE_CHANGE') {
          const updatedRate: ExchangeRate = {
            type: type,
            rate: rate,
            to: to,
            from: from,
            change: change as TrendType
          }

          const index = store.exchangeRate
            .findIndex(rate => rate.from === from && rate.to === to);
          if (index === -1) {
            store.exchangeRate.push(updatedRate);
          } else {
            store.exchangeRate = store.exchangeRate.with(index, updatedRate);
          }
        }
        updateCurrencyMonitoringComponent(store.exchangeRate);

      } catch (error) {
        console.error('Error WebSocket Currency:', error);
      }
    });

    socket.addEventListener('error', (event) => {
      console.error('Error WebSocket Currency:', event);
    });

    socket.addEventListener('close', () => {
      store.exchangeRate = [];
      socket = null;
    });
  }

  return socket;
}
