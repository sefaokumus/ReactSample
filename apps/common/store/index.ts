import { Amplify }              from 'aws-amplify'
import { createStore, persist } from 'easy-peasy'

import awsConfig      from '../constants/awsConfig'
import { StoreModel } from '../types'

import { appDataModel }     from './appDataModel'
import { authModel }        from './authModel'
import { countriesModel }   from './countriesModel'
import { dynamicDataModel } from './dynamicDataModel'
import { filtersModel }     from './filtersModel'
import { leaguesModel }     from './leaguesModel'
import { playersModel }     from './playersModel'
import { searchModel }      from './searchModel'
import { teamsModel }       from './teamsModel'
Amplify.configure(awsConfig)

const store = createStore<StoreModel>(
  persist(
    {
      auth: authModel,
      appData: appDataModel,
      countries: countriesModel,
      leagues: leaguesModel,
      teams: teamsModel,
      players: playersModel,
      search: searchModel,
      dynamicData: dynamicDataModel,
      filters: filtersModel
    },
    {
      storage: 'localStorage',
      deny: ['search']
    }
  )
)

export default store
