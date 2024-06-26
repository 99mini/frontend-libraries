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

  const { irregular } = context;

  if (irregular) {
    return <GridItemIrregular context={context} {...props} />;
  }
  return <GirdItemRegular context={context} {...props} />;
};

const GirdItemRegular = ({
  context,
  ...props
}: GridItemProps & { context: GirdContextType }) => {
  const { className, children, ...divProps } = props;

  return (
    <div
      {...divProps}
      className={classNames(
        "YnI-Grid-Item",
        "YnI-Grid-Item-Regular",
        className,
      )}
    >
      {children}
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
    notGuaranteeOrder,
  } = context;

  const ref = useRef<HTMLDivElement>(null);

  const [uuid] = useState(() => Math.random().toString(36).substring(7));

  const [irregularGridItemStyle, setIrregularGridItemStyle] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const targetIndex = useMemo(
    () => gridItemMetaData.findIndex((meta) => meta.uuid === uuid),
    [gridItemMetaData, uuid],
  );

  const stackValue = useMemo(
    () =>
      gridItemMetaData
        .slice(0, targetIndex)
        .map((meta) => meta.size.height + rowGap)
        .reduce(
          (acc, cur) => {
            const minIdx = acc.findIndex((item) => item === Math.min(...acc));
            acc[minIdx] += cur;
            return acc;
          },
          Array.from({ length: column }).map((_) => 0),
        ),
    [gridItemMetaData, targetIndex, column, rowGap],
  );

  const minIndex = useMemo(() => {
    const targetRow = Math.floor(targetIndex / column);

    const ret =
      stackValue.indexOf(Math.min(...stackValue)) + targetRow * column;

    return ret;
  }, [stackValue, targetIndex, column]);

  const orderIndex = useMemo(
    () => (!notGuaranteeOrder || targetIndex < column ? targetIndex : minIndex),
    [notGuaranteeOrder, targetIndex, column, minIndex],
  );

  const translateX = useMemo(() => {
    const start = Math.max(
      column * Math.floor(orderIndex / column) - column,
      0,
    );
    const end = start + (orderIndex % column);
    return gridItemMetaData
      .slice(start, end)
      .reduce((acc, meta) => acc + meta.size.width + columnGap, 0);
  }, [gridItemMetaData, column, columnGap, orderIndex]);

  const translateY = useMemo(() => {
    if (notGuaranteeOrder) {
      return Math.min(...stackValue);
    }

    return gridItemMetaData.slice(0, targetIndex).reduce((acc, meta, index) => {
      if (index % column === targetIndex % column) {
        return acc + meta.size.height + rowGap;
      }
      return acc;
    }, 0);
  }, [
    gridItemMetaData,
    targetIndex,
    column,
    rowGap,
    stackValue,
    notGuaranteeOrder,
  ]);

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

    setGridItemMetaData((prev) => [
      ...prev,
      { uuid, order: orderIndex, size: currentRootStyle },
    ]);

    return () => {
      setGridItemMetaData((prev) => prev.filter((item) => item.uuid !== uuid));
    };
  }, [uuid, width, column, columnGap, setGridItemMetaData, orderIndex]);

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
        ...{
          top: 0,
          left: 0,
          width: irregularGridItemStyle?.width || "auto",
          transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
        },
        ...style,
      }}
      data-uuid={uuid}
      data-order={orderIndex}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default GridItem;
