import React, { useEffect, useRef, useState } from "react";

import classNames from "classnames";

import {
  GirdContextType,
  GridContext,
  GridItemMetaDataType,
} from "../GridContext";

import "./Grid.css";

export type GridProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  GridPropsType;

type GridPropsType = {
  /**
   * If true, the grid will be `regular`, otherwise it will be `irregular`.
   * `Irrgular` grid is `masnory` layout.
   */
  regular?: boolean;
  /**
   * count of column
   */
  column?: number;
  /**
   * row gap
   */
  rowGap?: number;
  /**
   * column gap
   */
  columnGap?: number;
  /**
   * force `columnGap` and `rowGap` to be the same value
   */
  gap?: number;
};

const Grid = ({
  regular = true,
  column = 4,
  columnGap = 8,
  rowGap = 8,
  ...props
}: GridProps) => {
  const { gap, className, style, children, ...divProps } = props;

  const [gridItemMetaData, setGridItemMetaData] = useState<
    GridItemMetaDataType[]
  >([]);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  const rootRef = useRef<HTMLDivElement>(null);

  const rootContext: GirdContextType = {
    regular,
    gridItemMetaData,
    setGridItemMetaData,
    width,
    setHeight,
    column,
    rowGap: gap ?? rowGap,
    columnGap: gap ?? columnGap,
  };

  useEffect(() => {
    if (!rootRef || !rootRef.current) {
      return;
    }

    const element = rootRef.current;

    setWidth(element.offsetWidth);
  }, [rootRef, rootRef.current]);

  return (
    <GridContext.Provider value={rootContext}>
      <div className={classNames("YnI-Grid-Root")} ref={rootRef}>
        <div
          {...divProps}
          style={{
            ...style,
            ...{
              width,
              height,
              ...(regular
                ? {
                    height: "auto",
                    rowGap,
                    columnGap,
                    gridTemplateColumns: `repeat(${column}, 1fr)`,
                  }
                : {}),
            },
          }}
          className={classNames("YnI-Grid", className)}
          data-regular={regular}
        >
          {children ?? "Grid"}
        </div>
      </div>
    </GridContext.Provider>
  );
};

export default Grid;
