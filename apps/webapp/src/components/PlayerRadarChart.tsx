import React from 'react'

import { Radar }            from '@ant-design/plots'
import type { RadarConfig } from '@ant-design/plots'
import { tAbility }         from '@monorepo/common/utils/translator'

type PlayerRadarChartProps = {
  abilities: [number, number][] | undefined
}

// name: 'Attacking',
// rating: 75
const PlayerRadarChart = ({ abilities }: PlayerRadarChartProps) => {
  if (!abilities) return null

  const config: RadarConfig = {

    data: abilities.map((a) => ({ name: tAbility(a[0]), rating: a[1] })),
    xField: 'name',
    yField: 'rating',
    height: window.innerHeight * 0.2 > 220 ? 220 : window.innerHeight * 0.2,
    appendPadding: [0, 10, 0, 10],
    meta: {
      rating: {
        min: 0,
        nice: true,
        formatter: (v: any) => Number(v).toFixed(2)
      }
    },
    xAxis: {
      tickLine: null
    },
    yAxis: {
      label: false,
      grid: {
        alternateColor: 'rgba(0, 0, 0, 0.04)'
      }
    },
    point: {
      size: 2
    },
    area: {}
  }
  return <Radar {...config} />
}

export default PlayerRadarChart
