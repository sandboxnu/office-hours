# proof-of-concept, run the entire koh in one container.
# BTW this is bad. Ideally we should have _one process per container_,
# i.e. front-end in its own container, back-end in its own container,
# proxy or whatever other pizaaz in its own container.

FROM node:14

# TODO copy package.jsons and project scaffold w/o src/ folder for caching yarn install
COPY . .

RUN ["yarn", "install"]

CMD ["yarn", "dev"]
