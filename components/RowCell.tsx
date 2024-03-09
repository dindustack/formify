import { ReactNode } from "react";
import { ElementsType } from "./Form/Elements";
import { TableCell } from "./ui/table";

type IRowCellProp = {
  type: ElementsType;
  value: string;
};

export function RowCell({ type, value }: IRowCellProp) {
  let node: ReactNode = value;
  return <TableCell>{node}</TableCell>;
}
