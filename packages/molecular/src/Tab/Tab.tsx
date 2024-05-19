import React, {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { Button } from "@99mini/atom";

import "./Tab.scss";

export type TabProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  TabPropsType;

export type TabsProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  TabsPropsType;

type TabPropsType = {
  href?: string;
  onClick?: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>,
  ) => void;
};
type TabsPropsType = {
  animation?: boolean;
};

let tabId = 0;

type TabContextType = {
  activeTab: number;
  setActiveTab: Dispatch<React.SetStateAction<number>>;
  animation: boolean;
  tabsLeft: number;
  setTabWidth: Dispatch<React.SetStateAction<number>>;
  setTabLeft: Dispatch<React.SetStateAction<number>>;
};

const TabContext = createContext<TabContextType>({
  activeTab: tabId,
  setActiveTab: () => {},
  animation: true,
  tabsLeft: 0,
  setTabWidth: () => {},
  setTabLeft: () => {},
});

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

export const Tab = ({ ...props }: TabProps) => {
  const { href, className, onClick, ...divProps } = props;
  const context = useContext(TabContext);

  if (!context) {
    throw new Error("Tab must be used within a Tabs component");
  }

  const {
    activeTab,
    setActiveTab,
    animation,
    tabsLeft,
    setTabLeft,
    setTabWidth,
  } = context;

  const [id] = useState(() => tabId++);
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
