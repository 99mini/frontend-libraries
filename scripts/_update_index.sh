# Check if correct number of arguments provided
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <directory> <component_name>"
    exit 1
fi

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source "$SCRIPT_DIR/_constants.sh"

directory="$1"
component_name="$2"
index_file="src/$directory/index.ts"

# Check if index.ts file exists
if [ -f "$index_file" ]; then
    # Check if the export line already exists
    if grep -q "export { default as $component_name } from \"./$component_name\";" "$index_file"; then
        echo -e "[$0]\tSkip: Export line already exists in $index_file"
        exit 0
    fi

    # Append export line to the end of the file
    echo "export { default as $component_name } from \"./$component_name\";" >> "$index_file"
    echo -e "src/$directory"
    echo -e "${YELLOW}  + $index_file${NC}"
else
    echo -e "[$0]\tError: $index_file does not exist."
    exit 1
fi