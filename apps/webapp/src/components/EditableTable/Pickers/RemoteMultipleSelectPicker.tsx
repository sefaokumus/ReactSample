import React, {  useState } from 'react'

import { useStoreActions, useStoreState } from '@monorepo/common/hooks'
import { InputTypeEnum }                  from '@monorepo/common/types'
import { Select, Spin }                   from 'antd'
import type { SelectProps }               from 'antd/es/select'
import { useDebounce }                    from 'src/hooks'

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

// Usage of DebounceSelect
interface PickerValue {
  label?: string | null
  value?: string | null
}

interface RemoteMultipleSelectPickerProps  {
  inputType: keyof typeof InputTypeEnum
  title   : string
  value?: PickerValue[]
  handleChange?: (value: any) => void;
  // onBlur?: () => void;
}

const RemoteMultipleSelectPicker: React.FC<RemoteMultipleSelectPickerProps> = ({ inputType, value, title, handleChange }) => {
  const [_value, setValue]                                                    = useState<PickerValue[]>(value || [])
  const { foundTeams, foundPlayers, foundCountries, foundLeagues, isLoading } = useStoreState(state => state.search)
  const { findTeam, findPlayer, findCountry, findLeague }                     = useStoreActions(state => state.search)

  const [query, setQuery] = useState('')
  const debouncedQuery    = useDebounce(query, 500)

  React.useEffect(() => {
    handleChange?.(_value)
  }, [_value])

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

  const getOptions = (): PickerValue[] => {
    if (inputType === 'teamSelect' && foundTeams) {
      return foundTeams?.map(d => ({ value: d?.id, label: d?.name }))
    }

    if (inputType === 'multiplayerSelect' && foundPlayers) {
      return foundPlayers?.map(d => ({ value: d?.player_id, label: d?.player_name }))
    }

    if (inputType === 'playerSelect' && foundPlayers) {
      return foundPlayers?.map(d => ({ value: d?.player_id, label: `${d?.player_name} ${d?.team_name ? `(${d?.team_name})` : ''}` }))
    }

    if (inputType === 'countrySelect' && foundCountries) {
      return foundCountries?.map(d => ({ value: d?.id, label: d?.name }))
    }

    if (inputType === 'leagueSelect' && foundLeagues) {
      return foundLeagues?.map(d => ({ value: d?.id, label: d?.name }))
    }

    return []
  }
  return (
    <Select
      labelInValue
      filterOption={false}
      notFoundContent={isLoading ? <Spin size="small" /> : null}
      onSearch={setQuery}
      mode="multiple"
      value={value}
      placeholder={`Select ${title}`}
      onChange={newValue => {
        setValue(newValue as PickerValue[])
      }}
      style={{ width: '100%' }}
      options={getOptions()}

    />
  )
}

export default RemoteMultipleSelectPicker
