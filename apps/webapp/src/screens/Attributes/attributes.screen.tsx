import React, { useEffect } from 'react'

// import { useStoreActions, useStoreState }                   from '@monorepo/common/hooks'
import { useStoreState }          from '@monorepo/common/hooks'
import { getUrl }                 from '@monorepo/common/services'
import { Grid, Spin }             from 'antd'
import { createUseStyles }        from 'react-jss'
import { useNavigate, useParams } from 'react-router-dom'
import FilterColumn               from 'src/components/FilterColumn'
import SelectedFilters            from 'src/components/SelectedFiltersView'

import ShareButton from 'src/components/ShareButton'

import GeoMap       from './components/GeoMap'
import ResultsTable from './components/ResultsTable'

const { useBreakpoint } = Grid

const useStyles = createUseStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: '210px 100%',
    gridTemplateRows: 'min-content 1fr',
    gap: '0px 12px',
    width: 'calc(100% - 222px)',
    gridTemplateAreas: '"filters selectedFilters"  "filters table"'
  },
  mobileRoot: {
    display: 'grid',
    gridTemplateColumns: '100%',
    gridTemplateRows: 'min-content min-content 1fr',
    gridTemplateAreas: '"selectedFilters" "filters" "table"'
  },
  filtersBox: {
    gridArea: 'filters'
  },
  selectedFiltersBox: {
    gridArea: 'selectedFilters',
    display: 'grid',
    gridTemplateColumns: '1fr min-content',
    gap: 12,
    alignItems: 'center'

  },
  tableBox: {
    gridArea: 'table'
  }
})
export default function AttributesScreen () {
  const screens                                = useBreakpoint()
  const classes                                = useStyles()
  const { filters: { attributes, isLoading } } = useStoreState(state => state)
  const { key }                                = useParams()
  const navigate                               = useNavigate()

  const [isGettingUrl, setIsGettingUrl] = React.useState(false)

  useEffect(() => {
    if (key) {
      setIsGettingUrl(true)
      getUrl({ key }).then((url) => {
        setIsGettingUrl(false)
        navigate(url)
      })
    }
  }, [key])

  // console.log(attributes)
  return (
    <Spin spinning={isLoading || isGettingUrl}>
      <div className={screens.lg ? classes.root : classes.mobileRoot} >
        <div className={classes.filtersBox} >
          <FilterColumn type='attributes'  />
        </div>

        <div className={classes.selectedFiltersBox} >
          <SelectedFilters type='attributes' style={{ margin: '0px 8px 8px 8px' }} />
          <ShareButton />
        </div>

        <div className={classes.tableBox}>
          {screens.lg && <GeoMap data={attributes} /> }
          <ResultsTable data={attributes.map(a => ({
            ...a,
            player_col: {
              team_id: a.team_id,
              team_logo: a.team_logo,
              team_name: a.team_name,
              league_id: a.team_league_id,
              league_name: a.team_league_logo,
              league_logo: a.team_league_name,
              player_id: a.player_id,
              player_name: a.player_name,
              player_logo: a.player_logo,
              player_country_id: a.player_country_id,
              player_country_name: a.player_country_name,
              player_country_logo: a.player_country_logo,
              player_positions: a.player_positions,
              player_ability: a.player_ability,
              player_characteristics: a.player_characteristics
            }
          }))} />
        </div>
      </div>
    </Spin>
  )
}
