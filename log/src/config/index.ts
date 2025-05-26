export default () => ({
  broker: process.env.BROKER ?? 'localhost:9092',
  services: {
    log: {
      clientId: 'log',
      groupId: 'log',
      name: 'log-kafka-client',
    },
  },
});