import React, { Dispatch, createContext, useContext, useState } from "react";
import classNames from "classnames";
import { Button } from "@99mini/atom";

import "./Tab.scss";

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

let tabId = 0;

const TabContext = createContext<{
  activeTab: number;
  setActiveTab: Dispatch<React.SetStateAction<number>>;
}>({
  activeTab: tabId,
  setActiveTab: () => {},
});

const TabProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState(tabId);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};

export const Tabs = ({ ...props }: TabProps) => {
  return (
    <TabProvider>
      <div className={classNames("Mini-Tabs")}>{props.children}</div>
    </TabProvider>
  );
};

export const Tab = ({ ...props }: TabProps) => {
  const { href, className, onClick, ...divProps } = props;
  const context = useContext(TabContext);

  if (!context) {
    throw new Error("Tab must be used within a Tabs component");
  }

  const [id] = useState(() => tabId++);

  const isActive = context.activeTab === id;

  const handleClick = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>,
  ) => {
    context.setActiveTab(id);
    onClick && onClick(event);
  };

  return (
    <div {...divProps} className={classNames("Mini-Tab", className)}>
      <Button
        href={href}
        onClick={handleClick}
        className={classNames("Mini-Tab-Button", isActive ? "active" : "")}
      >
        {props.children}
      </Button>
    </div>
  );
};

export default Tab;
