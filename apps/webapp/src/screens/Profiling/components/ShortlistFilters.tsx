import React from 'react'

import { BudgetCellType, Country, DynamicRow, FootType, InputTypeEnum, League,  PlayerStat, PositionType, SalaryCellType, Team } from '@monorepo/common/types'
import { safeString }                                                                                                            from '@monorepo/common/utils/helper'
import { tAbility, tCharacteristics, tFoot }                                                                                     from '@monorepo/common/utils/translator'
import { Button, Col, Row, Slider }                                                                                              from 'antd'
import { ColumnType }                                                                                                            from 'antd/es/table'
import _                                                                                                                         from 'lodash'
import moment                                                                                                                    from 'moment'

export  const shortlistTableFilters = (dataIndex: any, inputType: keyof typeof InputTypeEnum, dataSource?: readonly DynamicRow[]) : ColumnType<DynamicRow> => {
  if (dataIndex === 'team_country_col') {
    const uniqueData: Team[] = _.chain(dataSource).map('team_col').uniqBy('country_id').filter(item => Boolean(item)).value() as Team[]

    return {
      filters: uniqueData.map(item => ({ text: item?.country_name || '', value: item?.country_id || '' })),
      onFilter: (value, record) => (record.team_col as Team)?.country_id === value
    }
  }
  if (dataIndex === 'team_league_col') {
    const uniqueData: Team[] = _.chain(dataSource).map('team_col').uniqBy('league_id').filter(item => Boolean(item)).value() as Team[]
    return {
      filters: uniqueData.map(item => ({ text: item?.league_name || '', value: item?.league_id || '' })),
      onFilter: (value, record) => (record.team_col as Team)?.league_id === value
    }
  }

  if (dataIndex === 'player_team_col') {
    const uniqueData: PlayerStat[] = _.chain(dataSource).map('player_col').uniqBy('team_id').filter(item => Boolean(item)).value() as PlayerStat[]
    return {
      filters: uniqueData.map(item => ({ text: item?.team_name || '', value: item?.team_id || '' })),
      onFilter: (value, record) => (record.player_col as PlayerStat)?.team_id === value
    }
  }

  if (dataIndex === 'player_position_col') {
    // @ts-ignore
    const uniqueData: PositionType[] = _.chain(dataSource).map('player_col').map(item => safeString(item?.player_positions)).flatMap().uniq().filter(item => Boolean(item)).value() as PositionType[]
    return {
      filters: uniqueData.map(item => ({ text: item || '', value: item || '' })),
      onFilter: (value, record) => {
        const position = safeString((record.player_col as PlayerStat)?.player_positions || []) as string[]
        return position.includes(value as string)
      }
    }
  }

  if (dataIndex === 'player_foot_col') {
    const uniqueData: PlayerStat[] = _.chain(dataSource).map('player_col').uniqBy((item: any)  => item?.preferred_foot).filter(item => Boolean(item)).value() as PlayerStat[]
    return {
      filters: uniqueData.map((item : PlayerStat) => ({ text: tFoot(item.player_preferred_foot) || '', value: item.player_preferred_foot || '' })),
      onFilter: (value, record) => (record.player_col as PlayerStat)?.player_preferred_foot === value
    }
  }

  if (dataIndex === 'player_height_col') {
    const uniqueData: PlayerStat[] = _.chain(dataSource).map('player_col').uniqBy('height').filter(item => Boolean(item)).value() as PlayerStat[]
    return {
      filters: uniqueData.map(item => ({ text: item?.player_height || '', value: item?.player_height || '' })),
      onFilter: (value, record) => (record.player_col as PlayerStat)?.player_height === value
    }
  }

  if (dataIndex === 'player_age_col') {
    const uniqueData: PlayerStat[] = _.chain(dataSource).map('player_col').uniqBy('age').filter(item => Boolean(item)).value() as PlayerStat[]
    return {
      filters: uniqueData.map(item => ({ text: item?.player_age || '', value: item?.player_age || '' })),
      onFilter: (value, record) => (record.player_col as PlayerStat)?.player_age === value
    }
  }

  if (dataIndex === 'player_market_value_col') {
    const uniqueData: PlayerStat[] = _.chain(dataSource).map('player_col').uniqBy('market_value').filter(item => Boolean(item)).value() as PlayerStat[]
    return {
      filters: uniqueData.map(item => ({ text: item?.player_market_value || '', value: item?.player_market_value || '' })),
      onFilter: (value, record) => (record.player_col as PlayerStat)?.player_market_value === value
    }
  }

  if (dataIndex === 'player_country_col') {
    const uniqueData: PlayerStat[] = _.chain(dataSource).map('player_col').uniqBy('player_country_id').filter(item => Boolean(item)).value() as PlayerStat[]
    return {
      filters: uniqueData.map(item => ({ text: item?.player_country_name || '', value: item?.player_country_id || '' })),
      onFilter: (value, record) => (record.player_col as PlayerStat)?.player_country_id === value
    }
  }

  if (dataIndex === 'player_league_col') {
    const uniqueData: PlayerStat[] = _.chain(dataSource).map('player_col').uniqBy('league_id').filter(item => Boolean(item)).value() as PlayerStat[]
    return {
      filters: uniqueData.map(item => ({ text: item?.team_league_name || '', value: item?.team_league_id || '' })),
      onFilter: (value, record) => (record.player_col as PlayerStat)?.team_league_id === value
    }
  }

  if (dataIndex === 'player_nationality_col') {
    const uniqueData: PlayerStat[] = _.chain(dataSource).map('player_col').uniqBy('nationality').filter(item => Boolean(item)).value() as PlayerStat[]
    return {
      filters: uniqueData.map(item => ({ text: item?.player_nationality || '', value: item?.player_nationality || '' })),
      onFilter: (value, record) => (record.player_col as PlayerStat)?.player_nationality === value
    }
  }

  if (dataIndex === 'player_contract_until_col') {
    const uniqueData: PlayerStat[] = _.chain(dataSource).map('player_col').uniqBy((item : any) => moment.unix(item.contract_until).format('ll')).filter(item => Boolean(item)).value() as PlayerStat[]
    return {
      filters: uniqueData.map((item : PlayerStat) => ({ text: moment.unix(item?.player_contract_until || 0).format('ll') || '', value: item?.player_contract_until || '' })),
      onFilter: (value, record) => (record.player_col as PlayerStat)?.player_contract_until === value
    }
  }

  if (dataIndex === 'player_ability_col') {
    const uniqueData: number[] = _.chain(dataSource).map('player_col').map((item: any) => safeString(item?.player_ability)).flatMap().map(item => _.head(item)).uniq().filter(item => Boolean(item)).value() as number[]

    return {
      filters: uniqueData.map(item => ({ text: tAbility(item) || '', value: item || '' })),
      onFilter: (value, record) => {
        const ability = _.flatMap(safeString((record.player_col as PlayerStat)?.player_ability || [])) as string[]
        console.log(ability, value)
        return ability.includes(value as string)
      }
    }
  }

  if (dataIndex === 'player_advantages_col') {
    const uniqueData: number[] = _.chain(dataSource).map('player_col').map((item: any) => safeString(item?.player_characteristics)?.[0]).flatMap().map(item => _.head(item)).uniq().filter(item => Boolean(item)).value() as number[]

    return {
      filters: uniqueData.map(item => ({ text: tCharacteristics(item) || '', value: item || '' })),
      onFilter: (value, record) => {
        const advantage = _.flatMap(safeString((record.player_col as PlayerStat)?.player_characteristics || [])?.[0]) as string[]
        return advantage.includes(value as string)
      }
    }
  }

  if (dataIndex === 'player_disadvantages_col') {
    const uniqueData: number[] = _.chain(dataSource).map('player_col').map((item: any) => safeString(item?.player_characteristics)?.[1]).flatMap().map(item => _.head(item)).uniq().filter(item => Boolean(item)).value() as number[]

    return {
      filters: uniqueData.map(item => ({ text: tCharacteristics(item) || '', value: item || '' })),
      onFilter: (value, record) => {
        const disadvantage = _.flatMap(safeString((record.player_col as PlayerStat)?.player_characteristics || [])?.[1]) as string[]
        return disadvantage.includes(value as string)
      }
    }
  }

  if (/player_(\w+)_col/.test(dataIndex)) {
    const statName                 = dataIndex.replace('player_', '').replace('_col', '')
    const uniqueData: PlayerStat[] = _.chain(dataSource).map('player_col').uniqBy(statName).filter(item => Boolean(item)).value() as PlayerStat[]
    return {
      // @ts-ignore
      filters: uniqueData.map(item => ({ text: item?.[statName] || '', value: item?.[statName] || '' })),
      // @ts-ignore
      onFilter: (value, record) => (record.player_col as PlayerStat)?.[statName] === value
    }
  }

  if (inputType === 'select') {
    const uniqueData: string[] = _.chain(dataSource).map(dataIndex).uniqBy(item => item).filter(item => Boolean(item)).value() as string[]
    return {
      filters: uniqueData.map(item => ({ text: item || '', value: item || '' })),
      onFilter: (value, record) => record[dataIndex] === value
    }
  }
  if (inputType === 'multiselect') {
    // @ts-ignore
    const uniqueData: string[] = _.chain(dataSource).map(dataIndex).flatten().filter(item => Boolean(item)).uniqBy(item => item).value() as string[]
    return {
      filters: uniqueData.map(item => ({ text: item || '', value: item || '' })),
      onFilter: (value, record) => (record[dataIndex] as string[]).includes(value as string)
    }
  }
  if (inputType === 'teamSelect') {
    const uniqueData: Team[] = _.chain(dataSource).map(dataIndex).uniqBy('id').filter(item => Boolean(item)).value() as Team[]
    return {
      filters: uniqueData.map(item => ({ text: item?.name || '', value: item?.id || '' })),
      onFilter: (value, record) => (record[dataIndex] as Team)?.id === value
    }
  }
  if (inputType === 'playerSelect') {
    const uniqueData: PlayerStat[] = _.chain(dataSource).map(dataIndex).uniqBy('player_id').filter(item => Boolean(item)).value() as PlayerStat[]
    return {
      filters: uniqueData.map(item => ({ text: item?.player_name || '', value: item?.player_id || '' })),
      onFilter: (value, record) => (record[dataIndex] as PlayerStat)?.player_id === value
    }
  }
  if (inputType === 'countrySelect') {
    const uniqueData: Country[] = _.chain(dataSource).map(dataIndex).uniqBy('id').filter(item => Boolean(item)).value() as Country[]
    return {
      filters: uniqueData.map(item => ({ text: item?.name || '', value: item?.id || '' })),
      onFilter: (value, record) => (record[dataIndex] as Country)?.id === value
    }
  }
  if (inputType === 'leagueSelect') {
    const uniqueData: League[] = _.chain(dataSource).map(dataIndex).uniqBy('id').filter(item => Boolean(item)).value() as League[]
    return {
      filters: uniqueData.map(item => ({ text: item?.name || '', value: item?.id || '' })),
      onFilter: (value, record) => (record[dataIndex] as League)?.id === value
    }
  }
  if (inputType === 'positionSelect') {
    const uniqueData: PositionType[] = _.chain(dataSource).map(dataIndex).uniqBy(item => item).filter(item => Boolean(item)).value() as PositionType[]
    return {
      filters: uniqueData.map(item => ({ text: item || '', value: item || '' })),
      onFilter: (value, record) => (record[dataIndex] as PositionType) === value
    }
  }
  if (inputType === 'footSelect') {
    const uniqueData: FootType[] = _.chain(dataSource).map(dataIndex).uniqBy(item => item).filter(item => Boolean(item)).value() as FootType[]
    return {
      filters: uniqueData.map(item => ({ text: item || '', value: item || '' })),
      onFilter: (value, record) => (record[dataIndex] as FootType) === value
    }
  }
  if (inputType === 'multiplayerSelect') {
    try {
      const uniqueData: PlayerStat[] = _.chain(dataSource)
        .map(dataIndex)
        .flatten()
        // @ts-ignore
        .filter((item: PlayerStat) => Boolean(item.id))
        .uniqBy((item: PlayerStat) => item.player_id)
        .value() as PlayerStat[]
      return {
        filters: uniqueData.map(item => ({ text: item.player_name || '', value: item.player_id || '' })),
        onFilter: (value, record) => {
          if (!record[dataIndex]) return false
          return (record[dataIndex] as PlayerStat[])?.map(item => item.player_id).includes(value as string)
        }
      }
    } catch (e) {
      return {}
    }
  }
  if (inputType === 'range') {
    // @ts-ignore
    const uniqueData: number[][] = _.chain(dataSource).map(dataIndex).uniqBy(item => item).filter(item => Boolean(item)).value() as number[]

    if (uniqueData.length === 0) return {}
    const min = Math.min(...uniqueData.map(item => item[0] || 0))
    const max = Math.max(...uniqueData.map(item => item[1] || 0))

    if (min === max) return {}

    return {
      filterDropdown: ({  setSelectedKeys,  clearFilters, confirm }) => {
        return (
          <div className="custom-filter-dropdown ant-table-filter-dropdown" style={{ minWidth: '20rem', padding: '0.5rem 1rem' }}>

            <Row>
              <Col span={4}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div>
                    <strong>Min:</strong>
                  </div>
                  <div>{min}</div>
                </div>
              </Col>
              <Col span={16}>
                <Slider
                  range={{ draggableTrack: true }}
                  defaultValue={[min, max]}
                  min={min}
                  max={max}
                  onChange={(values: [number, number]) => {
                    // @ts-ignore
                    const filteredValues: string[] = dataSource?.filter(item => {
                      const rangeValue = (item[dataIndex] as [number, number])
                      if (!rangeValue) return false

                      const minVal = rangeValue[0] || 0
                      const maxVal = rangeValue[1] || 99

                      const rangedVal    = Array.from({ length: maxVal - minVal + 1 }, (_, i) => minVal + i)
                      const valuesRanged = Array.from({ length: values[1] - values[0] + 1 }, (_, i) => values[0] + i)

                      return rangedVal.some(item => valuesRanged.includes(item))
                    }).map(item => item.row_id)
                    setSelectedKeys(filteredValues)
                  }}
                />
              </Col>
              <Col span={4}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div>
                    <strong>Max:</strong>
                  </div>
                  <div>{max}</div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={12} >
                <Button
                  type="link"
                  onClick={() => {
                    clearFilters?.()
                    confirm()
                  }}
                >
                  Reset
                </Button>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Button
                  type="primary"
                  onClick={() => confirm()}
                >
                  Ok
                </Button>
              </Col>
            </Row>
          </div>
        )
      },
      onFilter: (value, record) => {
        // @ts-ignore
        if (value) { return (value as string[]).includes(record.row_id) }

        return false
      }

    }
  }
  if (inputType === 'budget') {
    // @ts-ignore
    const uniqueData: BudgetCellType[] = _.chain(dataSource).map(dataIndex).uniqBy(item => item).filter(item => Boolean(item)).value() as BudgetCellType[]

    if (uniqueData.length === 0) return {}
    const min = Math.min(...uniqueData.map(item => item.from || 0))
    const max = Math.max(...uniqueData.map(item => item.to || 0))

    if (min === max) return {}

    return {
      filterDropdown: ({  setSelectedKeys,  clearFilters, confirm }) => {
        return (
          <div className="custom-filter-dropdown ant-table-filter-dropdown" style={{ minWidth: '20rem', padding: '0.5rem 1rem' }}>

            <Row>
              <Col span={4}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div>
                    <strong>Min:</strong>
                  </div>
                  <div>{min}</div>
                </div>
              </Col>
              <Col span={16}>
                <Slider
                  range={{ draggableTrack: true }}
                  defaultValue={[min, max]}
                  min={min}
                  max={max}
                  onChange={(values: [number, number]) => {
                    // @ts-ignore
                    const filteredValues: string[] = dataSource?.filter(item => {
                      const rangeValue = (item[dataIndex] as BudgetCellType)
                      if (!rangeValue) return false

                      const minVal = rangeValue.from || 0
                      const maxVal = rangeValue.to || 99

                      const rangedVal    = Array.from({ length: maxVal - minVal + 1 }, (_, i) => minVal + i)
                      const valuesRanged = Array.from({ length: values[1] - values[0] + 1 }, (_, i) => values[0] + i)

                      return rangedVal.some(item => valuesRanged.includes(item))
                    }).map(item => item.row_id)
                    setSelectedKeys(filteredValues)
                  }}
                />
              </Col>
              <Col span={4}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div>
                    <strong>Max:</strong>
                  </div>
                  <div>{max}</div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={12} >
                <Button
                  type="link"
                  onClick={() => {
                    clearFilters?.()
                    confirm()
                  }}
                >
                  Reset
                </Button>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Button
                  type="primary"
                  onClick={() => confirm()}
                >
                  Ok
                </Button>
              </Col>
            </Row>
          </div>
        )
      },
      onFilter: (value, record) => {
        // @ts-ignore

        return (value as string[]).includes(record.row_id)
      }

    }
  }
  if (inputType === 'salary') {
    // @ts-ignore
    const uniqueData: SalaryCellType[] = _.chain(dataSource).map(dataIndex).uniqBy(item => item).filter(item => Boolean(item)).value() as SalaryCellType[]

    if (uniqueData.length === 0) return {}
    const min = Math.min(...uniqueData.map(item => item.from || 0))
    const max = Math.max(...uniqueData.map(item => item.to || 0))

    if (min === max) return {}

    return {
      filterDropdown: ({  setSelectedKeys,  clearFilters, confirm }) => {
        return (
          <div className="custom-filter-dropdown ant-table-filter-dropdown" style={{ minWidth: '20rem', padding: '0.5rem 1rem' }}>

            <Row>
              <Col span={4}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div>
                    <strong>Min:</strong>
                  </div>
                  <div>{min}</div>
                </div>
              </Col>
              <Col span={16}>
                <Slider
                  range={{ draggableTrack: true }}
                  defaultValue={[min, max]}
                  min={min}
                  max={max}
                  onChange={(values: [number, number]) => {
                    // @ts-ignore
                    const filteredValues: string[] = dataSource?.filter(item => {
                      const rangeValue = (item[dataIndex] as SalaryCellType)
                      if (!rangeValue) return false

                      const minVal = rangeValue.from || 0
                      const maxVal = rangeValue.to || 99

                      const rangedVal    = Array.from({ length: maxVal - minVal + 1 }, (_, i) => minVal + i)
                      const valuesRanged = Array.from({ length: values[1] - values[0] + 1 }, (_, i) => values[0] + i)

                      return rangedVal.some(item => valuesRanged.includes(item))
                    }).map(item => item.row_id)
                    setSelectedKeys(filteredValues)
                  }}
                />
              </Col>
              <Col span={4}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div>
                    <strong>Max:</strong>
                  </div>
                  <div>{max}</div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={12} >
                <Button
                  type="link"
                  onClick={() => {
                    clearFilters?.()
                    confirm()
                  }}
                >
                  Reset
                </Button>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Button
                  type="primary"
                  onClick={() => confirm()}
                >
                  Ok
                </Button>
              </Col>
            </Row>
          </div>
        )
      },
      onFilter: (value, record) => {
        // @ts-ignore
        return (value as string[]).includes(record.row_id)
      }

    }
  }
  if (inputType === 'number') {
    // @ts-ignore
    const uniqueData: number[] = _.chain(dataSource).map(dataIndex).uniqBy(item => item).filter(item => Boolean(item)).value() as number[]

    if (uniqueData.length === 0) return {}
    const min = Math.min(...uniqueData)
    const max = Math.max(...uniqueData)

    if (min === max) return {}

    return {
      filterDropdown: ({  setSelectedKeys,  clearFilters, confirm }) => {
        return (
          <div className="custom-filter-dropdown ant-table-filter-dropdown" style={{ minWidth: '20rem', padding: '0.5rem 1rem' }}>

            <Row>
              <Col span={4}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div>
                    <strong>Min:</strong>
                  </div>
                  <div>{min}</div>
                </div>
              </Col>
              <Col span={16}>
                <Slider
                  range={{ draggableTrack: true }}
                  defaultValue={[min, max]}
                  min={min}
                  max={max}
                  onChange={(values: [number, number]) => {
                    // @ts-ignore
                    const filteredValues: string[] = dataSource?.filter(item => {
                      const numberValue = (item[dataIndex] as number)
                      if (!numberValue) return false

                      return numberValue >= values[0] && numberValue <= values[1]
                    }).map(item => item.player_id)
                    console.log(filteredValues)
                    setSelectedKeys(filteredValues)
                  }}
                />
              </Col>
              <Col span={4}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div>
                    <strong>Max:</strong>
                  </div>
                  <div>{max}</div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={12} >
                <Button
                  type="link"
                  onClick={() => {
                    clearFilters?.()
                    confirm()
                  }}
                >
                  Reset
                </Button>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Button
                  type="primary"
                  onClick={() => confirm()}
                >
                  Ok
                </Button>
              </Col>
            </Row>
          </div>
        )
      },
      onFilter: (value, record) => {
        // @ts-ignore
        if (value) { return (value as string[]).includes(record.player_id) }

        return false
      }

    }
  }
  if (inputType === 'date') {
    const uniqueData: number[] = _.chain(dataSource).map(dataIndex).uniqBy((item: any) => moment.unix(item).format('ll')).filter(item => Boolean(item)).value() as number[]
    return {
      filters: uniqueData.map(item => ({ text: moment.unix(item).format('ll') || '', value: item || '' })),
      onFilter: (value, record) => record[dataIndex] === value
    }
  }
  if (inputType === 'url' || inputType === 'text') {
    const uniqueData: string[] = _.chain(dataSource).map(dataIndex).uniqBy(item => item).filter(item => Boolean(item)).value() as string[]
    return {
      filters: uniqueData.map(item => ({ text: item || '', value: item || '' })),
      onFilter: (value, record) => record[dataIndex] === value
    }
  }

  const uniqueData: string[] = _.chain(dataSource).map(dataIndex).uniqBy(item => item).filter(item => Boolean(item)).value() as string[]
  return {
    filters: uniqueData.map(item => ({ text: item || '', value: item || '' })),
    onFilter: (value, record) => record[dataIndex] === value
  }
}
