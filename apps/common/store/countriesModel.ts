import API, { GraphQLResult, graphqlOperation } from '@aws-amplify/api'

import {  action,  thunk } from 'easy-peasy'

import { get_countries, get_country } from '../graphql/queries'
import {  CountriesModel }            from '../types'
import * as APIt                      from '../types/API'

export const countriesModel : CountriesModel = {
  data: null,
  selectedCountry: null,
  isLoading: false,
  error: null,

  setData: action((state, data) => {
    state.data = data
  }),
  setSelectedCountry: action((state, country) => {
    state.selectedCountry = country
  }),

  setError: action((state, error) => {
    state.error = error
  }),
  setIsLoading: action((state, isLoading) => {
    state.isLoading = isLoading
  }),

  getCountries: thunk(async (actions, payload) => {
    actions.setIsLoading(true)
    // @ts-ignore
    const getGQL: GraphQLResult<APIt.Get_countriesQuery> = await API.graphql(graphqlOperation(get_countries))
    actions.setIsLoading(false)
    if (getGQL.data) {
      const getQ: APIt.Get_countriesQuery = getGQL.data
      if (getQ.get_countries) {
        const allCountries: APIt.Country[] = getQ.get_countries
        actions.setData(allCountries)
      }
    }
  }),
  getCountry: thunk(async (actions, payload) => {
    const getQV: APIt.Get_countryQueryVariables = payload
    actions.setIsLoading(true)
    // @ts-ignore
    const getGQL: GraphQLResult<APIt.Get_countryQuery> = await API.graphql(graphqlOperation(get_country, getQV))
    actions.setIsLoading(false)
    if (getGQL.data) {
      const getQ: APIt.Get_countryQuery = getGQL.data
      if (getQ.get_country) {
        const country: APIt.Country = getQ.get_country
        actions.setSelectedCountry(country)
      }
    }
  })

}
