import API, { GraphQLResult, graphqlOperation } from '@aws-amplify/api'

import {  action,  thunk } from 'easy-peasy'

import { create_tag_list, delete_tag_list } from '../graphql/mutations'

import { get_tag_list, get_tag_lists } from '../graphql/queries'

import {  TagListsModel  } from '../types'
import * as APIt           from '../types/API'

export const tagListsModel : TagListsModel = {
  data: null,
  selectedTagList: null,
  isLoading: false,
  error: null,

  setData: action((state, data) => {
    state.data = data
  }),
  setSelectedTagList: action((state, data) => {
    state.selectedTagList = data
  }),
  setError: action((state, error) => {
    state.error = error
  }),
  setIsLoading: action((state, isLoading) => {
    state.isLoading = isLoading
  }),

  getTagLists: thunk(async (actions, payload) => {
    actions.setIsLoading(true)
    // @ts-ignore
    const getGQL: GraphQLResult<APIt.Get_tag_listsQuery> = await API.graphql(graphqlOperation(get_tag_lists))
    actions.setIsLoading(false)
    if (getGQL.data) {
      const getQ: APIt.Get_tag_listsQuery = getGQL.data
      if (getQ.get_tag_lists) {
        const allTagLists: APIt.TagListInfo[] = getQ.get_tag_lists
        actions.setData(allTagLists)
      }
    }
  }),
  getTagList: thunk(async (actions, payload) => {
    const getQV: APIt.Get_tag_listQueryVariables = payload
    actions.setIsLoading(true)
    // @ts-ignore
    const getGQL: GraphQLResult<APIt.Get_tag_listQuery> = await API.graphql(graphqlOperation(get_tag_list, getQV))
    actions.setIsLoading(false)

    if (getGQL.data) {
      const getQ: APIt.Get_tag_listQuery = getGQL.data
      if (getQ.get_tag_list) {
        const tagList: APIt.TagListInfo = getQ.get_tag_list
        actions.setSelectedTagList(tagList)
      }
    }
  }),
  createTagList: thunk(async (actions, payload, { getState }) => {
    const getQV: APIt.Create_tag_listMutationVariables = payload

    actions.setIsLoading(true)
    // @ts-ignore
    const createGQL: GraphQLResult<APIt.Create_tag_listMutation> = await API.graphql(graphqlOperation(create_tag_list, getQV))
    actions.setIsLoading(false)

    if (createGQL.data) {
      const createQ: APIt.Create_tag_listMutation = createGQL.data
      if (createQ.create_tag_list) {
        const newTaglistId : string = createQ.create_tag_list
        actions.setSelectedTagList({ tag_list_id: newTaglistId, ...payload })
        actions.setData([...getState().data, { tag_list_id: newTaglistId, ...payload }])
      }
    }
  }),
  updateTagList: thunk(async (actions, payload) => {
    // actions.setIsLoading(true)
    // // @ts-ignore
    // const updateGQL: GraphQLResult<APIt.Update_tag_listMutation> = await API.graphql(graphqlOperation(update_tag_list, { input: payload }))
    // actions.setIsLoading(false)

    // if (updateGQL.data) {
    //   const updateQ: APIt.Update_tag_listMutation = updateGQL.data
    //   if (updateQ.update_tag_list) {
    //     const updatedTagList: APIt.TagListInfo = updateQ.update_tag_list
    //     actions.setSelectedTagList(updatedTagList)
    //   }
    // }
  }),
  deleteTagList: thunk(async (actions, payload, { getState }) => {
    const getQV: APIt.Delete_tag_listMutationVariables = payload

    actions.setIsLoading(true)
    // @ts-ignore
    const deleteGQL: GraphQLResult<APIt.Delete_tag_listMutation> = await API.graphql(graphqlOperation(delete_tag_list, getQV))
    actions.setIsLoading(false)
    console.log('deleteQ.delete_tag_list')

    if (deleteGQL.data) {
      actions.setSelectedTagList(null)
      actions.setData(getState().data?.filter((tagList) => tagList.tag_list_id !== getQV.tag_list_id))
    }
  })
}
