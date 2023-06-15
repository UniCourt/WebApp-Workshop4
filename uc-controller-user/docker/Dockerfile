FROM node:18.16.0-alpine3.17 As development

ARG NODE_ENV

LABEL maintainer="UniCourt Workshop <unicourt.com>" \
    version="1.0.0" \
    description="Docker image for UniCourt Workshop uc-controller-user"

WORKDIR /home/uc_user/controller-user

COPY uc-controller-user/controller-user/package.json .

COPY uc-controller-user/controller-user/.npmrc .

RUN npm install

COPY uc-controller-user/controller-user .

RUN sh prisma.sh && npm run build

RUN if [[ "$NODE_ENV" != "dev" ]] ; then npm prune --production ; fi