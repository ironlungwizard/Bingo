# FROM node:19-alpine AS build
# WORKDIR /app
# COPY package.json package.json
# COPY yarn.lock yarn.lock
# RUN yarn install
# COPY . .
# RUN yarn build


# FROM nginx:1.19-alpine
# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*
# COPY --from=build /app/dist .
# ENTRYPOINT ["nginx", "-g", "daemon off;"]

FROM node:19-alpine AS build
WORKDIR /app
COPY package.json package.json
RUN yarn install
COPY . .
RUN yarn build


FROM nginx:1.19-alpine
COPY --from=build /app/dist /opt/site/bingo
COPY nginx.conf /etc/nginx/nginx.conf


