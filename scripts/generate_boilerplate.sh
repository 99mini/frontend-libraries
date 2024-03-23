# generate_boilerplate.sh TARGET_DIR FILE
#
# EX.
# scripts/generate_boilerplate.sh atom Button
# 1. Create Base File
# /src/atom/
#   - Button.tsx
#   - Button.scss
#   - Button.stories.tsx
#   - index.ts
#
# Update src/atom/index.ts file
# ```
# // src/atom/index.ts
# ...
# export { default as Button } from "./Button";
# ```

# Check if correct number of arguments provided
if [ "$#" -ne 2 ]; then
	echo "Usage: $0 <directory> <filename>"
	exit 1
fi

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source "$SCRIPT_DIR/_constants.sh"

directory=$1
filename=$2

# Create directory if it doesn't exist
if [ ! -d "src/$directory/$filename" ]; then
	mkdir -p "src/$directory/$filename"
	echo -e "${GREEN}+ src/$directory/$filename${NC}"
else
	echo -e "src/$directory/$filename"
fi

# Call touch_file.sh script to create the file

scripts/_touch_file.sh "$directory" "$filename" "tsx"
scripts/_touch_file.sh "$directory" "$filename" "scss"
scripts/_touch_file.sh "$directory" "$filename" "stories.tsx"
scripts/_touch_file.sh "$directory" "$filename" "ts"
scripts/_update_index.sh "$directory" "$filename"