## Requirements
1. Docker
2. NodeJS v17.9.1
3. NPM 8.11.0

## Installation
Clone this repository on your local folder.
```bash
npm install
docker-compose -up -d
cp .env .env.example
npx migrate dev

```

## Running the app

```bash
# development
npm run start:dev
```

## Test (TODO: the tests were written before the GUARDS were deployed so they are currently breaking 😅)

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```