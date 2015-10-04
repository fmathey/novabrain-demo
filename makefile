all: install prod
	npm install

install:
	npm install

dev:
	./node_modules/.bin/webpack

prod:
	NODE_ENV=production ./node_modules/.bin/webpack

watch:
	./node_modules/.bin/webpack --watch