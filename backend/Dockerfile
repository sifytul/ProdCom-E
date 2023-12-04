FROM node:18-alpine AS base


# install dependencies
FROM base AS deps

WORKDIR /app
RUN apk add --no-cache libc6-compat

COPY package.json yarn.lock ./

RUN yarn --freeze-lockfile

# builder image
FROM base AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN yarn build

# runner image
FROM base AS runner

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/doc ./doc
COPY package.json yarn.lock ./

CMD [ "node", "dist/src/main" ]