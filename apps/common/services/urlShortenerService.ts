import API, { GraphQLResult, graphqlOperation } from '@aws-amplify/api'

import { url_shortener } from '../graphql/mutations'
import { get_url }       from '../graphql/queries'

import { Url_shortenerMutationVariables } from '../types'
import * as APIt                          from '../types/API'

export const urlShortener = (payload: Url_shortenerMutationVariables) : Promise<string > => {
  const getQV: APIt.Url_shortenerMutationVariables = payload

  return new Promise((resolve, reject) => {
    // @ts-ignore
    API.graphql(graphqlOperation(url_shortener, getQV)).then((response: GraphQLResult<APIt.Url_shortenerMutation>) => {
      if (response.data) {
        const result: APIt.Url_shortenerMutation = response.data
        if (result.url_shortener) {
          resolve(result.url_shortener)
        } else {
          reject(new Error('No url_shortener returned'))
        }
      }
    }).catch((error) => {
      reject(error)
    })
  })
}

export const getUrl = (payload: APIt.Get_urlQueryVariables): Promise<string> => {
  const getQV: APIt.Get_urlQueryVariables = payload

  return new Promise((resolve, reject) => {
    // @ts-ignore
    API.graphql(graphqlOperation(get_url, getQV)).then((response: GraphQLResult<APIt.Get_urlQuery>) => {
      if (response.data) {
        const result: APIt.Get_urlQuery = response.data
        if (result.get_url) {
          resolve(result.get_url)
        } else {
          reject(new Error('No get_url returned'))
        }
      }
    }).catch((error) => {
      reject(error)
    })
  })
}
