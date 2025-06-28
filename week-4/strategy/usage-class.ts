import { Strategy } from './strategy-class';

const Action = {
  NOTIFY: 'notify',
  MULTICAST: 'multicast',
} as const;

const Transport = {
  EMAIL: 'email',
  SMS: 'sms',
} as const;

type Transport = (typeof Transport)[keyof typeof Transport];
type Action = (typeof Action)[keyof typeof Action];
type Handler = Function;

const NOTIFICATION_TRANSPORT_STRATEGY_NAME = 'transport';

const notificationTransportStrategy = new Strategy<
  Transport,
  Action[],
  Handler
>(NOTIFICATION_TRANSPORT_STRATEGY_NAME, Object.values(Action));

notificationTransportStrategy.registerBehaviour(Transport.EMAIL, {
  notify: (to, message) => {
    console.log(`Sending "email" notification to <${to}>`);
    console.log(`message length: ${message.length}`);
  },
  multicast: (message) => {
    console.log(`Sending "email" notification to all`);
    console.log(`message length: ${message.length}`);
  },
});

notificationTransportStrategy.registerBehaviour(Transport.SMS, {
  notify: (to, message) => {
    console.log(`Sending "sms" notification to <${to}>`);
    console.log(`message length: ${message.length}`);
  },
  multicast: (message) => {
    console.log(`Sending "sms" notification to all`);
    console.log(`message length: ${message.length}`);
  },
});

export const notify = notificationTransportStrategy.getBehaviour(
  Transport.SMS,
  Action.NOTIFY,
);
notify('+380501234567', 'Hello world');
