import API, { GraphQLResult, graphqlOperation } from '@aws-amplify/api'

import {  action,  thunk } from 'easy-peasy'

import { get_players, get_player_season_stat } from '../graphql/queries'
import {  PlayersModel }                       from '../types'
import * as APIt                               from '../types/API'

export const playersModel : PlayersModel = {
  data: null,
  selectedPlayer: null,
  isLoading: false,
  error: null,

  setData: action((state, data) => {
    state.data = data
  }),
  setSelectedPlayer: action((state, data) => {
    state.selectedPlayer = data
  }),
  setError: action((state, error) => {
    state.error = error
  }),
  setIsLoading: action((state, isLoading) => {
    state.isLoading = isLoading
  }),

  getPlayers: thunk(async (actions, payload) => {
    const getQV: APIt.Get_playersQueryVariables = payload // { league_id: '8y39mp1h6jmojxg' }

    try {
      actions.setIsLoading(true)
      // @ts-ignore
      const getGQL: GraphQLResult<APIt.Get_playersQuery> = await API.graphql(graphqlOperation(get_players, getQV))
      actions.setIsLoading(false)
      if (getGQL.data) {
        const getQ: APIt.Get_playersQuery = getGQL.data
        if (getQ.get_players) {
          const allPlayers: APIt.Player[] = getQ.get_players
          actions.setData(allPlayers)
        }
      }
    } catch (e) {
      if (e.data && e.data.get_players) {
        console.log(e.data.get_players)
        const allPlayers: APIt.Player[] = e.data.get_players
        actions.setData(allPlayers)
        return
      }
      actions.setError(e)
    } finally {
      actions.setIsLoading(false)
    }
  }),

  getPlayer: thunk(async (actions, payload) => {
    const getQV: APIt.Get_player_season_statQueryVariables = payload // { player_id: '8y39mp1h6jmojxg' }

    try {
      actions.setIsLoading(true)

      // @ts-ignore
      const getGQL: GraphQLResult<APIt.Get_player_season_statQuery> = await API.graphql(graphqlOperation(get_player_season_stat, getQV))
      actions.setIsLoading(false)

      if (getGQL.data) {
        const getQ: APIt.Get_player_season_statQuery = getGQL.data
        if (getQ.get_player_season_stat) {
          console.log(getQ.get_player_season_stat)

          const player: APIt.PlayerSeasonStat = getQ.get_player_season_stat[0]
          actions.setSelectedPlayer(player)
        }
      }
    } catch (e) {
      if (e.data && e.data.get_player_season_stat) {
        console.log(e.data.get_player_season_stat)
        const player: APIt.PlayerSeasonStat = e.data.get_player_season_stat[0]
        actions.setSelectedPlayer(player)
        return
      }
      console.log(e)
      actions.setError(e)
    } finally {
      actions.setIsLoading(false)
    }
  })

}
