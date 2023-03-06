import API, { GraphQLResult, graphqlOperation } from '@aws-amplify/api'

import {  action,  thunk } from 'easy-peasy'

import { sql }                                                         from '../graphql/queries'
import { FiltersModel  }                                               from '../types'
import * as APIt                                                       from '../types/API'
import { convertPlayerSeasonStatsToPlayerStats, getValuesRecursively } from '../utils/helper'
import {  attributeGroupingColumns }                                   from '../utils/sqlGenerator'

export const filtersModel: FiltersModel = {
  analysis: [],
  attributes: [],
  selectedPlayers: [],
  isLoading: false,
  isSelecting: false,
  error: null,

  setAnalysis: action((state, analysis) => {
    state.analysis = analysis
  }),
  setSelectedPlayers: action((state, selectedPlayers) => {
    state.selectedPlayers = selectedPlayers
  }),
  setAttributes: action((state, attributes) => {
    state.attributes = attributes
  }),
  setError: action((state, error) => {
    state.error = error
  }),
  setIsLoading: action((state, isLoading) => {
    state.isLoading = isLoading
  }),
  setIsSelecting: action((state, isSelecting) => {
    state.isSelecting = isSelecting
  }),
  queryAnalysis: thunk(async (actions, payload) => {
    const getQV: APIt.SqlQueryVariables = payload
    if (payload.query === '')     {
      actions.setAnalysis([])
      return
    }
    try {
      actions.setIsLoading(true)

      // @ts-ignore
      const getGQL: GraphQLResult<APIt.SqlQuery> = await API.graphql(graphqlOperation(sql, getQV))
      actions.setIsLoading(false)
      if (getGQL.data) {
        const getQ: APIt.SqlQuery = getGQL.data
        if (getQ.sql) {
          const players: APIt.PlayerSeasonStat[] = JSON.parse(getQ.sql).map(row => row._source)

          const convertedPlayers = convertPlayerSeasonStatsToPlayerStats(players)
          actions.setAnalysis(convertedPlayers)
        }
      }
    } catch (error) {
      console.log(error)
      actions.setError(error)
    } finally {
      actions.setIsLoading(false)
    }
  }),

  querySelectedPlayers: thunk(async (actions, payload) => {
    const getQV: APIt.SqlQueryVariables = payload
    actions.setSelectedPlayers([])
    if (payload.query === '') {
      return
    }
    try {
      actions.setIsSelecting(true)

      // @ts-ignore
      const getGQL: GraphQLResult<APIt.SqlQuery> = await API.graphql(graphqlOperation(sql, getQV))
      actions.setIsSelecting(false)
      if (getGQL.data) {
        const getQ: APIt.SqlQuery = getGQL.data
        if (getQ.sql) {
          const players: APIt.PlayerSeasonStat[] = JSON.parse(getQ.sql).map(row => row._source)

          const convertedPlayers = convertPlayerSeasonStatsToPlayerStats(players)
          actions.setSelectedPlayers(convertedPlayers)
        }
      }
    } catch (error) {
      console.log(error)
      actions.setError(error)
    } finally {
      actions.setIsLoading(false)
      actions.setIsSelecting(false)
    }
  }),

  queryAttributes: thunk(async (actions, payload) => {
    const getQV: APIt.SqlQueryVariables = payload
    if (payload.query === '')     {
      actions.setAttributes([])
      return
    }
    try {
      actions.setIsLoading(true)

      // @ts-ignore
      const getGQL: GraphQLResult<APIt.SqlQuery> = await API.graphql(graphqlOperation(sql, getQV))
      actions.setIsLoading(false)
      if (getGQL.data) {
        const getQ: APIt.SqlQuery = getGQL.data
        if (getQ.sql) {
          const players: APIt.PlayerSeasonStat[] = JSON.parse(getQ.sql).map(row => row._source)

          const convertedPlayers = convertPlayerSeasonStatsToPlayerStats(players)
          actions.setAttributes(convertedPlayers)
        }
      }
    } catch (error) {
      console.log(error)
      actions.setError(error)
    } finally {
      actions.setIsLoading(false)
    }
  })
}
