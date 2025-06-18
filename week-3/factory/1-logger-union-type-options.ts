'use strict';

const LogLevel = {
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info',
} as const;

const COLOR = {
  [LogLevel.WARNING]: '\x1b[1;33m',
  [LogLevel.ERROR]: '\x1b[0;31m',
  [LogLevel.INFO]: '\x1b[1;37m',
} as const;

type ColorKey = keyof typeof COLOR;
type ColorValue = (typeof COLOR)[ColorKey];
type LoggerOption = ColorKey | ColorValue;

export const logger =
  (option: LoggerOption = LogLevel.INFO) =>
  (message: string) => {
    let color = COLOR[option];

    if (!color) {
      for (const value of Object.values(COLOR)) {
        if (value === option) {
          color = value;
        }
      }
    }

    const date = new Date().toISOString();
    console.log(`${color}${date}\t${message}`);
  };

const warning = logger(LogLevel.WARNING);
warning('Hello warning');

const error = logger(COLOR.error);
error('Hello error');

const info = logger();
info('Hello info');
