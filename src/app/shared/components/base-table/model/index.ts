import { Subject } from 'rxjs';

export interface IDataGridPage {
  show: boolean;
  currentPage: number;
  pageRange: number;
  pageSize: number;
  totalRecord: number;
  startIndex: number;
  endIndex: number;
  calc: (totalRecord: number) => void;
  updatePageEvent: Subject<any>;
  visiblePages: number[];
  totalPage: number;
  goToPage: (pageNumber: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  goToLastPage: () => void;
  goToFirstPage: () => void;
}
export interface IDataGridColumn {
  name?: string;
  prop?: string;
  headerStyle?: string;
  dataStyle?: string;
  style?: string;
}

export interface IDataGridButton {
  icon: string;
  style?: string;
  tooltip?: string;
  hide?: boolean;
  hideWhen?: (row: any) => boolean;
  disable?: boolean;
  disableWhen?: (row: any) => boolean;
  invisible?: boolean;
  invisibleWhen?: (row: any) => boolean;
  onClick?: (row: any, index?: any) => any;
}

export interface IDataGridCheckBox {
  show: boolean;
  selected: any[];
  hideWhen: (row: any) => boolean;
  disableWhen: (row: any) => boolean;
  onChange: (checked: boolean, row: any, wrappedRows?: any[]) => void;
  onChangeAll: (checked: boolean, wrappedRows?: any[]) => void;
}

export interface IDataGridManipulation {
  show?: boolean;
  label?: string;
  buttons?: IDataGridButton[];
}

export interface DataGrid {
  update: () => any;
}

export interface DataGridRow {
  index: number;
  data: any;
}
