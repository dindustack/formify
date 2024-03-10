import { ReactNode } from "react";
import { ElementsType } from "./Form/Elements";
import { TableCell } from "./ui/table";
import { Badge } from "./ui/badge";
import { format } from "date-fns";
import { Checkbox } from "./ui/checkbox";

type IRowCellProp = {
  type: ElementsType;
  value: string;
};

export function RowCell({ type, value }: IRowCellProp) {
  let node: ReactNode = value;

  switch (type) {
    case "DateField":
      if (!value) break;
      const date = new Date(value);
      node = <Badge variant={"outline"}>{format(date, "dd/MM/yyyy")}</Badge>;
      break;
    case "CheckBoxField":
      const checked = value === "true";
      node = (
        <Checkbox className="w-5 h-5" checked={checked} disabled />
      );
      break;
  }
  return <TableCell>{node}</TableCell>;
}
