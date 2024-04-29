import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import "./Grid.scss";

export type GridProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & GridPropsType;

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

type GirdContextType = {
  regular: boolean;
  width: number;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
  column: number;
  rowGap: number;
  columnGap: number;
  gridItemMetaData: GridItemMetaDataType[];
  setGridItemMetaData: React.Dispatch<React.SetStateAction<GridItemMetaDataType[]>>;
};

type GridItemMetaDataType = { uuid: string; size: { width: number; height: number } };

const GridContext = createContext<GirdContextType | null>(null);

const Grid = ({ regular = true, column = 4, columnGap = 8, rowGap = 8, ...props }: GridProps) => {
  const { gap, className, style, children, ...divProps } = props;

  const [gridItemMetaData, setGridItemMetaData] = useState<GridItemMetaDataType[]>([]);
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
      <div className={classNames("Mini-Grid-root")} ref={rootRef}>
        <div
          {...divProps}
          style={{ ...style, ...{ width, height, ...(regular ? { height: "auto", rowGap, columnGap, gridTemplateColumns: `repeat(${column}, 1fr)` } : {}) } }}
          className={classNames("Mini-Grid", className)}
          data-regular={regular}
        >
          {children ?? "Grid"}
        </div>
      </div>
    </GridContext.Provider>
  );
};

export type GridItemProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const GridItem = ({ ...props }: GridItemProps) => {
  const context = useContext(GridContext);

  if (!context) {
    throw new Error("GridItem must be used within a Grid");
  }

  const { regular } = context;

  if (regular) {
    return <GirdItemRegular {...props} />;
  }

  return <GridItemIrregular {...props} />;
};

const GirdItemRegular = ({ ...props }: GridItemProps) => {
  const context = useContext(GridContext);

  if (!context) {
    throw new Error("GridItem must be used within a Grid");
  }

  const { className, children, style, ...divProps } = props;

  return (
    <div {...divProps} style={{ ...style }} className={classNames("Mini-Grid-Item", "Mini-Grid-Item-Regular", className)}>
      {children ?? "GridItem"}
    </div>
  );
};

const GridItemIrregular = ({ ...props }: GridItemProps) => {
  const context = useContext(GridContext);

  if (!context) {
    throw new Error("GridItem must be used within a Grid");
  }

  const { className = {}, style, children, ...divProps } = props;

  const { gridItemMetaData, setGridItemMetaData, width, setHeight, column, rowGap, columnGap } = context;

  const ref = useRef<HTMLDivElement>(null);

  const [uuid] = useState(() => Math.random().toString(36).substring(7));

  const [irregularGridItemStyle, setIrregularGridItemStyle] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }
    const element = ref.current;

    const currentRootStyle = {
      width: width / column - columnGap * (1 - 1 / column),
      height: element.offsetHeight,
    };

    setIrregularGridItemStyle(currentRootStyle);

    setGridItemMetaData((prev) => [...prev, { uuid, size: currentRootStyle }]);

    return () => {
      setGridItemMetaData((prev) => prev.filter((item) => item.uuid !== uuid));
    };
  }, [uuid, width, column, columnGap, ref, ref.current]);

  const translateX = useMemo(() => {
    const targetIndex = gridItemMetaData.findIndex((meta) => meta.uuid === uuid);

    const translateX = gridItemMetaData.slice(column * Math.floor(targetIndex / column), targetIndex).reduce((acc, meta) => acc + meta.size.width + columnGap, 0);

    return translateX;
  }, [gridItemMetaData, columnGap, rowGap, uuid]);

  const translateY = useMemo(() => {
    const targetIndex = gridItemMetaData.findIndex((meta) => meta.uuid === uuid);

    const translateY = gridItemMetaData.slice(0, targetIndex).reduce((acc, meta, index) => {
      if (index % column === targetIndex % column) {
        return acc + meta.size.height + rowGap;
      }
      return acc;
    }, 0);

    return translateY;
  }, [gridItemMetaData, column, rowGap, uuid]);

  useEffect(() => {
    setHeight((prevHeight) => Math.max(prevHeight, translateY + (irregularGridItemStyle?.height || 0)));
  }, [translateY, irregularGridItemStyle?.height]);

  return (
    <div
      {...divProps}
      className={classNames("Mini-Grid-Item", "Mini-Grid-Item-Irregular", className)}
      style={{
        ...style,
        ...{
          top: 0,
          left: 0,
          width: irregularGridItemStyle?.width || "auto",
          height: irregularGridItemStyle?.height || "auto",
          transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
        },
      }}
      ref={ref}
    >
      {children ?? "GridItemIrregular"}
    </div>
  );
};

export default Grid;
