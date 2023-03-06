import React from 'react'

import {
  BudgetCellType, Country, DynamicRow, FootType, InputTypeEnum,
  League, NumberCellType, OptionType,  PlayerStat,  PositionType, SalaryCellType, Team
} from '@monorepo/common/types'
import { safeString }                        from '@monorepo/common/utils/helper'
import { tAbility, tCharacteristics, tFoot } from '@monorepo/common/utils/translator'
import { Image, Tag, Typography }            from 'antd'
import moment                                from 'moment'
import numeral                               from 'numeral'
import { Link }                              from 'react-router-dom'

export const shortlistTableRenderers = (dataIndex: any, inputType: keyof typeof InputTypeEnum, options?: OptionType[], isEditable?: boolean) => {
  if (dataIndex === 'team_country_col') {
    return function countrySelectRender (_:any, record : DynamicRow) {
      if (!record.team_col) return null
      const team_col = record.team_col as Team

      return <Link to={`/country/${team_col.country_id}`} target={'_blank'}><Typography.Link><Image height={15} src={team_col.country_logo || ''} preview={false}  />  {team_col.country_name}</Typography.Link></Link>
    }
  }

  if (dataIndex === 'team_league_col') {
    return function leagueSelectRender (_: any, record : DynamicRow) {
      if (!record.team_col) return null
      const team_col = record.team_col as Team
      return <Link to={`/league/${team_col.league_id}`} target={'_blank'}><Typography.Link><Image  height={15} src={team_col.league_logo || ''} preview={false}  />  {team_col.league_name}</Typography.Link></Link>
    }
  }

  // custom player columns

  if (dataIndex === 'player_team_col') {
    return function teamRender (_: any, record: DynamicRow) {
      if (!record.player_col) return null
      const player_col = record.player_col as PlayerStat

      return <Link to={`/team/${player_col?.team_id}`} target={'_blank'}><Typography.Link><Image  height={13} src={player_col.team_logo || ''} preview={false}  /> {player_col.team_name}</Typography.Link></Link>
    }
  }

  if (dataIndex === 'player_position_col') {
    return function positionSelectRender (_: any, record: DynamicRow) {
      if (!record.player_col) return null
      const player_col                 = record.player_col as PlayerStat
      const positions : PositionType[] = player_col?.player_positions ? safeString(player_col?.player_positions) : []

      return Array.isArray(positions) ? positions.filter(f => f !== '').join(', ') : positions
    }
  }

  if (dataIndex === 'player_foot_col') {
    return function footSelectRender (_: any, record: DynamicRow) {
      if (!record.player_col) return null
      const player_col = record.player_col as PlayerStat
      return <Typography> {tFoot(player_col.player_preferred_foot)}</Typography>
    }
  }

  if (dataIndex === 'player_height_col') {
    return function heightSelectRender (_: any, record: DynamicRow) {
      if (!record.player_col) return null
      const player_col = record.player_col as PlayerStat
      return <Typography> {player_col.player_height}</Typography>
    }
  }

  if (dataIndex === 'player_age_col') {
    return function ageSelectRender (_: any, record: DynamicRow) {
      if (!record.player_col) return null
      const player_col = record.player_col as PlayerStat
      return <Typography> {player_col.player_age || 'Unknown'}</Typography>
    }
  }

  if (dataIndex === 'player_market_value_col') {
    return function marketValueSelectRender (_: any, record: DynamicRow) {
      if (!record.player_col) return null
      const player_col = record.player_col as PlayerStat
      if (!player_col.player_market_value) return null

      return <Typography>{player_col.player_market_value_currency} {numeral(player_col.player_market_value).format('0,0')}</Typography>
    }
  }

  if (dataIndex === 'player_country_col') {
    return function countryRender (_: any, record: DynamicRow) {
      if (!record.player_col) return null
      const player_col = record.player_col as PlayerStat

      if (!player_col.player_country_id) return null

      return <Link to={`/country/${player_col?.player_country_id}`} target={'_blank'}><Typography.Link><Image  height={13} src={player_col.player_country_logo || ''} preview={false}  /> {player_col.player_country_name}</Typography.Link></Link>
    }
  }

  if (dataIndex === 'player_league_col') {
    return function leagueRender (_: any, record: DynamicRow) {
      if (!record.player_col) return null
      const player_col = record.player_col as PlayerStat
      if (!player_col.team_league_id) return null

      return <Link to={`/league/${player_col?.team_league_id}`} target={'_blank'}><Typography.Link><Image  height={13} src={player_col.team_league_logo || ''} preview={false}  /> {player_col.team_league_name}</Typography.Link></Link>
    }
  }

  if (dataIndex === 'player_nationality_col') {
    return function nationalityRender (_: any, record: DynamicRow) {
      if (!record.player_col) return null
      const player_col = record.player_col as PlayerStat

      return player_col.player_nationality
    }
  }

  if (dataIndex === 'player_contract_until_col') {
    return function leagueRender (_: any, record: DynamicRow) {
      if (!record.player_col) return null
      const player_col = record.player_col as PlayerStat

      if (player_col.player_contract_until) { return moment.unix(player_col.player_contract_until).format('lll') }

      return ''
    }
  }

  if (dataIndex === 'player_ability_col') {
    return function abilityRender (_: any, record: DynamicRow) {
      if (!record.player_col) return null
      const player_col            = record.player_col as PlayerStat
      const abilities: number[][] = player_col?.player_ability ? safeString(player_col?.player_ability) : []

      return abilities?.filter(a => (a as []).length > 0).map((ability, i) =>
        <Tag key={i} style={{ margin: 4 }} color="pink">
          {tAbility(ability?.[0] || 0)} ({ability?.[1] || 0})
        </Tag>)
    }
  }

  if (dataIndex === 'player_advantages_col') {
    return function advantagesRender (_: any, record: DynamicRow) {
      if (!record.player_col) return null
      const player_col      = record.player_col as PlayerStat
      const characteristics = player_col?.player_characteristics ? safeString(player_col?.player_characteristics)?.[0] : []

      if (!characteristics) return null

      return characteristics.filter((a: any) => Array.isArray(a) && (a as []).length > 0).map((advantage: any, i: number) =>
        <Tag key={i} style={{ margin: 4, whiteSpace: 'break-spaces' }} color="green">
          {tCharacteristics(advantage?.[0] || 0)} ({advantage?.[1] || 0})
        </Tag>)
    }
  }

  if (dataIndex === 'player_disadvantages_col') {
    return function disadvantagesRender (_: any, record: DynamicRow) {
      if (!record.player_col) return null
      const player_col      = record.player_col as PlayerStat
      const characteristics = player_col?.player_characteristics ? safeString(player_col?.player_characteristics)?.[1] : []

      if (!characteristics) return null

      return characteristics.filter((a: any) => Array.isArray(a) && (a as []).length > 0).map((disadvantage: any, i: number) =>
        <Tag key={i} style={{ margin: 4, whiteSpace: 'break-spaces' }} color="red">
          {tCharacteristics(disadvantage?.[0] || 0)} ({disadvantage?.[1] || 0})
        </Tag>)
    }
  }

  if (/player_(\w+)_col/.test(dataIndex)) {
    return function statRender (_: any, record: DynamicRow) {
      console.log('record', dataIndex)
      if (!record.player_col) return null
      const player_col = record.player_col as PlayerStat

      const statName: string = dataIndex.replace('player_', '').replace('_col', '')
      // @ts-ignore
      return <Typography> {player_col[statName]?.toFixed(2)}</Typography>
    }
  }

  if (inputType === 'select') {
    return function selectRender (val: string) {
      if (!val) return isEditable && <span className='click-to-add' />

      if (!options) return isEditable && <span className='click-to-add' />

      const option = options.find(option => option.label === val)
      return option ? <Tag color={option.color}>{val}</Tag> : val
    }
  }
  if (inputType === 'multiselect') {
    return function multiselectRender (val: string[]) {
      if (!val) return isEditable && <span className='click-to-add' />

      return <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {
          val.map((v, index) => {
            const option = options?.find(op => op.label === v)
            return option && <Tag key={index} color={option.color}>{option.label}</Tag>
          })
        }
      </div>
    }
  }
  if (inputType === 'teamSelect') {
    return function teamSelectRender (val: Team) {
      if (!val) return isEditable && <span className='click-to-add' />
      console.log(val)

      return <Link to={`/team/${val?.id}`} target={'_blank'}><Typography.Link><Image  height={13} src={val.logo || ''} preview={false}  /> {val?.name}</Typography.Link></Link>
    }
  }
  if (inputType === 'playerSelect') {
    return function playerSelectRender (val: PlayerStat) {
      if (!val) return isEditable && <span className='click-to-add' />

      return <Link to={`/player/${val?.player_id}`} target={'_blank'}><Typography.Link ><Image  height={20} src={val.player_logo || ''} preview={false}  /> {val?.player_name}</Typography.Link></Link>
    }
  }
  if (inputType === 'countrySelect') {
    return function countrySelectRender (val:Country) {
      if (!val) return isEditable && <span className='click-to-add' />

      return <Link to={`/country/${val?.id}`} target={'_blank'}><Typography.Link><Image  height={13} src={val.logo || ''} preview={false}  /> {val?.name}</Typography.Link></Link>
    }
  }
  if (inputType === 'leagueSelect') {
    return function leagueSelectRender (val: League) {
      if (!val) return isEditable && <span className='click-to-add' />

      return <Link to={`/league/${val?.id}`} target={'_blank'}><Typography.Link><Image  height={13} src={val.logo || ''} preview={false}  /> {val?.name}</Typography.Link></Link>
    }
  }
  if (inputType === 'positionSelect') {
    return function positionSelectRender (val: [PositionType] | PositionType) {
      if (!val) return isEditable && <span className='click-to-add' />

      return Array.isArray(val) ? val.join(', ') : val
    }
  }
  if (inputType === 'footSelect') {
    return function footSelectRender (foot: FootType) {
      if (foot === 'Either') return 'Either'
      return foot || (isEditable && <span className='click-to-add' />)
    }
  }
  if (inputType === 'multiplayerSelect') {
    return function multiplayerSelectRender (val: PlayerStat[]) {
      if (!val) return isEditable && <span className='click-to-add' />

      return <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {
          val.map((v, index) => {
            return <Link key={index} to={`/player/${v?.player_id}`} target={'_blank'}><Typography.Link  onClick={e => { e.stopPropagation() }} ><Image  height={13} src={v.player_logo || ''} preview={false}  />  {v?.player_name}</Typography.Link></Link>
          })
        }
      </div>
    }
  }
  if (inputType === 'range') {
    return function rangeRender (val : NumberCellType) {
      if (!val) return isEditable && <span className='click-to-add' />
      const [from, to] = val
      const prefix     = ''
      let suffix       =   ''

      if (dataIndex.indexOf('height') !== -1)  {
        suffix = 'cm'
      }

      if (from === to) return `${prefix}${from}${suffix}`

      if (from && to) {
        return `${prefix}${from}${suffix} - ${prefix}${to}${suffix}`
      }
      if (from) {
        return `${prefix}${from}${suffix} +`
      }
      if (to) {
        return `< ${prefix}${to}${suffix}`
      }
    }
  }
  if (inputType === 'budget') {
    return function rangeRender (val : BudgetCellType) {
      if (!val) return isEditable && <span className='click-to-add' />
      const { from = 0, to = 0, currency } = val
      const prefix                         = ''
      const suffix                         = currency || ''

      if (from && to) {
        return `${prefix}${from}${suffix} - ${prefix}${to}${suffix}`
      }
      if (from) {
        return `${prefix}${from}${suffix} +`
      }
      if (to) {
        return `< ${prefix}${to}${suffix}`
      }
    }
  }
  if (inputType === 'salary') {
    return function rangeRender (val : SalaryCellType) {
      if (!val) return isEditable && <span className='click-to-add' />
      const { from = 0, to = 0, currency, salaryType } = val
      const prefix                                     =  currency || ''
      const suffix                                     = salaryType || ''

      if (from && to) {
        return `${prefix}${from}${suffix} - ${prefix}${to}${suffix}`
      }
      if (from) {
        return `${prefix}${from}${suffix} +`
      }
      if (to) {
        return `< ${prefix}${to}${suffix}`
      }
    }
  }
  if (inputType === 'date') {
    return function dateRender (val : any) {
      if (!val) return isEditable && <span className='click-to-add' />

      if (typeof val === 'number') {
        return moment.unix(val).format('lll')
      }
      return moment(val).format('DD/MM/YYYY')
    }
  }
  if (inputType === 'url') {
    return function dateRender (val : string) {
      if (!val) return isEditable && <span className='click-to-add' />
      return <Typography.Link href={val} target="_blank" onClick={(e) => e.stopPropagation()}>{val}</Typography.Link>
    }
  }
  if (inputType === 'text') {
    return function textRender (val : string) {
      if (!val) return isEditable && <span className='click-to-add' />
      return <Typography.Paragraph
        ellipsis={{
          rows: 3,
          expandable: false,
          onEllipsis: ellipsis => {
            console.log('Ellipsis changed:', ellipsis)
          },
          tooltip: <div onClick={e => e.stopPropagation()}>{val}</div>
        }}

      >
        {val}
      </Typography.Paragraph>
    }
  }

  // end custom player columns

  return function defaultRender (val: any) {
    return val || (isEditable && <span className='click-to-add' />)
  }
}
