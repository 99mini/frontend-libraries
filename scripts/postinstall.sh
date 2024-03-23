#!/usr/bin/env bash
set -e

# skip postinstall if npm install for development
# rollup.config.js is not included in dist
if [ -f "rollup.config.mjs" ]; then
  echo "skipping your package's postinstall routine."
  exit 0
fi

echo 'Copying files from dist folder into root project folder...'
cp -r dist/* ./ && rm -rf dist

echo 'Copying files from dist folder into atom project folder...'
cp -r atom/dist/* ./atom && rm -rf atom/dist
echo 'Postinstall done!'
