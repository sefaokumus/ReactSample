import type { ColumnType, TableProps } from 'antd/es/table'

import { InputTypeEnum, OptionType, DynamicRow } from '..'

export * from './DynamicDataTypes'

export interface EditableRowProps {
  index: number;
}

export interface EditableCellProps {
  title: React.ReactNode;
  editable?: boolean;
  children: React.ReactNode;
  dataIndex: string
  inputType: keyof typeof InputTypeEnum
  record: any;
  isRequired?: boolean;
  isDefault?: boolean;
  isHidden?: boolean;
  options? : any[];
  handleUpdateRow: (dataIndex: string, record:any) => void;
}

export type EditableTableColumnType<T> = ColumnType<T> & {
  editable?: boolean;
  isRequired?: boolean,
  inputType: EditableCellProps['inputType'],
  isDefault?: boolean,
  isHidden?: boolean,
  isDeleted?: boolean,
  options?: any[],
}

export type EditableTableProps<T> = TableProps<T> & {
  tableId : string,
  columns: EditableTableColumnType<T>[];
  extraItem?: JSX.Element,
  editable?: boolean,
  setColumns: (columns: EditableTableColumnType<T>[]) => void;
  handleAddRow?: () => void
  handleDeleteRow?: (row_id: string) => void
  handleUpdateRow?: (dataIndex : string, row: T) => void
  handleAddColumn?: (dataIndex :keyof typeof InputTypeEnum) => EditableTableColumnType<any>
  handleDeleteColumn?: (dataIndex: string) => void
  handleUpdateColumn?: (column: EditableTableColumnType<T>) => void,
  handleToggleColumnVisibility?: (dataIndex: string) => void,

  customRenderers? : (dataIndex: any, inputType: keyof typeof InputTypeEnum, options?: OptionType[], isEditable?: boolean) => any
  customSorters?: (dataIndex: any, inputType: keyof typeof InputTypeEnum) => any
  customFilters? : (dataIndex: any, inputType: keyof typeof InputTypeEnum, dataSource?: readonly DynamicRow[]) => any
}

export type CustomFormProps = {
  submitForm: () => void;
  resetForm: () => void;
};
