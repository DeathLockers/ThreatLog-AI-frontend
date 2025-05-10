FROM node:22.14-alpine AS global-deps-stage
RUN yarn global add @quasar/cli

FROM global-deps-stage AS develop-stage
WORKDIR /src
COPY package.json ./
COPY . .

FROM develop-stage AS local-deps-stage
RUN yarn

FROM local-deps-stage AS build-spa-stage
RUN quasar build

FROM local-deps-stage AS build-pwa-stage
RUN quasar build -m pwa

FROM nginx:alpine3.21 AS prod-spa-stage
COPY --from=build-spa-stage /src/dist/spa /usr/share/nginx/html
#COPY .env.prod /app/.env.prod
COPY docker-config/generate-config-prod.sh /docker-entrypoint.d/generate-config.sh
RUN chmod +x /docker-entrypoint.d/generate-config.sh
RUN rm /etc/nginx/conf.d/default.conf
COPY docker-config/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

FROM nginx:alpine3.21 AS prod-pwa-stage
COPY --from=build-pwa-stage /src/dist/pwa /usr/share/nginx/html
# COPY .env.prod /app/.env.prod
COPY docker-config/generate-config-prod.sh /docker-entrypoint.d/generate-config.sh
RUN chmod +x /docker-entrypoint.d/generate-config.sh
RUN rm /etc/nginx/conf.d/default.conf
COPY docker-config/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
