/* eslint-disable no-unused-vars */
import React from 'react'

import { Action, Thunk } from 'easy-peasy'

import { ListType, ShortlistInfo }             from '../API'
import { DynamicRow, EditableTableColumnType } from '../components'

import { StoreModel } from '.'

export type Shortlist = Omit<ShortlistInfo, '__typename'> // & { shortlist_id: string }

export interface DynamicDataModel {
  shortlists: {
    [shortlist_id: string]: Shortlist
  }
  columns: {
    [dataIndex: string]: EditableTableColumnType<DynamicRow>[]
  }
  rows: {
    [shortlist_id: string]: DynamicRow[]
  }
  isLoading: boolean
  isUpdating: boolean

  setIsLoading: Action<DynamicDataModel, boolean>
  setIsUpdating: Action<DynamicDataModel, boolean>

  setShortlist : Action<DynamicDataModel, { shortlist_id : string, shortlistInfo : Shortlist}>
  setShortlists: Action<DynamicDataModel, { [shortlist_id :string] : Shortlist  }>
  setColumn: Action<DynamicDataModel, { shortlist_id: string, columns: EditableTableColumnType<DynamicRow>[] }>
  setColumns: Action<DynamicDataModel, { [dataIndex: string]: EditableTableColumnType<DynamicRow>[] }>
  setRow: Action<DynamicDataModel, { shortlist_id: string, rows: DynamicRow[] }>
  setRows: Action<DynamicDataModel, { [shortlist_id: string]: DynamicRow[] }>

  addColumn: Thunk<DynamicDataModel, { shortlist_id: string, column: EditableTableColumnType<DynamicRow> }, any, StoreModel>
  toggleColumn: Thunk<DynamicDataModel, { shortlist_id: string, dataIndex: string }, any, StoreModel>
  deleteColumn: Thunk<DynamicDataModel, { shortlist_id: string, dataIndex: string }, any, StoreModel>
  deleteColumnCompletely: Thunk<DynamicDataModel, { shortlist_id: string, dataIndex: string }, any, StoreModel>
  restoreColumn: Thunk<DynamicDataModel, { shortlist_id: string, dataIndex: string }, any, StoreModel>
  updateColumn: Thunk<DynamicDataModel, { shortlist_id: string, column: EditableTableColumnType<DynamicRow> }, any, StoreModel>
  updateColumns: Thunk<DynamicDataModel, { shortlist_id: string, columns: EditableTableColumnType<DynamicRow>[] }, any, StoreModel>

  initializeShortlists: Thunk<DynamicDataModel, undefined, any, StoreModel>
  createShortlist: Thunk<DynamicDataModel, { shortlist_name: string, list_type: ListType, is_default: boolean }, any, StoreModel>
  deleteShortlist: Thunk<DynamicDataModel, { shortlist_id: string }, any, StoreModel>
  updateShortlist: Thunk<DynamicDataModel, { shortlist_id: string, shortlist_name: string }, any, StoreModel>

  createRow: Thunk<DynamicDataModel, { shortlist_id: string }, any, StoreModel>
  updateRow: Thunk<DynamicDataModel, { shortlist_id: string, row_id: string, row: DynamicRow }, any, StoreModel>
  updateCell: Thunk<DynamicDataModel, { shortlist_id: string, row_id: string, dataIndex: string, value: any }, any, StoreModel>
  deleteRow: Thunk<DynamicDataModel, { shortlist_id: string, row_id: string }, any, StoreModel>

  getMyShortlists: Thunk<DynamicDataModel, undefined, any, StoreModel>
  getRows: Thunk<DynamicDataModel, { shortlist_id: string }, any, StoreModel>
}
