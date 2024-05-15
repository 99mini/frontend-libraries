rm -rf ./src/*
touch ./src/index.ts

ls -d ../../packages/*/src/*/ | while read line; do
  package=$(echo $line | cut -d'/' -f4)
  component=$(echo $line | cut -d'/' -f6)

  echo "export * from \"@99mini/$package/$component\";" >>./src/index.ts
  echo "update index.ts with $package/$component"

  mkdir ./src/$component

  echo "export * from \"@99mini/$package/$component\";" >./src/$component/index.ts
  echo "export { default } from \"@99mini/$package/$component\";" >>./src/$component/index.ts

  echo "create $package/$component"
done

rm -rf dist && rollup -c rollup.config.js
