comment=$1
PACKAGES=$(ls -d packages/*)

for package in $PACKAGES; do
  cd $package && yarn $comment && cd ../..
done

yarn $comment
