import { Action, Thunk } from 'easy-peasy'

import { Country, Get_countryQueryVariables } from '../API'

export interface CountriesModel {
  data: Country[] | null
  selectedCountry: Country | null
  isLoading: boolean
  error: any

  setData: Action<CountriesModel, Country[] | null>
  setSelectedCountry: Action<CountriesModel, Country | null>
  setError: Action<CountriesModel, any>
  setIsLoading: Action<CountriesModel, boolean>

  getCountries: Thunk<CountriesModel>
  getCountry: Thunk<CountriesModel, Get_countryQueryVariables>

}
