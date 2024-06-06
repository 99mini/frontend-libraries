import React, { useContext, useEffect, useRef, useState } from "react";

import classNames from "classnames";

import { Button } from "@99mini/atom";

import { TabContext, incrementTabId } from "../TabContext/TabContext";

export type TabProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  TabPropsType;

type TabPropsType = {
  href?: string;
  onClick?: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>,
  ) => void;
};

export const Tab = ({ ...props }: TabProps) => {
  const { href, className, onClick, ...divProps } = props;
  const context = useContext(TabContext);

  const {
    activeTab,
    setActiveTab,
    animation,
    tabsLeft,
    setTabLeft,
    setTabWidth,
  } = context;

  const [id] = useState(() => incrementTabId());
  const tabRef = useRef<HTMLDivElement>(null);

  const isActive = activeTab === id;

  const handleClick = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>,
  ) => {
    setActiveTab(id);
    onClick && onClick(event);
  };

  useEffect(() => {
    if (!animation || !isActive) {
      return;
    }

    const tabEl = tabRef.current;

    if (!tabEl) {
      return;
    }

    const tabRect = tabEl.getBoundingClientRect();

    setTabWidth(tabRect.width);
    setTabLeft(tabRect.left - tabsLeft);
  }, [animation, isActive, tabsLeft]);

  return (
    <div
      {...divProps}
      className={classNames("YnI-Tab", isActive ? "active" : "", className)}
      ref={tabRef}
    >
      <Button
        href={href}
        onClick={handleClick}
        className={classNames("YnI-Tab-Button")}
      >
        {props.children}
      </Button>
    </div>
  );
};

export default Tab;
