rm -rf dist
echo "remove /dist"

rm -rf atom
echo "remove /atom"

rm -rf core
echo "remove /core"

# append additional dir
# rm -rf core
# echo "remove /core"

rm index.js
echo "remove index.js"

rm index.d.ts
echo "remove index.d.ts"

rollup -c
