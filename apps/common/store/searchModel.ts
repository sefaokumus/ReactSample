import API, { GraphQLResult, graphqlOperation } from '@aws-amplify/api'

import {  action,  thunk } from 'easy-peasy'

import { findCountry, findLeague, findPlayer, findTeam } from '../graphql/myqueries'
import { search }                                        from '../graphql/queries'
import { SearchModel }                                   from '../types'
import * as APIt                                         from '../types/API'

export const searchModel : SearchModel = {
  searchResults: null,
  foundTeams: null,
  foundPlayers: null,
  foundLeagues: null,
  foundCountries: null,
  isLoading: false,
  error: null,

  setSearchResults: action((state, searchResults) => {
    state.searchResults = searchResults
  }),
  setFoundTeams: action((state, foundTeams) => {
    state.foundTeams = foundTeams
  }),
  setFoundPlayers: action((state, foundPlayers) => {
    state.foundPlayers = foundPlayers
  }),
  setFoundLeagues: action((state, foundLeagues) => {
    state.foundLeagues = foundLeagues
  }),
  setFoundCountries: action((state, foundCountries) => {
    state.foundCountries = foundCountries
  }),
  setError: action((state, error) => {
    state.error = error
  }),
  setIsLoading: action((state, isLoading) => {
    state.isLoading = isLoading
  }),

  search: thunk(async (actions, payload) => {
    const getQV: APIt.SearchQueryVariables = payload
    try {
      actions.setIsLoading(true)

      // @ts-ignore
      const getGQL: GraphQLResult<APIt.SearchQuery> = await API.graphql(graphqlOperation(search, getQV))
      console.log('searchModel.search: getQ.search')
      actions.setIsLoading(false)
      if (getGQL.data) {
        const getQ: APIt.SearchQuery = getGQL.data
        if (getQ.search) {
          const searchResults: APIt.MergedData = getQ.search
          actions.setSearchResults(searchResults)
        }
      }
    } catch (error) {
      actions.setError(error)
    } finally {
      actions.setIsLoading(false)
    }
  }),

  findTeam: thunk(async (actions, payload) => {
    const getQV: APIt.SearchQueryVariables = payload
    try {
      actions.setIsLoading(true)
      // @ts-ignore
      const getGQL: GraphQLResult<APIt.SearchQuery> = await API.graphql(graphqlOperation(findTeam, getQV))
      actions.setIsLoading(false)
      if (getGQL.data) {
        const getQ: APIt.SearchQuery = getGQL.data
        if (getQ.search) {
          const searchResults: APIt.MergedData['teams'] = getQ.search.teams
          actions.setFoundTeams(searchResults)
        }
      }
    } catch (error) {
      actions.setError(error)
    } finally {
      actions.setIsLoading(false)
    }
  }),
  findPlayer: thunk(async (actions, payload) => {
    const getQV: APIt.SearchQueryVariables = payload
    try {
      actions.setIsLoading(true)
      // @ts-ignore
      const getGQL: GraphQLResult<APIt.SearchQuery> = await API.graphql(graphqlOperation(findPlayer, getQV))
      actions.setIsLoading(false)
      if (getGQL.data) {
        const getQ: APIt.SearchQuery = getGQL.data
        if (getQ.search) {
          const searchResults: APIt.MergedData['players'] = getQ.search.players
          actions.setFoundPlayers(searchResults)
        }
      }
    } catch (error) {
      actions.setError(error)
    } finally {
      actions.setIsLoading(false)
    }
  }),
  findLeague: thunk(async (actions, payload) => {
    const getQV: APIt.SearchQueryVariables = payload
    try {
      actions.setIsLoading(true)
      // @ts-ignore
      const getGQL: GraphQLResult<APIt.SearchQuery> = await API.graphql(graphqlOperation(findLeague, getQV))
      actions.setIsLoading(false)
      if (getGQL.data) {
        const getQ: APIt.SearchQuery = getGQL.data
        if (getQ.search) {
          const searchResults: APIt.MergedData['leagues'] = getQ.search.leagues
          actions.setFoundLeagues(searchResults)
        }
      }
    } catch (error) {
      actions.setError(error)
    } finally {
      actions.setIsLoading(false)
    }
  }),
  findCountry: thunk(async (actions, payload) => {
    const getQV: APIt.SearchQueryVariables = payload
    try {
      actions.setIsLoading(true)
      // @ts-ignore
      const getGQL: GraphQLResult<APIt.SearchQuery> = await API.graphql(graphqlOperation(findCountry, getQV))
      actions.setIsLoading(false)
      if (getGQL.data) {
        const getQ: APIt.SearchQuery = getGQL.data
        if (getQ.search) {
          const searchResults: APIt.MergedData['countries'] = getQ.search.countries
          actions.setFoundCountries(searchResults)
        }
      }
    } catch (error) {
      actions.setError(error)
    } finally {
      actions.setIsLoading(false)
    }
  })

}
