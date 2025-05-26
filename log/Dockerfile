ARG NODEJS_DOCKER_IMAGE

FROM ${NODEJS_DOCKER_IMAGE}

WORKDIR /app

COPY --chown=node:node package.json package-lock.json ./

RUN npm install

COPY --chown=node:node . .

CMD [ "npm", "start" ]
