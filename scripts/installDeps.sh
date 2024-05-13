PACKAGES=$(ls -d packages/*)

for package in $PACKAGES; do
  echo "Installing $package"
  cd $package && npm run cp:postinstall && cd ../..
done
