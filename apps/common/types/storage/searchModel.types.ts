import { Action, Thunk } from 'easy-peasy'

import { MergedData, SearchQueryVariables } from '../API'

export interface SearchModel {
  searchResults: MergedData | null
  foundTeams: MergedData['teams'] | null
  foundPlayers: MergedData['players'] | null
  foundLeagues: MergedData['leagues'] | null
  foundCountries: MergedData['countries'] | null
  isLoading: boolean
  error: any

  setSearchResults: Action<SearchModel, MergedData | null>
  setFoundTeams: Action<SearchModel, MergedData['teams'] | null>
  setFoundPlayers: Action<SearchModel, MergedData['players'] | null>
  setFoundLeagues: Action<SearchModel, MergedData['leagues'] | null>
  setFoundCountries: Action<SearchModel, MergedData['countries'] | null>
  setError: Action<SearchModel, any>
  setIsLoading: Action<SearchModel, boolean>

  search: Thunk<SearchModel, SearchQueryVariables>
  findTeam: Thunk<SearchModel, SearchQueryVariables>
  findPlayer: Thunk<SearchModel, SearchQueryVariables>
  findLeague: Thunk<SearchModel, SearchQueryVariables>
  findCountry: Thunk<SearchModel, SearchQueryVariables>

}
