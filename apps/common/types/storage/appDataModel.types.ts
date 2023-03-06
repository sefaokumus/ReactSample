
import { Action, Thunk } from 'easy-peasy'

import {
  AnalysisChart,
  SavedFilter,
  StoreModel
} from '..'

export interface AppDataModel  {
  isFullScreen: boolean
  savedFilters: SavedFilter[]
  analysisCharts: AnalysisChart[]

  setIsFullScreen: Action<AppDataModel, boolean>
  toggleFullScreen: Action<AppDataModel>

  setSavedFilters: Action<AppDataModel, SavedFilter[]>
  setAnalysisCharts: Action<AppDataModel, AnalysisChart[]>

  addToSavedFilters: Thunk<AppDataModel, SavedFilter>
  removeFromSavedFilters: Thunk<AppDataModel, string>
  clearSavedFilters: Thunk<AppDataModel>

  addToAnalysisCharts: Thunk<AppDataModel, AnalysisChart>
  removeFromAnalysisCharts: Thunk<AppDataModel, string>
  toggleAnalysisChart: Thunk<AppDataModel, string>
  clearAnalysisCharts: Thunk<AppDataModel>

  getRemoteSettings: Thunk<AppDataModel, null, any, StoreModel>
  setRemoteSettings: Thunk<AppDataModel, null, any, StoreModel>

}
