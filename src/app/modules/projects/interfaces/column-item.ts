import { NzTableSortFn, NzTableSortOrder } from "ng-zorro-antd/table";
import { DataItem } from "./data-item";

export interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<DataItem> | null;
  sortDirections: NzTableSortOrder[];
}
