import React, { useState } from 'react'

import { useStoreActions, useStoreState }   from '@monorepo/common/hooks'
import { InputTypeEnum, EditableCellProps } from '@monorepo/common/types'
import { AutoComplete, Input }              from 'antd'
import { useDebounce }                      from 'src/hooks'
interface AutoCompletePickerProps  {
  inputType: keyof typeof InputTypeEnum
  title: EditableCellProps['title']
  value?: { id: string, name: string }
  handleChange?: (value: any) => void;
  onBlur?: () => void;
}

const AutoCompletePicker: React.FC<AutoCompletePickerProps> = ({  title, value, inputType, onBlur,  handleChange }) => {
  const { foundTeams, foundPlayers, foundCountries, foundLeagues, isLoading } = useStoreState(state => state.search)
  const { findTeam, findPlayer, findCountry, findLeague }                     = useStoreActions(state => state.search)

  const [query, setQuery] = useState(value?.name || '')
  const debouncedQuery    = useDebounce(query, 500)

  React.useEffect(() => {
    setQuery(value?.name || '')
  }, [value])

  React.useEffect(() => {
    if (debouncedQuery && debouncedQuery !== '') {
      const term = debouncedQuery.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      if (inputType === 'teamSelect') { findTeam({ term }) }
      if (inputType === 'multiplayerSelect') { findPlayer({ term }) }
      if (inputType === 'playerSelect') { findPlayer({ term }) }
      if (inputType === 'countrySelect') { findCountry({ term }) }
      if (inputType === 'leagueSelect') { findLeague({ term }) }
    }
  }, [debouncedQuery, inputType])

  const getOptions = () => {
    if (inputType === 'teamSelect') {
      return foundTeams?.map(d => ({ value: d?.id, label: d?.name }))
    }

    if (inputType === 'multiplayerSelect') {
      return foundPlayers?.map(d => ({ value: d?.player_id, label: d?.player_name, data: d }))
    }

    if (inputType === 'playerSelect') {
      return foundPlayers?.map(d => ({ value: d?.player_id, label: `${d?.player_name} (${d?.team_name})`, data: d }))
    }

    if (inputType === 'countrySelect') {
      return foundCountries?.map(d => ({ value: d?.id, label: d?.name }))
    }

    if (inputType === 'leagueSelect') {
      return foundLeagues?.map(d => ({ value: d?.id, label: d?.name }))
    }

    return []
  }

  return (

    <AutoComplete
      dropdownMatchSelectWidth={500}
      options={getOptions()}
      onSearch={value => setQuery(value)}
      value={query}
      autoClearSearchValue
      autoFocus
      onBlur={onBlur}
      onSelect={(value: string) => {
        console.log(value)
        if (inputType === 'teamSelect') {
          handleChange?.(foundTeams?.find(t => t?.id === value))
        }

        if (inputType === 'multiplayerSelect') {
          handleChange?.(foundPlayers?.find(p => p?.player_id === value))
        }

        if (inputType === 'playerSelect') {
          // getPlayerStats({ player_id: value }).then((res) => {
          //   const player = foundPlayers?.find(p => p?.player_id === value)
          //   console.log({ ...player, ...res[0] })
          //   handleChange?.({ ...player, ...res[0] })
          // }).catch((err) => {
          //   console.log(err)
          // })
          handleChange?.(foundPlayers?.find(p => p?.player_id === value))
        }

        if (inputType === 'countrySelect') {
          handleChange?.(foundCountries?.find(c => c?.id === value))
        }

        if (inputType === 'leagueSelect') {
          handleChange?.(foundLeagues?.find(l => l?.id === value))
        }
      }}
    >
      <Input.Search loading={isLoading} placeholder={`Select a ${title}`} />
    </AutoComplete>
  )
}
export default AutoCompletePicker
