import React, { useCallback } from 'react'

import { Scatter }                              from '@ant-design/plots'
import type { ScatterConfig }                   from '@ant-design/plots'
import { PlayerStat, StatEnum }                 from '@monorepo/common/types'
import { safeString }                           from '@monorepo/common/utils/helper'
import { tFoot, translatePlayerStat }           from '@monorepo/common/utils/translator'
import { Button, Col, Row, Select, Typography } from 'antd'
import _                                        from 'lodash'
import Box                                      from 'src/components/ui/Box'

type DefinedChartProps = {
  xField: StatEnum
  yField: StatEnum
  data: PlayerStat[] | undefined
  compareData: PlayerStat[] | undefined
  onAddChart?: undefined
}
type EmptyChartProps = {
  xField?: never
  yField?: never
  data?: never
  compareData?: never
  onAddChart: (args : any) => void
}

type ScatterChartProps = DefinedChartProps | EmptyChartProps
const options = Object.values(StatEnum).map(stat => <Select.Option key={stat} value={stat}>{translatePlayerStat(stat)} per Game</Select.Option>)

const ScatterChart = React.memo(function ScatterChart ({ xField, yField, data, compareData, onAddChart }: ScatterChartProps) {
  if (!xField || !yField) {
    const [x, setX] = React.useState<StatEnum>()
    const [y, setY] = React.useState<StatEnum>()

    const handleAddChart = React.useCallback(() => {
      onAddChart && onAddChart({ xField: x, yField: y })

      setX(undefined)
      setY(undefined)
    }, [x, y, onAddChart])
    return <Box style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 32,
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 32,
      paddingRight: 32,
      background: '#fff'
    }}>
      <Typography.Title level={4}>Add New Chart</Typography.Title>
      <Select
        showSearch
        allowClear
        placeholder="Select X-Axis Stat Type"
        style={{ width: '100%' }}
        value={x}
        onChange={setX}
      >
        {options}
      </Select>

      <Select
        showSearch
        allowClear
        placeholder="Select Y-Axis Stat Type"
        style={{ width: '100%' }}
        value={y}
        onChange={setY}
      >
        {options}
      </Select>

      <Button type="primary" onClick={handleAddChart}>Add Chart</Button>
    </Box>
  }

  const config = useCallback(() => {
    const c : ScatterConfig = {
      appendPadding: 4,
      data: [
        ...data?.map(d => ({ ...d, dataType: 'Analysis' })) || [],
        ...compareData?.map(d => ({ ...d, dataType: d.player_name })) || []],
      xField,
      yField,
      shapeField: 'dataType',
      shape: ['circle'],
      colorField: 'dataType',
      color: ['#5B8FF9', '#D50000', '#5AD8A6', '#5D7092', '#F6BD16', '#E86452', '#6DC8EC', '#9270CA', '#FF9D4D', '#269A99', '#FF99C3'],
      sizeField: 'dataType',
      // size: [4, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
      size: (d) => {
        if (d.dataType === 'Analysis') {
          return 4
        }
        return 10
      },
      pointStyle: {
        fillOpacity: 0.8
      },

      yAxis: {
        label: {
          offset: 10
        },
        line: {
          style: {
            stroke: '#aaa'
          }
        }
      },
      xAxis: {
        label: {
          // autoRotate: false,
          offset: 10,
          style: {
            fill: '#aaa',
            fontSize: 12
          },
          formatter: (name) => parseFloat(name).toFixed(2)
        },
        line: {
          style: {
            stroke: '#aaa'
          }
        },
        grid: {
          line: {
            style: {
              stroke: '#eee'
            }
          }
        }
      },
      quadrant: {
        xBaseline: _.meanBy(data, xField),
        yBaseline: _.meanBy(data, yField),
        lineStyle: {
          // @ts-expect-error
          lineDash: [4, 2],
          lineWidth: 2
        },
        regionStyle: [
          {
            // @ts-expect-error
            fill: '#5bd8a6',
            fillOpacity: 0.1
          },
          {
            // @ts-expect-error
            fill: '#f7664e',
            fillOpacity: 0.1
          },
          {
            // @ts-expect-error
            fill: '#f7664e',
            fillOpacity: 1
          },
          {
            // @ts-expect-error
            fill: '#f7664e',
            fillOpacity: 0.1
          }
        ]
      },
      tooltip: {
        showTitle: false,
        showMarkers: true,
        enterable: true,
        domStyles: {
          'g2-tooltip': {
            padding: '10px'
          }
        },
        fields: ['name', xField, yField],
        customContent: (title, items) => {
          const field: PlayerStat = items?.[0]?.data

          let htmlStr = `

          <div style="margin:10px 0;font-weight:700;">${field?.player_name} (${field?.team_name})</div>
          <div class="g2-tooltip-item" style="margin-bottom:8px;display:flex;justify-content:space-between;">
            <span class="g2-tooltip-item-label" style="margin-right: 12px;">Age</span>
            <span class="g2-tooltip-item-value">${field?.player_age}</span>
          </div>
          <div class="g2-tooltip-item" style="margin-bottom:8px;display:flex;justify-content:space-between;">
            <span class="g2-tooltip-item-label" style="margin-right: 12px;">Height</span>
            <span class="g2-tooltip-item-value">${tFoot(field?.player_height)}</span>
          </div>
          <div class="g2-tooltip-item" style="margin-bottom:8px;display:flex;justify-content:space-between;">
            <span class="g2-tooltip-item-label" style="margin-right: 12px;">Foot</span>
            <span class="g2-tooltip-item-value">${tFoot(field?.player_preferred_foot)}</span>
          </div>
          <div class="g2-tooltip-item" style="margin-bottom:8px;display:flex;justify-content:space-between;">
            <span class="g2-tooltip-item-label" style="margin-right: 12px;">Positions</span>
            <span class="g2-tooltip-item-value">${field?.player_positions && safeString(field?.player_positions)?.join(', ')}</span>
          </div>

          <div class="g2-tooltip-item" style="margin-bottom:8px;display:flex;justify-content:space-between;">
            <span class="g2-tooltip-item-label" style="margin-right: 12px;">Match Count</span>
            <span class="g2-tooltip-item-value">${field?.matches}</span>
          </div>

          <div class="g2-tooltip-item" style="margin-bottom:8px;display:flex;justify-content:space-between;">
            <span class="g2-tooltip-item-label" style="margin-right: 12px;">Minutes Played</span>
            <span class="g2-tooltip-item-value">${field?.avgMinutesPlayed.toFixed(2)} (${field?.minutes_played}) </span>
          </div>

          <div class="g2-tooltip-item" style="margin-bottom:8px;display:flex;justify-content:space-between;">
            <span class="g2-tooltip-item-label" style="margin-right: 12px;">Goals</span>
            <span class="g2-tooltip-item-value">${field?.avgGoals.toFixed(2)} (${field?.goals}) </span>
          </div>

          <div class="g2-tooltip-item" style="margin-bottom:8px;display:flex;justify-content:space-between;">
            <span class="g2-tooltip-item-label" style="margin-right: 12px;">Assists</span>
            <span class="g2-tooltip-item-value">${field?.avgAssists.toFixed(2)} (${field?.assists}) </span>
          </div>
          `

          htmlStr += `
            <div style="margin:10px 0;font-weight:700;">Chart Data</div>
            <div style="margin-top:8px;margin-bottom:8px;">
                            ${
  items.map((item) => {
    if (item.name !== 'name') {
      return `<div class="g2-tooltip-item" style="margin-bottom:8px;display:flex;justify-content:space-between;">
                  <span class="g2-tooltip-item-label" style="margin-right: 12px;">${item.name}</span>
                  <span class="g2-tooltip-item-value">${parseFloat(item.value).toFixed(2)}</span>
                </div>`
    }
    return ''
  }).join('')
}
              </div>`

          htmlStr += '<button class="ant-btn ant-btn-default" style="margin-top:10px">Add to Shortlist</button>'
          htmlStr += '</div>'
          return htmlStr
        }
      },
      label: {
        formatter: (datum) => {
          // Display only few labels to avoid clutter using a random number
          if (Math.random() > 0.99) {
            return datum.player_name
          }
        }

      },
      sizeLegend: {
        position: (compareData?.length || 0) > 3 ?  'right' : 'bottom'
      }
    }

    return c
  }, [xField, yField, data, compareData])

  return (
    <Box style={{ padding: 8, background: '#fff' }}>
      <Row>
        <Col span={24}>
          <Typography.Text type='secondary'>{translatePlayerStat(yField)} per Game</Typography.Text>
        </Col>
        <Col span={24}>
          <Scatter {...config()} />
        </Col>
        <Col span={24} style={{ textAlign: 'end' }} >
          <Typography.Text type='secondary' >{translatePlayerStat(xField)} per Game</Typography.Text>
        </Col>
      </Row>
    </Box>)
})

export default ScatterChart
