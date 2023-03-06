/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */

import { StatEnum } from './Player'
export * from './storage'
export * from './Player'
export * from './components'
export * from './API'

export enum InputTypeEnum  {
  'text' = 'Text',
  'url' = 'URL',
  'number' = 'Number',
  'date' = 'Date',
  'select' = 'Select',
  'multiselect' = 'Multiselect',
  'radio' = 'Radio',
  'range' = 'Range',
  'salary' = 'Salary',
  'budget' = 'Budget',
  'checkbox' = 'Checkbox',
  'teamSelect' = 'Team Select',
  'playerSelect' = 'Player Select',
  'multiplayerSelect' = 'Multiplayer Select',
  'countrySelect' = 'Country Select',
  'leagueSelect' = 'League Select',
  'positionSelect' = 'Position Select',
  'footSelect' = 'Foot Select',
}

export enum CurrencyEnum  {
  USD = '$',
  EUR = '€',
  GBP = '£'
}
export type CurrencyType = keyof typeof CurrencyEnum

export interface PlayerFilter{
  name: string
  id: string
  type: keyof typeof InputTypeEnum | 'filter'
  options?: PlayerFilter[] | string[]| {label : string, value :string}[] | any[]
  hideTitle ?: boolean
  range?: [number, number]
  minVal?: number
  maxVal?: number
}



type SelectedFilterValue = string | [number, number]  | { id: string, name: string } | any[] | null

export interface SelectedFilter {
  name: string,
  id: string,
  type: keyof typeof InputTypeEnum | 'filter'
  value: SelectedFilterValue
}
export interface SavedFilter{
  id?: string
  type : 'analysis' | 'attributes'
  filterName: string
  filters: SelectedFilter[]
  charts: AnalysisChart[]
}

export type ScreenFilterObjType = {
  [key: SelectedFilter['id'] ]: SelectedFilter
}

export interface AnalysisChart   {
  id?: string,
  xField: StatEnum,
  yField: StatEnum,
  visible?: boolean,
  isDefault?: boolean
}
