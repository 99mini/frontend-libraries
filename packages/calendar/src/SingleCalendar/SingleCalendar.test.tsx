import { fireEvent, render, renderHook, waitFor } from "@testing-library/react";

import React from "react";
import SingleCalendar from "./SingleCalendar";

describe("SingleCalendar", () => {
  it("should select single date", async () => {
    const result = render(<SingleCalendar />);
    const dateCellList = result
      .getAllByRole("listitem")
      .filter((node) => node.className.includes("YnI-Calendar-Day"));

    const firstDate = dateCellList.find((node) => node.textContent === "1")!;

    await waitFor(() => {
      fireEvent.click(firstDate.firstChild!);
    });

    expect(
      ["selected"].every((className) =>
        firstDate.className.includes(className),
      ),
    ).toBeTruthy();
  });

  it("should throw error invalid date", () => {
    try {
      render(<SingleCalendar year={-1} />);
    } catch (error: any) {
      expect(error.message).toBe("invalid date");
    }
  });

  it("should select range", async () => {
    const result = render(<SingleCalendar range />);

    const dateCellList = result
      .getAllByRole("listitem")
      .filter((node) => node.className.includes("YnI-Calendar-Day"));

    const tenthDate = dateCellList.find((node) => node.textContent === "10")!;
    const eleventhDate = dateCellList.find(
      (node) => node.textContent === "11",
    )!;

    await waitFor(() => {
      fireEvent.click(tenthDate.firstChild!);
      fireEvent.click(eleventhDate.firstChild!);
    });

    expect(
      ["selected", "range", "range-start"].every((className) =>
        tenthDate.className.includes(className),
      ),
    ).toBeTruthy();

    expect(
      ["selected", "range", "range-end"].every((className) =>
        eleventhDate.className.includes(className),
      ),
    ).toBeTruthy();

    const firstDate = dateCellList.find((node) => node.textContent === "1")!;

    await waitFor(() => {
      fireEvent.click(firstDate.firstChild!);
    });

    expect(
      ["selected"].every((className) =>
        firstDate.className.includes(className),
      ) && !firstDate.className.includes("range"),
    ).toBeTruthy();
  });

  it("should render next and prev month", async () => {
    const result = render(<SingleCalendar pagenation year={2024} month={1} />);

    const Buttons = result.getAllByRole("button");

    const nextButton = Buttons.find((node) => node.textContent === "next")!;
    const prevButton = Buttons.find((node) => node.textContent === "prev")!;

    await waitFor(() => {
      fireEvent.click(prevButton);
      const yearMonth = result.getByText("2023년, 12월");

      expect(yearMonth).toBeTruthy();
    });

    await waitFor(() => {
      fireEvent.click(prevButton);
      const yearMonth = result.getByText("2023년, 11월");

      expect(yearMonth).toBeTruthy();
    });

    await waitFor(() => {
      fireEvent.click(nextButton);
      const yearMonth = result.getByText("2023년, 12월");

      expect(yearMonth).toBeTruthy();
    });

    await waitFor(() => {
      fireEvent.click(nextButton);
      const yearMonth = result.getByText("2024년, 1월");

      expect(yearMonth).toBeTruthy();
    });
  });

  it("should render eng month", async () => {
    const result = render(<SingleCalendar year={2024} month={6} locale="en" />);

    const yearMonth = result.getByText("2024, Jun");

    expect(yearMonth).toBeTruthy();
  });

  it("should call onDateChange", async () => {
    const onDateChange = jest.fn();
    const result = render(<SingleCalendar onDateChange={onDateChange} />);

    const dateCellList = result
      .getAllByRole("listitem")
      .filter((node) => node.className.includes("YnI-Calendar-Day"));

    const firstDate = dateCellList.find((node) => node.textContent === "1")!;

    await waitFor(() => {
      fireEvent.click(firstDate.firstChild!);
    });

    expect(onDateChange).toBeCalled();
  });

  it("should not select date when readonly", async () => {
    const result = render(<SingleCalendar readonly />);

    const dateCellList = result
      .getAllByRole("listitem")
      .filter((node) => node.className.includes("YnI-Calendar-Day"));

    const firstDate = dateCellList.find((node) => node.textContent === "1")!;

    await waitFor(() => {
      fireEvent.click(firstDate.firstChild!);

      expect(
        ["selected"].every((className) =>
          firstDate.className.includes(className),
        ),
      ).toBeFalsy();
    });
  });
});
