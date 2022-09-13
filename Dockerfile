FROM localstack/java-maven-node-python
WORKDIR .
ADD package*.json .
ADD yarn.lock .
ARG PORT
ENV PORT $PORT
EXPOSE $PORT
RUN yarn install
ADD . .
CMD ["yarn", "build"] 
CMD ["yarn", "start"]
