import { Dispatch, createContext } from "react";

export let tabId = 0;

export type TabContextType = {
  activeTab: number;
  setActiveTab: Dispatch<React.SetStateAction<number>>;
  animation: boolean;
  tabsLeft: number;
  setTabWidth: Dispatch<React.SetStateAction<number>>;
  setTabLeft: Dispatch<React.SetStateAction<number>>;
};

export const TabContextGenerator = (tabId: number) =>
  createContext<TabContextType>({
    activeTab: tabId,
    setActiveTab: () => {},
    animation: true,
    tabsLeft: 0,
    setTabWidth: () => {},
    setTabLeft: () => {},
  });

export const TabContext = TabContextGenerator(tabId);
export const incrementTabId = () => tabId++;
