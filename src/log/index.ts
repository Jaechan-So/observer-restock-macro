import { pino } from 'pino';

const logger = pino({
  formatters: {
    bindings: () => {
      return {};
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

export default logger;
