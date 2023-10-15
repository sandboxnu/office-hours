FROM node:14-alpine

# Install necessary system dependencies for sharp and libvips
RUN apk update && apk add --no-cache chromium build-base python3 \
 glib-dev \
 libpng-dev \
 jpeg-dev \
 zlib-dev \
 vips-dev

RUN mkdir /app
ADD . /app/helpme
COPY yarn.lock /app/helpme

WORKDIR /app/helpme

# Set environment variable to force puppeteer to use system installed chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN yarn install
