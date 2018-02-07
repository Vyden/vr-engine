mkdir -p dist
# if you don't have it, npm install -g minifier
minify --output dist/bundle.js bundle.js
cp index.html dist/index.html