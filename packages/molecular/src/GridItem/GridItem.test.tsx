import { render, waitFor } from "@testing-library/react";

import React from "react";
import Grid from "../Grid";
import GridItem from "./GridItem";

describe("GridItem", () => {
  it("should throw error without Grid parent", () => {
    try {
      render(<GridItem></GridItem>);
    } catch (error: any) {
      expect(error.message).toBe("GridItem must be used within a Grid");
    }
  });

  it("should render regular grid item", () => {
    const result = render(
      <Grid>
        <GridItem></GridItem>
      </Grid>,
    );
    expect(result).toBeTruthy();
  });

  it("should render irregular grid", async () => {
    const result = render(
      <Grid regular={false} gap={10} column={2}>
        <GridItem data-testid={"1"}>
          <div style={{ height: 100 }}>1</div>
        </GridItem>
        <GridItem data-testid={"2"}>
          <div style={{ height: 50 }}>2</div>
        </GridItem>
        <GridItem data-testid={"3"}>
          <div style={{ height: 50 }}>3</div>
        </GridItem>
      </Grid>,
    );

    const first = result.getByTestId("1");
    const second = result.getByTestId("2");
    const third = result.getByTestId("3");

    await waitFor(() => {
      expect(first.style.transform).toBe("translate3d(0px, 0px, 0)");
      expect(second.style.transform).toBe("translate3d(5px, 0px, 0)");
      expect(third.style.transform).toBe("translate3d(0px, 10px, 0)");
    });

    expect(result).toBeTruthy();
  });
});
