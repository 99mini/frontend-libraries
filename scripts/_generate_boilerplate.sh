# _generate_boilerplate.sh TARGET_DIR FILE
#
# EX.
# scripts/_generate_boilerplate.sh atom Button
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

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
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
