#!/usr/bin/env bash
set -e

# skip postinstall if npm install for development
# rollup.config.js is not included in dist
# if [ -f "rollup.config.mjs" ]; then
#   echo "skipping your package's postinstall routine."
#   exit 0
# fi

# copy files from dist folder into root project folder
echo 'Copying files from dist/types folder into root project folder...'
cp -r dist/types/* ./ && rm -rf dist/types

rm -rf dist

echo 'Postinstall done!'
