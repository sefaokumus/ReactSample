import { AppDataModel }     from './appDataModel.types'
import { AuthModel }        from './authModel.types'
import { CountriesModel }   from './countriesModel.types'
import { DynamicDataModel } from './dynamicDataModal.types'
import { FiltersModel }     from './filtersModel.types'
import { LeaguesModel }     from './leaguesModel.types'
import { PlayersModel }     from './playersModel.types'
import { SearchModel }      from './searchModel.types'
import { TeamsModel }       from './teamsModel.types'

export * from './appDataModel.types'
export * from './authModel.types'
export * from './countriesModel.types'
export * from './leaguesModel.types'
export * from './teamsModel.types'
export * from './playersModel.types'
export * from './searchModel.types'
export * from './dynamicDataModal.types'
export * from './filtersModel.types'

export interface StoreModel{
  auth: AuthModel
  appData: AppDataModel
  countries: CountriesModel
  leagues: LeaguesModel
  teams: TeamsModel
  players: PlayersModel
  search: SearchModel
  dynamicData: DynamicDataModel
  filters: FiltersModel
}
