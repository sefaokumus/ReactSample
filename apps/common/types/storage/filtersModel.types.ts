import { Action, Thunk } from 'easy-peasy'

import {  SqlQueryVariables  } from '../API'
import { PlayerStat }          from '../Player'

export interface FiltersModel {
  analysis: PlayerStat[]
  attributes: PlayerStat[]
  selectedPlayers: PlayerStat[]
  isLoading: boolean
  isSelecting: boolean
  error: any

  setAnalysis: Action<FiltersModel, PlayerStat[]>
  setSelectedPlayers: Action<FiltersModel, PlayerStat[]>
  setAttributes: Action<FiltersModel, PlayerStat[]>
  setIsSelecting: Action<FiltersModel, boolean>
  setIsLoading: Action<FiltersModel, boolean>
  setError: Action<FiltersModel, any>

  queryAnalysis: Thunk<FiltersModel, SqlQueryVariables>
  querySelectedPlayers: Thunk<FiltersModel, SqlQueryVariables>

  queryAttributes: Thunk<FiltersModel, SqlQueryVariables>

}
