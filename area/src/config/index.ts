export default () => ({
  broker: process.env.BROKER ?? 'localhost:9092',
  services: {
    area: {
      clientId: 'area',
      groupId: 'area',
      name: 'area-kafka-client',
    },
  },
});