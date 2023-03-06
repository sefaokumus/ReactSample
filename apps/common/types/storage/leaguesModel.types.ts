import { Action, Thunk } from 'easy-peasy'

import { Get_leagueQueryVariables, Get_leaguesQueryVariables, League } from '../API'

export interface LeaguesModel {
  data: League[] | null
  selectedLeague: League | null
  isLoading: boolean
  error: any

  setData: Action<LeaguesModel, League[] | null>
  setSelectedLeague: Action<LeaguesModel, League | null>
  setError: Action<LeaguesModel, any>
  setIsLoading: Action<LeaguesModel, boolean>

  getLeagues: Thunk<LeaguesModel, Get_leaguesQueryVariables>
  getLeague: Thunk<LeaguesModel, Get_leagueQueryVariables>

}
