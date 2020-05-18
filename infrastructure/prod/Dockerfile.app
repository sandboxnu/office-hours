FROM node:12-alpine as build

WORKDIR /

# package.json of root and of needed packages
COPY package.json .
COPY yarn.lock .
COPY babel.config.js .
COPY packages/app/package.json packages/app/package.json
COPY packages/api-client/package.json packages/api-client/package.json
COPY packages/common/package.json packages/common/package.json

# Install at root level
RUN yarn install --pure-lockfile --non-interactive

# Get src files
COPY packages/app packages/app
COPY packages/api-client packages/api-client
COPY packages/common packages/common

RUN yarn workspaces run build


# LINES COMMENTED OUT ENABLE SMALLER FINAL IMAGE SIZE
# Production container
# FROM node:12-alpine

# WORKDIR /

# COPY package.json .
# COPY yarn.lock .

# COPY --from=build /packages/app/package.json /packages/app/package.json
# COPY --from=build /packages/app/.next /packages/app/.next

ENV NODE_ENV production

# RUN yarn install --pure-lockfile --non-interactive --production

WORKDIR /packages/app

EXPOSE 3001

CMD ["npm", "start"]
