comment=$1
PACKAGES=$(ls -d packages/*)

for package in $PACKAGES; do
  echo "Running $comment in $package"
  cd $package && yarn $comment && cd ../..
done

yarn $comment
