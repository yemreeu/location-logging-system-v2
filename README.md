# Location Logging System v2

A microservices-based system for managing user locations, areas (polygons), and logging area entries. The project consists of three main services:

- **location**: Handles user location data and exposes a REST API.
- **area**: Manages area definitions (polygons) and checks if a location is inside an area.
- **log**: Logs when a user enters an area.

All services are built with [NestJS](https://nestjs.com/), use PostgreSQL for storage, and communicate via Kafka.

---

## Project Structure

```
.
├── area/
├── location/
├── log/
├── docker-compose.yml
├── .env
└── README.md
```

Each service has its own `README.md` for service-specific details.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- [PostgreSQL](https://www.postgresql.org/) (if not using Docker)

### Environment Variables

Copy `.env` and adjust values as needed. Example:

```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
LOCATION_DATABASE_NAME=location
AREA_DATABASE_NAME=area
LOG_DATABASE_NAME=log
BROKER=localhost:9092
```

---

## Running with Docker Compose

To start all services and Kafka broker:

```sh
docker-compose up --build
```

- Location service: [http://localhost:3000](http://localhost:3000)
- Kafka broker: `localhost:9092`

---

## Running Locally (Development)

Install dependencies for each service:

```sh
cd area && npm install
cd ../location && npm install
cd ../log && npm install
```

Start each service in a separate terminal:

```sh
cd area && npm run start:dev
cd location && npm run start:dev
cd log && npm run start:dev
```

---

## API Documentation

The Location service provides Swagger docs at:

- [http://localhost:3000/api](http://localhost:3000/api)

---

## Testing

Each service supports unit and e2e tests:

```sh
npm run test
npm run test:e2e
```

---

## Technologies Used

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Kafka](https://kafka.apache.org/) (via [kafkajs](https://kafka.js.org/))
- [Docker](https://www.docker.com/)
- **Saga Orchestration** with NestJS and Kafka for distributed transaction management

---

## Contributing

Feel free to open issues or submit pull requests!

---

## License

This project is UNLICENSED. Please contact the author for usage permissions.