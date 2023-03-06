import { Action, Thunk } from 'easy-peasy'

import {   Get_playersQueryVariables, Get_player_season_statQueryVariables,  Player,  PlayerSeasonStat } from '../API'

export interface PlayersModel {
  data: Player[] | null
  selectedPlayer: PlayerSeasonStat | null
  isLoading: boolean
  error: any

  setData: Action<PlayersModel, Player[] | null>
  setSelectedPlayer: Action<PlayersModel, PlayerSeasonStat | null>
  setError: Action<PlayersModel, any>
  setIsLoading: Action<PlayersModel, boolean>

  getPlayers: Thunk<PlayersModel, Get_playersQueryVariables>
  getPlayer: Thunk<PlayersModel, Get_player_season_statQueryVariables>

}
