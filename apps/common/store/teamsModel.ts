import API, { GraphQLResult, graphqlOperation } from '@aws-amplify/api'

import {  action,  thunk } from 'easy-peasy'

import { get_team, get_teams } from '../graphql/queries'
import {  TeamsModel }         from '../types'
import * as APIt               from '../types/API'

export const teamsModel : TeamsModel = {
  data: null,
  selectedTeam: null,
  isLoading: false,
  error: null,

  setData: action((state, data) => {
    state.data = data
  }),
  setSelectedTeam: action((state, data) => {
    state.selectedTeam = data
  }),

  setError: action((state, error) => {
    state.error = error
  }),
  setIsLoading: action((state, isLoading) => {
    state.isLoading = isLoading
  }),

  getTeams: thunk(async (actions, payload) => {
    const getQV: APIt.Get_teamsQueryVariables = payload // { league_id: '8y39mp1h6jmojxg' }
    actions.setIsLoading(true)
    // @ts-ignore
    const getGQL: GraphQLResult<APIt.Get_teamsQuery> = await API.graphql(graphqlOperation(get_teams, getQV))
    actions.setIsLoading(false)
    if (getGQL.data) {
      const getQ: APIt.Get_teamsQuery = getGQL.data
      if (getQ.get_teams) {
        const allTeams: APIt.Team[] = getQ.get_teams
        actions.setData(allTeams)
      }
    }
  }),
  getTeam: thunk(async (actions, payload) => {
    const getQV: APIt.Get_teamQueryVariables = payload
    actions.setIsLoading(true)
    // @ts-ignore
    const getGQL: GraphQLResult<APIt.Get_teamQuery> = await API.graphql(graphqlOperation(get_team, getQV))
    actions.setIsLoading(false)

    if (getGQL.data) {
      const getQ: APIt.Get_teamQuery = getGQL.data
      if (getQ.get_team) {
        const team: APIt.Team = getQ.get_team
        actions.setSelectedTeam(team)
      }
    }
  })
}
