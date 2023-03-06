import React from 'react'

import { AreaMap }            from '@ant-design/charts'
import type { AreaMapConfig } from '@ant-design/charts'

import countries                               from '@monorepo/common/constants/data/worldCountries.json'
import { PlayerStat }                          from '@monorepo/common/types'
import {  Col, Row, Table, Typography, Image } from 'antd'
import _                                       from 'lodash'
import Box                                     from 'src/components/ui/Box'

const GeoMap = ({ data }: { data: PlayerStat[] }) => {
  const playerData = _.chain(data)
    .groupBy('player_country_id')
    .map((value, key) => ({
      id: key,
      name: value[0].player_country_name,
      logo: value[0].player_country_logo,
      playerCount: value.length
    })).sortBy('playerCount').reverse().value()

  const config : AreaMapConfig = {
    map: {
      type: 'mapbox',
      token: process.env.REACT_APP_MAPBOX_TOKEN,
      style: 'blank',
      center: [0, 40],
      zoom: 0
    },
    autoFit: false,
    source: {
      data: countries,
      parser: {
        type: 'geojson'
      },
      transforms: [
        {
          type: 'join',
          targetField: 'name',
          sourceField: 'name',
          data: playerData
        }
      ]

    },
    style: {
      opacity: 1,
      stroke: '#f0f0f0',
      lineWidth: 0.6,
      lineOpacity: 0.5
    },
    color: {
      field: 'playerCount',
      value: ['#bbe4d7', '#61c0a2', '#1da57a', '#147355', '#0c4231'],
      scale: {
        type: 'quantile'
      }
    },
    state: {
      active: {
        fill: '#cecce8'
      },
      select: {
        fill: '#a4a0db'
      }
    },
    tooltip: {
      items: ['name', 'playerCount']

    },
    zoom: false,
    scale: false

  }
  return (
    <Box style={{ background: '#fff' }}>
      <Row>
        <Col span={12}>
          <Table
            size='small'
            style={{
              minHeight: 300
            }}
            dataSource={playerData}
            rowKey={(record) => record.id}
            columns={[
              {
                title: 'Country',
                render: (text, record) => {
                  return <Row gutter={[8, 8]}>
                    <Col>
                      {
                        record?.logo && <Image
                          height={15}
                          src={record?.logo || ''}
                          preview={false}
                          style={{ border: '1px solid #d0d2d6' }}
                        />
                      }

                      {/* <ReactCountryFlag countryCode={record.id} title={record.id} svg style={{ fontSize: '1.5em', lineHeight: '1.5em' }} /> */}
                    </Col>
                    <Col><Typography.Text >{record.name || 'Unknown'}</Typography.Text></Col>
                  </Row>
                }
              },
              {
                title: 'Players Found',
                render: (text, record) => {
                  return <span>{record.playerCount}</span>
                },
                sorter: (a, b) => a.playerCount - b.playerCount
              }
            ]}
            pagination={{
              size: 'small',
              pageSize: 10,
              hideOnSinglePage: true,
              showSizeChanger: false
            }}

          />

        </Col>
        <Col span={12}>
          <div style={{ width: '100%', height: '100%', maxWidth: 600, maxHeight: 400 }}>
            {
              playerData.length > 0 && <AreaMap {...config} />
            }
          </div>
        </Col>
      </Row>
    </Box>
  )
}

export default GeoMap
