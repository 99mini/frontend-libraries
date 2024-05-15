# gcb.sh TARGET_DIR FILE
# gcb is an abbreviation for generate component boilerplate
#
# EX.
# scripts/gcb.sh atom Button
# 1. Create Base File
# /packages/atom/Button/src
#   - Button.tsx
#   - Button.scss
#   - Button.stories.tsx
#   - index.ts
#
# Update packages/atom/src/index.ts file
# ```
# // packages/atom/src/index.ts
# ...
# export * from "./Button";
# ```

# Check if correct number of arguments provided
if [ "$#" -ne 2 ]; then
	echo "Usage: $0 <directory> <filename>"
	exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/_constants.sh"

directory=$1
filename=$2

# Create directory if it doesn't exist
if [ ! -d "packages/$directory/src/$filename" ]; then
	mkdir -p "packages/$directory/src/$filename"
	echo -e "${GREEN}+ packages/$directory/src/$filename${NC}"
else
	echo -e "packages/$directory/src/$filename"
fi

# Initialize arrays to store output and exit codes
outputs=()
exit_codes=()

# Call touch_file.sh script to create each file
extension_names=("tsx" "scss" "stories.tsx" "ts")
for ((i = 0; i < ${#extension_names[@]}; i++)); do
	extension="${extension_names[i]}"
	output=$(scripts/_touch_file.sh "$directory" "$filename" "$extension")
	exit_code=$?

	outputs+=("$output")
	exit_codes+=("$exit_code")
done

# Call update_index.sh script to update the $driectory/indes.ts file
output=$(scripts/_update_index.sh "$directory" "$filename")
exit_code=$?
outputs+=("$output")
exit_codes+=("$exit_code")

# Output success codes
for ((i = 0; i < ${#outputs[@]}; i++)); do
	if [ "${exit_codes[i]}" -eq 0 ]; then
		echo -e "${outputs[i]}"
	fi
done

# Output failure codes
for ((i = 0; i < ${#outputs[@]}; i++)); do
	if [ "${exit_codes[i]}" -ne 0 ]; then
		echo -e "${outputs[i]}"
	fi
done
