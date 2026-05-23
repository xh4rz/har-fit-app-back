# ===========================================
# 1. Install dependencies only when needed
# ===========================================
FROM node:24.15.0-alpine3.22 AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# install pnpm globally
RUN npm install -g pnpm

# copy manifests
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./


# install dependencies
RUN pnpm install --frozen-lockfile
# RUN pnpm approve-builds --all

# ===========================================
# 2. Build the app with cache dependencies
# ===========================================
FROM node:24.15.0-alpine3.22 AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# ===========================================
# 3. Production image, copy all the files and run next
# ===========================================
FROM node:24.15.0-alpine3.22 AS runner
WORKDIR /usr/src/app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --prod --frozen-lockfile
# RUN pnpm approve-builds --all
COPY --from=builder /app/dist ./dist
CMD [ "node","dist/main" ]