FROM node:20 AS build-stage
WORKDIR /usr/src/app

COPY . .

ENV VITE_BACKEND_URL=http://localhost:3000/

RUN npm ci
RUN npm run build

RUN CI=true npm test


FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

