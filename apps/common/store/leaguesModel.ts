import API, { GraphQLResult, graphqlOperation } from '@aws-amplify/api'

import {  action,  thunk } from 'easy-peasy'

import { get_league, get_leagues } from '../graphql/queries'
import {  LeaguesModel }           from '../types'
import * as APIt                   from '../types/API'

export const leaguesModel : LeaguesModel = {
  data: null,
  selectedLeague: null,
  isLoading: false,
  error: null,

  setData: action((state, data) => {
    state.data = data
  }),
  setSelectedLeague: action((state, selectedLeague) => {
    state.selectedLeague = selectedLeague
  }),

  setError: action((state, error) => {
    state.error = error
  }),
  setIsLoading: action((state, isLoading) => {
    state.isLoading = isLoading
  }),

  getLeagues: thunk(async (actions, payload) => {
    const getQV: APIt.Get_leaguesQueryVariables = payload
    actions.setIsLoading(true)
    // @ts-ignore
    const getGQL: GraphQLResult<APIt.Get_leaguesQuery> = await API.graphql(graphqlOperation(get_leagues, getQV))
    actions.setIsLoading(false)
    if (getGQL.data) {
      const getQ: APIt.Get_leaguesQuery = getGQL.data
      if (getQ.get_leagues) {
        const allLeagues: APIt.League[] = getQ.get_leagues
        actions.setData(allLeagues)
      }
    }
  }),
  getLeague: thunk(async (actions, payload) => {
    const getQV: APIt.Get_leagueQueryVariables = payload
    actions.setIsLoading(true)
    // @ts-ignore
    const getGQL: GraphQLResult<APIt.Get_leagueQuery> = await API.graphql(graphqlOperation(get_league, getQV))
    actions.setIsLoading(false)
    if (getGQL.data) {
      const getQ: APIt.Get_leagueQuery = getGQL.data
      if (getQ.get_league) {
        const league: APIt.League = getQ.get_league
        actions.setSelectedLeague(league)
      }
    }
  })
}
