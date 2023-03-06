import { Action, Thunk } from 'easy-peasy'

import { Get_teamQueryVariables, Get_teamsQueryVariables, Team } from '../API'

export interface TeamsModel {
  data: Team[] | null
  selectedTeam: Team | null
  isLoading: boolean
  error: any

  setData: Action<TeamsModel, Team[] | null>
  setSelectedTeam: Action<TeamsModel, Team | null>
  setError: Action<TeamsModel, any>
  setIsLoading: Action<TeamsModel, boolean>

  getTeams: Thunk<TeamsModel, Get_teamsQueryVariables>
  getTeam: Thunk<TeamsModel, Get_teamQueryVariables>
}
