import React from 'react'

import { FilterOutlined }                       from '@ant-design/icons'
import { useStoreActions }                      from '@monorepo/common/hooks'
import {  ScreenFilterObjType, SelectedFilter } from '@monorepo/common/types'
import {  isBase64 }                            from '@monorepo/common/utils/helper'
import {
  createAnalysisSQLQuery, createAttributesSQLQuery,
  createComparisonFilterQuery
} from '@monorepo/common/utils/sqlGenerator'
import { Button, Collapse, Drawer, Grid, Typography, message } from 'antd'

import { createUseStyles }                    from 'react-jss'
import {  useSearchParams }                   from 'react-router-dom'
import { attributesFilters, analysisFilters } from 'src/constants/filters'

import FilterView         from './FilterView'
import SavedFilterManager from './SavedFilterManager'

const { Panel }         = Collapse
const { useBreakpoint } = Grid

type FiltersProps = { type: 'attributes' | 'analysis' }

const useStyles = createUseStyles({
  comparisonFilterContainer: {
    padding: 12,
    border: '1px solid #d9d9d9',
    borderRadius: 4,
    margin: '12px 0px',
    background: 'linear-gradient(to bottom, rgb(255, 215, 0) 0%, white 70%)',
    gap: 12,
    display: 'flex',
    flexDirection: 'column'
  }
})

const FilterColumn = ({ type }: FiltersProps) => {
  const classes                                                  = useStyles()
  const [searchParams, setSearchParams]                          = useSearchParams()
  const { queryAnalysis, queryAttributes, querySelectedPlayers } = useStoreActions(state => state.filters)
  const [currentFilters, setCurrentFilters]                      = React.useState<ScreenFilterObjType>({})

  console.log(currentFilters)

  React.useEffect(() => {
    const _filters = isBase64(searchParams.get('q')) ? JSON.parse(atob(searchParams.get('q') || '')) : {}
    setCurrentFilters(_filters)

    // if (_filters.comparison_team_id) {
    //   setSelectedTeam(_filters.comparison_team_id)
    // }
    // if (_filters.comparison_player_id) {
    //   setSelectedPlayer(_filters.comparison_player_id)
    // }

    return () => { }
  }, [searchParams])

  // React.useEffect(() => {
  //   if (type) {
  //     if (type === 'analysis') { getAnalysisData(currentFilters) } else  getAttributesData(currentFilters)
  //   }
  // }, [currentFilters, type])

  const handleFilterChange = (filter: SelectedFilter) => {
    setCurrentFilters(prev => {
      if (filter.value === '' || (Array.isArray(filter.value) && filter.value.length === 0)) {
        delete prev[filter.id]
      } else {
        prev[filter.id] = filter
      }
      return prev
    })

    if (Object.keys(currentFilters).length === 0) {
      setSearchParams()
    } else {
      setSearchParams({ q: btoa(JSON.stringify(currentFilters)) })
    }
  }
  const applyFilters = () => {
    // if (selectedTeam?.value  && (selectedTeam?.value as [] || []).length !== 0) {
    //   currentFilters[selectedTeam.id] = selectedTeam
    // } else { delete currentFilters.comparison_team_id }

    // if (selectedPlayer?.value &&  (selectedPlayer?.value as [] || []).length !== 0) {
    //   currentFilters[selectedPlayer.id] = selectedPlayer
    // } else { delete currentFilters.comparison_player_id }

    console.log(currentFilters)

    if (type) {
      if (type === 'analysis') { getAnalysisData(currentFilters) } else  getAttributesData(currentFilters)
    }
  }

  const getAnalysisData = (filters: ScreenFilterObjType) => {
    const keys = Object.keys(filters)
    if (
      (keys.length === 1 && (keys.includes('player_position') || keys.includes('player_positions'))) ||
      (keys.includes('player_position') && keys.includes('player_positions') && keys.length === 2)) {
      message.error('Please select at least one other filter')
      return
    }

    if (keys.length === 0) {
      queryAnalysis({ query: '' })
      querySelectedPlayers({ query: '' })
      return
    }

    // split current filters into two groups: comparison filters and others
    const nonComparisonFilters = Object.keys(filters).filter(key => !key.includes('comparison')).reduce((obj, key) => {
      obj[key] = filters[key]
      return obj
    }, {} as ScreenFilterObjType)

    const sqlQuery = createAnalysisSQLQuery(nonComparisonFilters)

    if (sqlQuery) {
      queryAnalysis({
        query: sqlQuery
      })
    }

    if (Object.keys(filters).filter(key => key.includes('comparison')).length > 0) {
      const comparisonQuery = createComparisonFilterQuery(filters?.comparison_team_id?.value as any[], filters?.comparison_player_id?.value as any[])
      if (comparisonQuery) {
        querySelectedPlayers({
          query: comparisonQuery
        })
      }
    } else {
      querySelectedPlayers({
        query: ''
      })
    }
  }

  const getAttributesData = (filters: ScreenFilterObjType) => {
    const keys = Object.keys(filters)
    if (
      (keys.length === 1 && (keys.includes('player_position') || keys.includes('player_positions'))) ||
      (keys.includes('player_position') && keys.includes('player_positions') && keys.length === 2)) {
      message.error('Please select at least one other filter')
      return
    }

    if (keys.length === 0) {
      queryAttributes({ query: '' })
      return
    }

    const sqlQuery = createAttributesSQLQuery(filters)

    if (sqlQuery) {
      queryAttributes({
        query: sqlQuery
      })
    }
  }

  return (
    <React.Fragment>
      <SavedFilterManager type={type} />

      <Collapse
        defaultActiveKey={'0'}
        expandIconPosition={'end'}
      >
        {
          (type === 'attributes' ? attributesFilters : analysisFilters).filter(f => !f.id.includes('comparison')).map((filter, index) => {
            return <Panel header={filter.name} key={filter.id} >
              <FilterView
                filter={filter}
                style={{ marginBottom: 4 }}
                value={currentFilters[filter.id]?.value}
                onChange={handleFilterChange} />
            </Panel>
          })
        }

      </Collapse>

      {/*  comparison filter */}
      {
        type === 'analysis' && <div className={classes.comparisonFilterContainer}>
          <Typography.Title level={5}>Comparison Filter</Typography.Title>

          {
            analysisFilters.filter(f => f.id.includes('comparison')).map((filter, index) => {
              return <FilterView
                key={filter.id}
                filter={filter}
                style={{ marginBottom: 4 }}
                value={currentFilters[filter.id]?.value}
                onChange={handleFilterChange} />
            })
          }

        </div>
      }

      <Button
        type="primary"
        icon={<FilterOutlined />}
        size="large"
        block
        style={{ margin: '8px 0px' }}
        disabled={Object.keys(currentFilters).length === 0}
        onClick={() => applyFilters()}>Apply Filter</Button>
    </React.Fragment>
  )
}

const FilterColumnContainer = ({ type } : FiltersProps) => {
  const screens         = useBreakpoint()
  const [open, setOpen] = React.useState(false)

  if (!screens.lg) {
    return  <>
      <Button style={{ float: 'left', marginBottom: 8 }} onClick={() => setOpen(true)} icon={<FilterOutlined />} >Filters</Button>
      <Drawer title="Filters" placement="left" onClose={() => setOpen(false)} open={open}>
        <FilterColumn type={type} />
      </Drawer>
    </>
  }

  return <FilterColumn type={type} />
}

export default React.memo(FilterColumnContainer)
