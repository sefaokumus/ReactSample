import API, { GraphQLResult, graphqlOperation } from '@aws-amplify/api'

import { sql } from '../graphql/queries'

import {  SqlQuery, PlayerStat, SqlQueryVariables }             from '../types'
import { getValuesRecursively }                                 from '../utils/helper'
import { analysisGroupingColumns, createGetPlayerStatSqlQuery } from '../utils/sqlGenerator'

export const getPlayerStats = ({ player_id } : {player_id : string}) : Promise<PlayerStat[] > => {
  return new Promise((resolve, reject) => {
    const getQV: SqlQueryVariables = {
      query: createGetPlayerStatSqlQuery(player_id)
    }

    // @ts-ignore
    API.graphql(graphqlOperation(sql, getQV)).then((response: GraphQLResult<SqlQuery>) => {
      if (response.data) {
        const result: SqlQuery = response.data
        if (result.sql) {
          const players: any[] = JSON.parse(result.sql)['player_id.keyword'].buckets
          const groupingArr    = analysisGroupingColumns.map(k => `${k}.keyword`)

          const parsedAnalysis: any[] = players.map((row) => {
            const rowResult = getValuesRecursively(row, groupingArr, {})
            return rowResult
          })

          resolve(parsedAnalysis)
        } else {
          reject(new Error('No result returned'))
        }
      }
    }).catch((error) => {
      reject(error)
    })
  })
}

// const getQV: APIt.SqlQueryVariables = payload
// actions.setSelectedPlayers([])
// if (payload.query === '') {
//   return
// }
// try {
//   actions.setIsSelecting(true)

//   // @ts-ignore
//   const getGQL: GraphQLResult<APIt.Analysis_queryQuery> = await API.graphql(graphqlOperation(sql, getQV))
//   actions.setIsSelecting(false)
//   if (getGQL.data) {
//     const getQ: APIt.SqlQuery = getGQL.data
//     if (getQ.sql) {

//     }
//   }
// } catch (error) {
//   console.log(error)
//   actions.setError(error)
// } finally {
//   actions.setIsLoading(false)
//   actions.setIsSelecting(false)
// }
