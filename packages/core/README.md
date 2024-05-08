# Install

```bash
$ yarn add @99mini/core
```

# Usage

## Table of Contents

[Ripple](#Ripple)

## Ripple

```tsx
import { Ripple } from "@99mini/core";
import { useRef } from "react";

const MyComponent = () => {
  const ref = useRef(null);
  return (
    <button style={{ position: "relative" }} ref={ref}>
      <Ripple parentRef={ref} />
      <span>hello</span>
    </button>
  );
};
```

1. parent element connect ref
2. Props of `Ripple` pass `parentRef={ref}`

# Dependency

[@99mini/utils](https://www.npmjs.com/package/@99mini/utils)
