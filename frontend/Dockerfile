FROM node:18

WORKDIR /app

COPY package.json ./

RUN rm -rf node_modules

RUN yarn install --legacy-peer-deps
RUN yarn upgrade parcel

COPY . ./

# Run ESLint
#RUN yarn run lint

CMD ["yarn", "start"]
