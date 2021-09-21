# Build
FROM node:15.3.0 as build-deps
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install
COPY . ./

RUN yarn build

# Production environment
FROM nginx:1.14.2-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
ADD nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
