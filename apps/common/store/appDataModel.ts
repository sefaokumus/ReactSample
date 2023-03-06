import API, { GraphQLResult, graphqlOperation } from '@aws-amplify/api'

import { action, thunk } from 'easy-peasy'

import { defaultAnalysisCharts } from '../constants/defaultAnalysisCharts'

import { set_user_settings }        from '../graphql/mutations'
import { get_user_setting }         from '../graphql/queries'
import { AppDataModel, StoreModel } from '../types'
import * as APIt                    from '../types/API'

export const appDataModel : AppDataModel = {
  isFullScreen: false,
  savedFilters: [],
  analysisCharts: defaultAnalysisCharts,

  setIsFullScreen: action((state, isFullScreen) => {
    state.isFullScreen = isFullScreen
  }),
  toggleFullScreen: action(state => {
    state.isFullScreen = !state.isFullScreen
  }),
  setSavedFilters: action((state, savedFilters) => {
    state.savedFilters = savedFilters
  }),
  setAnalysisCharts: action((state, analysisCharts) => {
    state.analysisCharts = analysisCharts
  }),

  addToSavedFilters: thunk(async (actions, payload, { getState }) => {
    // generate unique id
    const id = Math.random().toString(36).substr(2, 9)
    actions.setSavedFilters([...getState().savedFilters, { id, ...payload }])
    actions.setRemoteSettings()
  }),
  removeFromSavedFilters: thunk(async (actions, payload, { getState }) => {
    actions.setSavedFilters(getState().savedFilters.filter(filter => filter.id !== payload))
    actions.setRemoteSettings()
  }),
  clearSavedFilters: thunk(async (actions, payload, { getState }) => {
    actions.setSavedFilters([])
    actions.setRemoteSettings()
  }),

  addToAnalysisCharts: thunk(async (actions, payload, { getState }) => {
    // generate unique id
    const id = Math.random().toString(36).substr(2, 9)
    actions.setAnalysisCharts([...getState().analysisCharts, { id, ...payload }])
    actions.setRemoteSettings()
  }),
  removeFromAnalysisCharts: thunk(async (actions, payload, { getState }) => {
    actions.setAnalysisCharts(getState().analysisCharts.filter(chart => chart.id !== payload))
    actions.setRemoteSettings()
  }),
  toggleAnalysisChart: thunk(async (actions, payload, { getState }) => {
    actions.setAnalysisCharts(getState().analysisCharts.map(chart => {
      if (chart.id === payload) {
        return { ...chart, visible: !chart.visible }
      }
      return chart
    }))

    actions.setRemoteSettings()
  }),
  clearAnalysisCharts: thunk(async (actions, payload, { getState }) => {
    actions.setAnalysisCharts(getState().analysisCharts.filter(chart => chart.isDefault))
    actions.setRemoteSettings()
  }),

  getRemoteSettings: thunk(async (actions, _, { getStoreState, getStoreActions }) => {
    // @ts-ignore
    const getGQL: GraphQLResult<APIt.Get_user_settingQuery> = await API.graphql(graphqlOperation(get_user_setting))
    if (getGQL.data) {
      const getQ: APIt.Get_user_settingQuery = getGQL.data
      if (getQ.get_user_setting) {
        const settings                = getQ.get_user_setting
        const settingsObj: StoreModel = JSON.parse(settings)

        if (settingsObj?.appData?.isFullScreen) {
          actions.setIsFullScreen(settingsObj.appData.isFullScreen)
        }
        if (settingsObj?.appData?.savedFilters) {
          actions.setSavedFilters(settingsObj.appData.savedFilters)
        }
        if (settingsObj?.appData?.analysisCharts) {
          actions.setAnalysisCharts(settingsObj.appData.analysisCharts)
        }

        if (settingsObj?.dynamicData?.columns) {
          getStoreActions().dynamicData.setColumns(settingsObj.dynamicData.columns)
        }

        if (settingsObj?.dynamicData?.data) {
          getStoreActions().dynamicData.setDatas(settingsObj.dynamicData.data)
        }
      }
    }
  }),

  setRemoteSettings: thunk(async (actions, payload, { getState, getStoreState }) => {
    const state = getStoreState()
    // const updateI: APIt.Set_user_settingsMutation           = { set_user_settings: JSON.stringify(state) }
    const updateMV: APIt.Set_user_settingsMutationVariables = {
      config: JSON.stringify({ appData: state.appData, dynamicData: { columns: state?.dynamicData?.columns } })
    }
    // @ts-ignore
    const setUserSettingsResult: GraphQLResult<APIt.Set_user_settingsMutation> = await API.graphql(graphqlOperation(set_user_settings, updateMV))
    if (setUserSettingsResult.data) {
      const setUSM: APIt.Set_user_settingsMutation = setUserSettingsResult.data
      if (setUSM.set_user_settings) {
        console.log('set user settings :', setUSM.set_user_settings)
      }
    }
  })

}
