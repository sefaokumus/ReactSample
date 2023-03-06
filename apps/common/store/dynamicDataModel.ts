import { GraphQLResult }         from '@aws-amplify/api-graphql'
import { API, graphqlOperation } from 'aws-amplify'
import { action, thunk }         from 'easy-peasy'
import moment                    from 'moment'

import { defaultClubNeedsTableColumns }                                                             from '../constants/defaultClubNeedsTableColumns'
import { defaultShortlistTableColumns }                                                             from '../constants/defaultShortlistTableColumns'
import { create_row, create_shortlist, delete_row, delete_shortlist, update_row, update_shortlist } from '../graphql/mutations'
import { get_my_shortlists, get_rows }                                                              from '../graphql/queries'

import { DynamicDataModel, Shortlist } from '../types'
import * as APIt                       from '../types/API'
import { tryParseJson }                from '../utils/helper'

export const dynamicDataModel: DynamicDataModel = {
  shortlists: {},
  columns: {
  },
  rows: {
  },
  isLoading: false,
  isUpdating: false,

  setIsLoading: action((state, payload) => {
    state.isLoading = payload
  }),
  setIsUpdating: action((state, payload) => {
    state.isUpdating = payload
  }),

  setShortlist: action((state, payload) => {
    console.log(payload.shortlistInfo)
    state.shortlists[payload.shortlist_id] = payload.shortlistInfo
  }),
  setShortlists: action((state, payload) => {
    state.shortlists = payload
  }),
  setColumn: action((state, payload) => {
    state.columns[payload.shortlist_id] = payload.columns
  }),
  setColumns: action((state, payload) => {
    state.columns = payload
  }),

  setRow: action((state, payload) => {
    state.rows[payload.shortlist_id] = payload.rows
  }),
  setRows: action((state, payload) => {
    state.rows = payload
  }),

  addColumn: thunk(async (actions, payload, { getState, getStoreActions }) => {
    // generate unique dataIndex
    actions.setColumn({
      shortlist_id: payload.shortlist_id,
      columns: [...getState().columns[payload.shortlist_id], payload.column]
    })
    getStoreActions().appData.setRemoteSettings()
  }),
  deleteColumn: thunk(async (actions, payload, { getState, getStoreActions }) => {
    // set column as isDeleted
    actions.setColumn({
      shortlist_id: payload.shortlist_id,
      columns: getState().columns[payload.shortlist_id].map(column => {
        if (column.dataIndex === payload.dataIndex) {
          return { ...column, isDeleted: true }
        }
        return column
      })
    })
    getStoreActions().appData.setRemoteSettings()
  }),
  restoreColumn: thunk(async (actions, payload, { getState, getStoreActions }) => {
    // set columns is deleted to false
    actions.setColumn({
      shortlist_id: payload.shortlist_id,
      columns: getState().columns[payload.shortlist_id].map(column => {
        if (column.dataIndex === payload.dataIndex) {
          return { ...column, isDeleted: false }
        }
        return column
      })
    })
    getStoreActions().appData.setRemoteSettings()
  }),
  updateColumn: thunk(async (actions, payload, { getState, getStoreActions }) => {
    // update column
    actions.setColumn({
      shortlist_id: payload.shortlist_id,
      columns: getState().columns[payload.shortlist_id].map(column => {
        if (column.dataIndex === payload.column.dataIndex) {
          return { ...column, ...payload.column }
        }
        return column
      })
    })
    getStoreActions().appData.setRemoteSettings()
  }),
  updateColumns: thunk(async (actions, payload, { getState, getStoreActions }) => {
    // update columns
    actions.setColumn({
      shortlist_id: payload.shortlist_id,
      columns: payload.columns
    })
    getStoreActions().appData.setRemoteSettings()
  }),
  deleteColumnCompletely: thunk(async (actions, payload, { getState, getStoreActions }) => {
    // delete column from columns
    actions.setColumn({
      shortlist_id: payload.shortlist_id,
      // @ts-ignore
      columns: getState().columns[payload.shortlist_id].filter(column => column.dataIndex !== payload.dataIndex)
    })
    getStoreActions().appData.setRemoteSettings()
  }),
  toggleColumn: thunk(async (actions, payload, { getState, getStoreActions }) => {
    // toggle column
    actions.setColumn({
      shortlist_id: payload.shortlist_id,
      columns: getState().columns[payload.shortlist_id].map(column => {
        if (column.dataIndex === payload.dataIndex) {
          return { ...column, isHidden: !column.isHidden }
        }
        return column
      })
    })
    getStoreActions().appData.setRemoteSettings()
  }),

  initializeShortlists: thunk(async (actions, _, { getStoreActions }) => {
    // create initial shortlists clubneeds and shortlist

    try {
      // @ts-ignore
      const createClubneedsResult: GraphQLResult<APIt.Create_shortlistMutation> = await API.graphql(graphqlOperation(create_shortlist, {
        shortlist_name: 'Club Needs',
        list_type: APIt.ListType.Clubneed,
        is_default: true
      }))

      // @ts-ignore
      const createShortListResult: GraphQLResult<APIt.Create_shortlistMutation> = await API.graphql(graphqlOperation(create_shortlist, {
        shortlist_name: 'My Shortlist',
        list_type: APIt.ListType.Shortlist,
        is_default: true
      }))

      actions.setShortlists({
        [createClubneedsResult.data.create_shortlist.shortlist_id]: createClubneedsResult.data.create_shortlist,
        [createShortListResult.data.create_shortlist.shortlist_id]: createShortListResult.data.create_shortlist
      })

      actions.setColumn({
        shortlist_id: createClubneedsResult.data.create_shortlist.shortlist_id,
        columns: defaultClubNeedsTableColumns
      })

      actions.setColumn({
        shortlist_id: createShortListResult.data.create_shortlist.shortlist_id,
        columns: defaultShortlistTableColumns
      })

      getStoreActions().appData.setRemoteSettings()
    } catch (e) {
      console.log(e)
    } finally {
      actions.setIsLoading(false)
    }
  }),
  createShortlist: thunk(async (actions, payload, { getState }) => {
    // create shortlist table
    actions.setIsLoading(true)

    const createShortlistMutationMV: APIt.Create_shortlistMutationVariables = {
      shortlist_name: payload.shortlist_name,
      list_type: payload.list_type,
      is_default: payload.is_default
    }

    try {
    // @ts-ignore
      const createShortListResult: GraphQLResult<APIt.Create_shortlistMutation> = await API.graphql(graphqlOperation(create_shortlist, createShortlistMutationMV))

      actions.setIsLoading(false)
      if (createShortListResult.data) {
        const setUSM: APIt.Create_shortlistMutation = createShortListResult.data
        if (setUSM.create_shortlist) {
        // then update the row with unique key

          actions.setShortlist({
            shortlist_id: setUSM.create_shortlist.shortlist_id,
            shortlistInfo: {
              shortlist_id: setUSM.create_shortlist.shortlist_id,
              shortlist_name: setUSM.create_shortlist.shortlist_name,
              owner_id: setUSM.create_shortlist.owner_id,
              shared_type: setUSM.create_shortlist.shared_type,
              shared_users: setUSM.create_shortlist.shared_users,
              list_type: setUSM.create_shortlist.list_type,
              is_default: setUSM.create_shortlist.is_default
            }
          })

          actions.setColumn({
            shortlist_id: createShortListResult.data.create_shortlist.shortlist_id,
            columns: setUSM.create_shortlist.list_type === APIt.ListType.Clubneed ? defaultClubNeedsTableColumns : defaultShortlistTableColumns
          })
        }
      }
    } catch (e) {
      console.log(e)
    } finally {
      actions.setIsLoading(false)
    }
  }),
  deleteShortlist: thunk(async (actions, payload, { getState, getStoreActions }) => {
    // delete shortlist table
    actions.setIsLoading(true)

    const deleteShortlistMutationMV: APIt.Delete_shortlistMutationVariables = {
      shortlist_id: payload.shortlist_id
    }

    try {
      await API.graphql(graphqlOperation(delete_shortlist, deleteShortlistMutationMV))

      actions.setIsLoading(false)
      // remove columns of shortlist from actions.columns
      const shortlists = getState().shortlists
      delete shortlists[payload.shortlist_id]
      actions.setShortlists(shortlists)

      const columns = getState().columns
      delete columns[payload.shortlist_id]
      actions.setColumns(columns)

      getStoreActions().appData.setRemoteSettings()
    } catch (e) {
      console.log(e)
    } finally {
      actions.setIsLoading(false)
    }
  }),

  updateShortlist: thunk(async (actions, payload, { getState, getStoreActions }) => {
    // update shortlist table
    actions.setIsLoading(true)

    const updateShortlistMutationMV: APIt.Update_shortlistMutationVariables = {
      shortlist_id: payload.shortlist_id,
      shortlist_name: payload.shortlist_name
    }

    try {
      // @ts-ignore
      const updateShortListResult: GraphQLResult<APIt.Update_shortlistMutation> = await
      API.graphql(graphqlOperation(update_shortlist, updateShortlistMutationMV))

      actions.setIsLoading(false)
      if (updateShortListResult.data) {
        const setUSM: APIt.Update_shortlistMutation = updateShortListResult.data
        if (setUSM.update_shortlist) {
          // then update the row with unique key
          actions.setShortlist({
            shortlist_id: setUSM.update_shortlist.shortlist_id,
            shortlistInfo: {
              shortlist_id: setUSM.update_shortlist.shortlist_id,
              shortlist_name: setUSM.update_shortlist.shortlist_name,
              owner_id: setUSM.update_shortlist.owner_id,
              shared_type: setUSM.update_shortlist.shared_type,
              shared_users: setUSM.update_shortlist.shared_users,
              list_type: setUSM.update_shortlist.list_type,
              is_default: setUSM.update_shortlist.is_default
            }
          })
        }
      }
    } catch (e) {
      console.log(e)
    } finally {
      actions.setIsLoading(false)
    }
  }),

  createRow: thunk(async (actions, payload, { getState }) => {
    // add row

    const tempRowId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    // first create the row before getting unique dataIndex from server in order not to keep user waiting
    actions.setRow({
      shortlist_id: payload.shortlist_id,
      rows: [...getState().rows[payload.shortlist_id], {
        row_id: tempRowId
      }]
    })

    // then get unique key from server
    const createRowMV: APIt.Create_rowMutationVariables = {
      shortlist_id: payload.shortlist_id
    }

    // @ts-ignore
    const createRowResult: GraphQLResult<APIt.Create_rowMutation> = await API.graphql(graphqlOperation(create_row, createRowMV))
    if (createRowResult.data) {
      const createRowResultData: APIt.Create_rowMutation = createRowResult.data
      if (createRowResultData.create_row) {
        // then update the row with unique key

        actions.setRow({
          shortlist_id: payload.shortlist_id,
          rows: getState().rows[payload.shortlist_id].map(row => {
            if (row.row_id === tempRowId) {
              return {
                ...row,
                row_id: createRowResultData.create_row
              }
            }
            return row
          }
          )
        })
      }
    }
  }),
  deleteRow: thunk(async (actions, payload, { getState, getStoreActions }) => {
    // first delete row from ui table
    actions.setRow({
      shortlist_id: payload.shortlist_id,
      rows: getState().rows[payload.shortlist_id].filter(row => row.row_id !== payload.row_id)
    })

    // then delete row from server
    const deleteRowMV: APIt.Delete_rowMutationVariables = {
      shortlist_id: payload.shortlist_id,
      row_id: payload.row_id
    }
    // @ts-ignore
    await API.graphql(graphqlOperation(delete_row, deleteRowMV))
    console.log('deleted', payload.row_id)
  }),

  updateRow: thunk(async (actions, payload, { getState, getStoreState }) => {
    // first update UI table row

    actions.setRow({
      shortlist_id: payload.shortlist_id,
      rows: getState().rows[payload.shortlist_id].map(row => {
        if (row.row_id === payload.row.row_id) {
          return {
            ...row,
            ...payload.row,
            updatedAt_col: moment().unix(),
            updatedBy_col: getStoreState().auth.data.username
          }
        }
        return row
      })
    })
  }),

  updateCell: thunk(async (actions, payload, { getState, getStoreState }) => {
    // first update UI table cell
    const { shortlist_id, dataIndex, row_id, value } = payload
    actions.setRow({
      shortlist_id,
      rows: getState().rows[shortlist_id].map(row => {
        if (row.row_id === row_id) {
          return {
            ...row,
            [dataIndex]: value,
            updatedAt_col: moment().unix(),
            updatedBy_col: getStoreState().auth.data.username
          }
        }
        return row
      })
    })

    // then update server cell
    const updateRowMV: APIt.Update_rowMutationVariables = {
      shortlist_id: shortlist_id as string,
      row_id: row_id as string,
      row_datas: [
        {
          column: dataIndex as string,
          value: `${typeof value === 'string' ? value : JSON.stringify(value)}`
        }
      ]
    }
    // @ts-ignore
    const updateRowResult: GraphQLResult<APIt.Update_rowMutation> = await API.graphql(graphqlOperation(update_row, updateRowMV))
    if (updateRowResult.data) {
      const updateRowData: APIt.Update_rowMutation = updateRowResult.data
      if (updateRowData.update_row) {
        return updateRowData.update_row
      }
    }
  }),

  getMyShortlists: thunk(async (actions) => {
    // @ts-ignore
    const getMyShortlistsResult: GraphQLResult<APIt.Get_my_shortlistsQuery> = await API.graphql(graphqlOperation(get_my_shortlists))
    if (getMyShortlistsResult.data) {
      const getMyShortlistsData: APIt.Get_my_shortlistsQuery = getMyShortlistsResult.data
      if (getMyShortlistsData.get_my_shortlists) {
        const shortlists: { [key: string]: Shortlist } = {}

        getMyShortlistsData.get_my_shortlists.forEach(shortlist => {
          shortlists[shortlist.shortlist_id] = {
            shortlist_id: shortlist.shortlist_id,
            shortlist_name: shortlist.shortlist_name,
            owner_id: shortlist.owner_id,
            shared_type: shortlist.shared_type,
            shared_users: shortlist.shared_users,
            list_type: shortlist.list_type,
            is_default: shortlist.is_default
          }
        })
        actions.setShortlists(shortlists)

        if (getMyShortlistsData.get_my_shortlists.length === 0) {
          actions.initializeShortlists()
        }
      }
    }
  }),
  getRows: thunk(async (actions, payload, { getState, getStoreActions }) => {
    // get data

    try {
      const getRowsMV: APIt.Get_rowsQueryVariables = {
        shortlist_id: payload.shortlist_id,
        columns: getState?.().columns[payload.shortlist_id].map(column => column.dataIndex as string)
      }

      actions.setIsLoading(true)
      // @ts-ignore
      const getGQL: GraphQLResult<APIt.Get_rowsQuery> = await API.graphql(graphqlOperation(get_rows, getRowsMV))
      actions.setIsLoading(false)
      if (getGQL.data) {
        const getRows: APIt.Get_rowsQuery = getGQL.data
        if (getRows.get_rows) {
          actions.setRow({
            shortlist_id: payload.shortlist_id,
            rows: getRows.get_rows.map(s => {
              const obj = JSON.parse(s)

              Object.keys(obj).forEach(k => {
                obj[k] = tryParseJson(obj[k])
              })
              // console.log('obj :', obj)

              return {
                row_id: obj.shortlist_id,
                ...obj
              }
            })
          })
        }
      }
    } catch (error) {
      console.log('error :', error)
    }
  })

}
