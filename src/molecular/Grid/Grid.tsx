import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import "./Grid.scss";

export type GridProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & GridPropsType;

type GridPropsType = { regular?: boolean; column?: number; rowGap?: number; columnGap?: number; gap?: number };

type GirdContextType = {
  regular: boolean;
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

  const rootContext: GirdContextType = { regular, gridItemMetaData, setGridItemMetaData, column: column ?? 4, rowGap: gap ?? rowGap ?? 8, columnGap: gap ?? columnGap ?? 8 };

  return (
    <GridContext.Provider value={rootContext}>
      <div {...divProps} style={{ ...style }} className={classNames("Mini-Grid", className)} data-regular={regular}>
        {children ?? "Grid"}
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

  const { gridItemMetaData, setGridItemMetaData, column, rowGap, columnGap } = context;

  const ref = useRef<HTMLDivElement>(null);

  const [uuid] = useState(() => Math.random().toString(36).substring(7));

  /**
   * @description
   * calculate the position of the grid item
   * - `translateX`: calculate relative translateX based on prevent grid item
   * - `translateY`: calculate relative translateY based on prevent grid item
   * - `width`: calculate component width useing useRef
   * - `height`: calculate component height useing useRef
   */
  const [rootStyle, setRootStyle] = useState<GridItemIrregularRootStyleType | null>(null);

  useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }
    const element = ref.current;

    const currentRootStyle = {
      width: 200,
      height: element.offsetHeight,
    };

    setRootStyle(currentRootStyle);

    setGridItemMetaData((prev) => [...prev, { uuid, size: currentRootStyle }]);

    console.count(`${uuid}: ${currentRootStyle.width}, ${currentRootStyle.height}`);

    return () => {
      setGridItemMetaData((prev) => prev.filter((item) => item.uuid !== uuid));
    };
  }, [uuid]);

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
