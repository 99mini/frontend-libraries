import React from 'react';
import classNames from "classnames";
import './Grid.scss'

export type GridProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & GridPropsType;

type GridPropsType = {};

const Grid = ({...props}: GridProps) => {
  return (
    <div {...props} className={classNames("Mini-Grid", props.className)}>
      {props.children ?? "Grid"}
    </div>
  );
}

export default Grid;
