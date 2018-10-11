FROM docker:stable

RUN apk update && \
	apk add nodejs yarn

WORKDIR /appcenter

COPY src/ src/
COPY package.json yarn.lock ./

RUN sed -i '/"eslint": "^5.2.0"/d' ./package.json
RUN yarn
RUN yarn run doc

EXPOSE 3000

ENTRYPOINT /usr/local/bin/dockerd-entrypoint.sh & yarn start
