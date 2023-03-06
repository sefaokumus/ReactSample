
import { Country, League,   Team }            from '../API'
import { FootType, PlayerStat, PositionType } from '../Player'
export declare type ElementOf<T> = T extends (infer E)[] ? E : T extends readonly (infer F)[] ? F : never;

// We use _col at the end of the properties because some keys are restricted in dynamodb
// https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ReservedWords.html
// this can be removed when we move to another database system
export declare const PresetColorTypes: ['pink', 'red', 'yellow', 'orange', 'cyan', 'green', 'blue', 'purple', 'geekblue', 'magenta', 'volcano', 'gold', 'lime']
export declare type PresetColorType = ElementOf<typeof PresetColorTypes>;

export type BudgetCellType = {
  currency: string;
  from?: number;
  to?: number;
}
export type SalaryCellType = {
  currency: string;
  from?: number;
  to?: number;
  salaryType: 'Net' | 'Gross';
}

export type SelectCellType = {
  value: string;
  label: string;
}

export type OptionType = {
  label: string
  color: PresetColorType
}

export type NumberCellType = [number, number]
export interface DynamicRow{
  row_id: string;
  [key: string]: Team | Team[] | PlayerStat | PlayerStat[] | League | Country | PositionType | PositionType[] | FootType | NumberCellType | BudgetCellType | SalaryCellType | SelectCellType | SelectCellType[] | string | number | boolean | undefined;
  createdAt_col?: number
  updatedAt_col?: number
  createdBy_col?: string
  updatedBy_col?: string
}
