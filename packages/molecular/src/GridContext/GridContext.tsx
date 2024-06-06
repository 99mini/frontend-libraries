import { createContext } from "react";

export type GridItemMetaDataType = {
  uuid: string;
  size: { width: number; height: number };
};

export type GirdContextType = {
  regular: boolean;
  width: number;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
  column: number;
  rowGap: number;
  columnGap: number;
  gridItemMetaData: GridItemMetaDataType[];
  setGridItemMetaData: React.Dispatch<
    React.SetStateAction<GridItemMetaDataType[]>
  >;
};

const GridContext = createContext<GirdContextType | null>(null);

export default GridContext;
