.PHONY: all

prepare-server-assets:
	npm run build
	rm ./build/index.js
	cp ./infra/server-handler.js ./build/index.js
	jq 'del(.devDependencies)' package.json > ./build/package.json
	mkdir -p build/node_modules
	npm install --prefix ./build 