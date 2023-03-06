import React, { memo, useState } from 'react'

import { red }                                               from '@ant-design/colors'
import { SaveTwoTone, DeleteTwoTone }                        from '@ant-design/icons'
import { defaultAnalysisCharts }                             from '@monorepo/common/constants/defaultAnalysisCharts'
import { useStoreActions, useStoreState }                    from '@monorepo/common/hooks'
import {  SelectedFilter }                                   from '@monorepo/common/types'
import { isBase64 }                                          from '@monorepo/common/utils/helper'
import { Button, Input, Popconfirm, Popover, Select, Space } from 'antd'

import FormItem            from 'antd/es/form/FormItem'
import { useSearchParams } from 'react-router-dom'

type FiltersProps = {
  type : 'attributes' | 'analysis'
}

const SavedFilterManager = memo(function MemoSaved ({ type } : FiltersProps) {
  const { savedFilters, analysisCharts }                                 = useStoreState(state => state.appData)
  const { addToSavedFilters, removeFromSavedFilters, setAnalysisCharts } = useStoreActions(actions => actions.appData)
  const [selectedSavedFiltersId, setSelectedSavedFiltersId]              = useState<string | null>(null)
  const [showSaveFilterPopover, setShowSaveFilterPopover]                = useState(false)
  const [filterName, setFilterName]                                      = useState<string>('')
  const [searchParams, setSearchParams]                                  = useSearchParams()

  const handleSelectSavedFilter = (id : string) => {
    const filter = savedFilters.find(f => f.id === id)
    setSelectedSavedFiltersId(filter?.id ?? null)

    setSearchParams({ q: btoa(JSON.stringify(filter?.filters)) })
    setAnalysisCharts(filter?.charts ?? defaultAnalysisCharts)
  }

  const handleSaveCurrentFilters = () => {
    const filters: SelectedFilter[] = isBase64(searchParams.get('q')) ? JSON.parse(atob(searchParams.get('q') || '')) : {}

    addToSavedFilters({
      filters,
      filterName,
      type,
      charts: analysisCharts
    })
    setFilterName('')
    setShowSaveFilterPopover(false)
  }

  const handleDeleteSavedFilter = () => {
    selectedSavedFiltersId && removeFromSavedFilters(selectedSavedFiltersId)
    setSelectedSavedFiltersId(null)
  }

  return (

    <Input.Group compact style={{ marginBottom: 8, display: 'flex' }}>
      <Select
        allowClear
        onClear={() => setSelectedSavedFiltersId(null)}
        placeholder='Saved Filters'
        onSelect={handleSelectSavedFilter}
        value={selectedSavedFiltersId}
        style={{ width: '100%' }}
      >
        {
          savedFilters.filter(f => f.type === type).map(filter => (
            <Select.Option key={filter.id} value={filter.id} >{filter.filterName}</Select.Option>
          ))
        }
      </Select>
      <Popover
        title='Name your filter'
        trigger='click'
        open={showSaveFilterPopover}
        content={
          <Space direction='vertical' size="middle">
            <FormItem>
              <Input placeholder='Filter Name' value={filterName} onChange={e => setFilterName(e.target.value)} />
            </FormItem>
            <Button type='primary'
              onClick={handleSaveCurrentFilters}  >Save</Button>
          </Space>
        }
      >
        <Button
          type='ghost'
          // disabled={selectedFilters.length === 0}
          icon={<SaveTwoTone />}
          style={{ margin: 0, minWidth: 30, borderRadius: 0, borderRightWidth: 0 }}
          onClick={() => setShowSaveFilterPopover(true)}
        />
      </Popover>
      <Popconfirm
        title='Are you sure to delete this filter?'
        onConfirm={handleDeleteSavedFilter}
        disabled={!selectedSavedFiltersId}
      >
        <Button
          type='ghost'
          disabled={!selectedSavedFiltersId}
          icon={<DeleteTwoTone twoToneColor={red[2]} />}
          style={{ borderTopLeftRadius: 0, minWidth: 30, borderBottomLeftRadius: 0 }}
        />

      </Popconfirm>

    </Input.Group>
  )
})

export default SavedFilterManager
