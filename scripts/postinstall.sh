#!/usr/bin/env bash
set -e

# skip postinstall if npm install for development
# rollup.config.js is not included in dist
if [ -f "rollup.config.mjs" ]; then
  echo "skipping your package's postinstall routine."
  exit 0
fi

# copy files from dist folder into root project folder
#
# echo 'Copying files from dist folder into ${sub_directory} project folder...'
# cp -r ${sub_directory}/dist/* ./${sub_directory} && rm -rf ${sub_directory}/dist

# copy files from dist folder into root project folder
echo 'Copying files from dist folder into root project folder...'
cp -r dist/* ./ && rm -rf dist

# copy files from dist folder into atom project folder
echo 'Copying files from dist folder into atom project folder...'
cp -r atom/dist/* ./atom && rm -rf atom/dist

# copy files from dist folder into core project folder
echo 'Copying files from dist folder into core project folder...'
cp -r core/dist/* ./core && rm -rf core/dist

echo 'Postinstall done!'
