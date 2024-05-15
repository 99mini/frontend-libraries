# Check if correct number of arguments provided
if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <directory> <component_name>"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/_constants.sh"

directory="$1"
component_name="$2"
index_file="packages/$directory/src/index.ts"

# Check if index.ts file exists
if [ -f "$index_file" ]; then
  # Check if the export line already exists
  if grep -q "export \* from \"./$component_name\";" "$index_file"; then
    echo -e "Skip:\tExport line already exists in $index_file"
    exit 1
  fi

  # Append export line to the end of the file
  echo "export * from \"./$component_name\";" >>"$index_file"
  echo -e "packages/$directory"
  echo -e "${YELLOW}  + $index_file${NC}"

  exit 0
fi

echo -e "${GREEN}+ packages/$directory/src/index.ts"

touch "$index_file"
echo "export * from \"./$component_name\";" >>"$index_file${NC}"
