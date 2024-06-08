# ai-search-engine
Inspired by Perplexity.ai

## Check Redis Conncetion

## Run App
npm run dev
npm run start

## Run Worker
npm run dev:worker
npm run start: worker


## Database
npx prisma generate

migrate db:
npx prisma migrate dev --name init
npx prisma migrate dev

run prisma server:
npx prisma studio

seeding data:
npx tsc prisma/seed.ts
node prisma/seed.js
