import { Action, Thunk } from 'easy-peasy'

import { Delete_tag_listMutationVariables, Get_tag_listQueryVariables, TagListInfo } from '../API'

export interface TagListsModel {
  data: TagListInfo[] | null
  selectedTagList : TagListInfo | null
  isLoading: boolean
  error: any

  setData: Action<TagListsModel, TagListInfo[] | null>
  setSelectedTagList: Action<TagListsModel, TagListInfo | null>
  setError: Action<TagListsModel, any>
  setIsLoading: Action<TagListsModel, boolean>

  getTagLists: Thunk<TagListsModel>
  getTagList: Thunk<TagListsModel, Get_tag_listQueryVariables>
  createTagList: Thunk<TagListsModel, TagListInfo>
  updateTagList: Thunk<TagListsModel, TagListInfo>
  deleteTagList: Thunk<TagListsModel, Delete_tag_listMutationVariables>
}
