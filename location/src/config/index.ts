export default () => ({
  broker: process.env.BROKER ?? 'localhost:9092',
  services: {
    location: {
      clientId: 'location',
      groupId: 'location',
      name: 'location-kafka-client',
    },
    area: {
      clientId: 'area',
      groupId: 'area',
      name: 'area-kafka-client',
    },
    log: {
      clientId: 'log',
      groupId: 'log',
      name: 'log-kafka-client',
    },
  },
});