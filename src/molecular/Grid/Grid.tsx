import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import "./Grid.scss";

export type GridProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & GridPropsType;

type GridPropsType = { regular?: boolean; column?: number; rowGap?: number; columnGap?: number; gap?: number };

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

const Grid = ({ ...props }: GridProps) => {
  const { regular = true, column, rowGap, columnGap, gap, className, style, children, ...divProps } = props;

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
    column: column ?? 4,
    rowGap: gap ?? rowGap ?? 8,
    columnGap: gap ?? columnGap ?? 8,
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
        <div {...divProps} style={{ ...style, ...{ width, height } }} className={classNames("Mini-Grid", className)} data-regular={regular}>
          {children ?? "Grid"}
        </div>
      </div>
    </GridContext.Provider>
  );
};

type GridItemProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

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
  const { className, children, ...divProps } = props;

  return (
    <div {...divProps} className={classNames("Mini-Grid-Item", "Mini-Grid-Item-Regular", className)}>
      {children ?? "GridItem"}
    </div>
  );
};

type GridItemIrregularRootStyleType = { width: number; height: number };

const GridItemIrregular = ({ ...props }: GridItemProps) => {
  const context = useContext(GridContext);

  if (!context) {
    throw new Error("GridItem must be used within a Grid");
  }

  const { className = {}, style, children, ...divProps } = props;

  const { gridItemMetaData, setGridItemMetaData, width, setHeight, column, rowGap, columnGap } = context;

  const ref = useRef<HTMLDivElement>(null);

  const [uuid] = useState(() => Math.random().toString(36).substring(7));

  const [rootStyle, setRootStyle] = useState<GridItemIrregularRootStyleType | null>(null);

  useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }
    const element = ref.current;

    const currentRootStyle = {
      width: width / column - columnGap * (1 - 1 / column),
      height: element.offsetHeight,
    };

    setRootStyle(currentRootStyle);

    setGridItemMetaData((prev) => [...prev, { uuid, size: currentRootStyle }]);

    return () => {
      setGridItemMetaData((prev) => prev.filter((item) => item.uuid !== uuid));
    };
  }, [uuid, width, column, ref, ref.current]);

  const translateX = useMemo(() => {
    const targetIndex = gridItemMetaData.findIndex((meta) => meta.uuid === uuid);

    const translateX = gridItemMetaData.slice(column * Math.floor(targetIndex / column), targetIndex).reduce((acc, meta) => acc + meta.size.width + rowGap, 0);

    return translateX;
  }, [gridItemMetaData]);

  const translateY = useMemo(() => {
    const targetIndex = gridItemMetaData.findIndex((meta) => meta.uuid === uuid);

    const translateY = gridItemMetaData.slice(0, targetIndex).reduce((acc, meta, index) => {
      if (index % column === targetIndex % column) {
        return acc + meta.size.height + columnGap;
      }
      return acc;
    }, 0);

    return translateY;
  }, [gridItemMetaData]);

  useEffect(() => {
    setHeight((prevHeight) => Math.max(prevHeight, translateY + (rootStyle?.height || 0)));
  }, [translateY, rootStyle?.height]);

  return (
    <div
      {...divProps}
      className={classNames("Mini-Grid-Item", "Mini-Grid-Item-Irregular", className)}
      style={{
        ...style,
        ...{
          top: 0,
          left: 0,
          width: rootStyle?.width || "auto",
          height: rootStyle?.height || "auto",
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
