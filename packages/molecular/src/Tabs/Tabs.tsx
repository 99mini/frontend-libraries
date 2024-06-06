import React, { useEffect, useRef, useState } from "react";

import classNames from "classnames";

import { TabContext, tabId } from "../TabContext/TabContext";

import "./Tab.css";

export type TabsProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  TabsPropsType;

type TabsPropsType = {
  animation?: boolean;
};

export const Tabs = ({ animation = true, ...props }: TabsProps) => {
  const { className, children, ...rest } = props;

  const [activeTab, setActiveTab] = useState(tabId);
  const [tabWidth, setTabWidth] = useState(0);
  const [tabLeft, setTabLeft] = useState(0);

  const tabsRef = useRef<HTMLDivElement>(null);
  const [tabsLeft, setTabsLeft] = useState(0);

  useEffect(() => {
    if (tabsRef.current) {
      setTabsLeft(tabsRef.current.getBoundingClientRect().left);
    }
  }, []);

  return (
    <TabContext.Provider
      value={{
        activeTab,
        setActiveTab,
        tabsLeft,
        animation,
        setTabWidth,
        setTabLeft,
      }}
    >
      <div
        {...rest}
        className={classNames(
          "YnI-Tabs",
          className,
          animation ? "animation" : "",
        )}
        ref={tabsRef}
      >
        {children}
        {animation && (
          <div
            className={classNames("YnI-Tabs-Indicator")}
            style={{
              width: tabWidth,
              left: tabLeft,
            }}
          />
        )}
      </div>
    </TabContext.Provider>
  );
};

export default Tabs;
