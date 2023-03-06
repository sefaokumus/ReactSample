import React, { memo } from 'react'

import {  useStoreState } from '@monorepo/common/hooks'

import { Typography }          from 'antd'
import { Navigate, useParams } from 'react-router-dom'
import Box                     from 'src/components/ui/Box'

import { SearchResultsOfCountriesTable, SearchResultsOfLeaguesTable, SearchResultsOfPlayersTable, SearchResultsOfTeamsTable } from './components'

const SearchResultsScreen = memo(function SearchResults () {
  const { term } = useParams()

  const { searchResults } = useStoreState(state => state.search)

  console.log(searchResults)

  if (!term || !searchResults) return <Navigate to='/' />

  return (
    <div>
      <Typography.Title level={4}>
        {`Search results for "${term}"`}

        {
          searchResults?.players && searchResults?.players?.length > 0 && (<Box><SearchResultsOfPlayersTable players={searchResults.players} /></Box>)
        }
        {
          searchResults?.teams && searchResults?.teams?.length > 0 && (<Box><SearchResultsOfTeamsTable teams={searchResults.teams} /> </Box>)
        }
        {
          searchResults?.leagues && searchResults?.leagues?.length > 0 && (<Box><SearchResultsOfLeaguesTable leagues={searchResults.leagues} />  </Box>)
        }
        {
          searchResults?.countries && searchResults?.countries?.length > 0 && (<Box><SearchResultsOfCountriesTable countries={searchResults.countries} /></Box>)
        }
      </Typography.Title>

    </div>
  )
})

export default SearchResultsScreen
