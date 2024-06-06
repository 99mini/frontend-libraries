import React, { useContext, useEffect, useMemo, useRef, useState } from "react";

import classNames from "classnames";

import { GirdContextType, GridContext } from "../GridContext";

import "./GridItem.css";

export type GridItemProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const GridItem = ({ ...props }: GridItemProps) => {
  const context = useContext(GridContext);

  if (!context) {
    throw new Error("GridItem must be used within a Grid");
  }

  const { regular } = context;

  if (regular) {
    return <GirdItemRegular context={context} {...props} />;
  }

  return <GridItemIrregular context={context} {...props} />;
};

const GirdItemRegular = ({
  context,
  ...props
}: GridItemProps & { context: GirdContextType }) => {
  const { className, children, style, ...divProps } = props;

  return (
    <div
      {...divProps}
      style={{ ...style }}
      className={classNames(
        "YnI-Grid-Item",
        "YnI-Grid-Item-Regular",
        className,
      )}
    >
      {children ?? "GridItem"}
    </div>
  );
};

const GridItemIrregular = ({
  context,
  ...props
}: GridItemProps & { context: GirdContextType }) => {
  const { className = {}, style, children, ...divProps } = props;

  const {
    gridItemMetaData,
    setGridItemMetaData,
    width,
    setHeight,
    column,
    rowGap,
    columnGap,
  } = context;

  const ref = useRef<HTMLDivElement>(null);

  const [uuid] = useState(() => Math.random().toString(36).substring(7));

  const [irregularGridItemStyle, setIrregularGridItemStyle] = useState<{
    width: number;
    height: number;
  } | null>(null);

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
    const targetIndex = gridItemMetaData.findIndex(
      (meta) => meta.uuid === uuid,
    );

    const translateX = gridItemMetaData
      .slice(column * Math.floor(targetIndex / column), targetIndex)
      .reduce((acc, meta) => acc + meta.size.width + columnGap, 0);

    return translateX;
  }, [gridItemMetaData, columnGap, rowGap, uuid]);

  const translateY = useMemo(() => {
    const targetIndex = gridItemMetaData.findIndex(
      (meta) => meta.uuid === uuid,
    );

    const translateY = gridItemMetaData
      .slice(0, targetIndex)
      .reduce((acc, meta, index) => {
        if (index % column === targetIndex % column) {
          return acc + meta.size.height + rowGap;
        }
        return acc;
      }, 0);

    return translateY;
  }, [gridItemMetaData, column, rowGap, uuid]);

  useEffect(() => {
    setHeight((prevHeight) =>
      Math.max(prevHeight, translateY + (irregularGridItemStyle?.height || 0)),
    );
  }, [translateY, irregularGridItemStyle?.height]);

  return (
    <div
      {...divProps}
      className={classNames(
        "YnI-Grid-Item",
        "YnI-Grid-Item-Irregular",
        className,
      )}
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
export default GridItem;
