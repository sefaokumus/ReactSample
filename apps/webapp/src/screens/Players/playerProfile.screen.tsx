import React, { memo,  useEffect } from 'react'

import { UserOutlined }                                                                     from '@ant-design/icons'
import { useStoreActions, useStoreState }                                                   from '@monorepo/common/hooks'
import {  tCharacteristics, tFoot, tPosition }                                              from '@monorepo/common/utils/translator'
import { Avatar, Breadcrumb,  Col, Descriptions, Image, Row,  Spin, Statistic, Typography } from 'antd'
import moment                                                                               from 'moment'
import { createUseStyles }                                                                  from 'react-jss'
import { Link, useParams, Navigate }                                                        from 'react-router-dom'
import PlayerRadarChart                                                                     from 'src/components/PlayerRadarChart'
import PositionPitchGraph                                                                   from 'src/components/PositionPitchGraph'
import Box                                                                                  from 'src/components/ui/Box'

// import PlayerMatchesTable    from './components/PlayerMatchesTable'
import MarketValueGraph           from './components/MarketValueGraph'
import PlayerStatisticsTable      from './components/PlayerStatisticsTable'
import PlayerTransferHistoryTable from './components/PlayerTransferHistoryTable'

const useStyles = createUseStyles({
  infoRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  header: {
    display: 'grid',
    gridTemplateColumns: '200px 1fr 200px',
    gridTemplateRows: '1fr',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    backgroundColor: '#fafafa',
    '@media (max-width: 990px)': {
      gridTemplateColumns: '1fr',
      justifyItems: 'center'
    }

  },
  imageAvatar: {
    borderRadius: 90,
    boxShadow: '0 0 10px 0 rgba(0,0,0,0.1)',
    background: '#fff',
    padding: 8,
    objectFit: 'contain'
  },
  miniImg: {
    marginRight: 2
  }
})

const PlayerProfileScreen = memo(function PlayerProfileScreen () {
  const { id }  = useParams()
  const classes = useStyles()

  const { selectedPlayer, isLoading } = useStoreState((state) => state.players)
  const { getPlayer }                 = useStoreActions((state) => state.players)

  useEffect(() => {
    if (id) { getPlayer({ player_id: id }) }
  }, [id])

  if (!id) return <Navigate to={'/'} />
  return (
    <Spin spinning={isLoading}>
      <Breadcrumb style={{ margin: '8px 0px 16px 0px' }}>
        <Breadcrumb.Item>
          <Link to='/'>Home</Link>
        </Breadcrumb.Item>
        {
          selectedPlayer?.season_league_name && (<Breadcrumb.Item>
            <Image
              height={15}
              src={selectedPlayer?.season_league_logo || ''}
              preview={false}
              rootClassName={classes.miniImg}
            />
            <Link to={`/league/${selectedPlayer?.season_league_id}`}>{selectedPlayer?.season_league_name}</Link>
          </Breadcrumb.Item>
          )
        }
        {
          selectedPlayer?.team_name && (<Breadcrumb.Item>
            <Image
              height={15}
              src={selectedPlayer?.team_logo || ''}
              preview={false}
              rootClassName={classes.miniImg}
            />
            <Link to={`/team/${selectedPlayer?.team_id}`}>{selectedPlayer?.team_name}</Link>
          </Breadcrumb.Item>)
        }
        <Breadcrumb.Item>
          {selectedPlayer?.player_name}
        </Breadcrumb.Item>
      </Breadcrumb>

      {/* Two column layout */}
      <Row gutter={8}>
        <Col span={16}>
          <Box className={classes.header}>
            {
              selectedPlayer?.player_logo
                ? <Image src={selectedPlayer.player_logo} width={180} height={180} className={classes.imageAvatar} />
                : <Avatar icon={<UserOutlined />} size={80} />
            }
            <div>
              <Typography.Title level={3}>{selectedPlayer?.player_name} ({selectedPlayer?.player_age})</Typography.Title>
              <Descriptions  size='small' column={1}>
                <Descriptions.Item label="Birthday">{moment.unix(selectedPlayer?.player_birthday || moment().unix()).format('lll')}</Descriptions.Item>
                <Descriptions.Item label="Position">{selectedPlayer?.player_positions}</Descriptions.Item>
                <Descriptions.Item label="Foot">{tFoot(selectedPlayer?.player_preferred_foot)}</Descriptions.Item>

                {
                  selectedPlayer?.player_country_id && (<Descriptions.Item label="Nationality">
                    <Image
                      height={15}
                      src={selectedPlayer?.player_country_id || ''}
                      preview={false}
                      rootClassName={classes.miniImg}
                    />
                    <Link to={`/country/${selectedPlayer?.player_country_id}`}>{selectedPlayer?.player_country_id}</Link>
                  </Descriptions.Item>
                  )
                }
                {
                  selectedPlayer?.team_name && (<Descriptions.Item label="Team">
                    <Image
                      height={15}
                      src={selectedPlayer?.team_logo || ''}
                      preview={false}
                      rootClassName={classes.miniImg}

                    />
                    <Link to={`/team/${selectedPlayer?.team_id}`}>{selectedPlayer?.team_name}</Link>
                  </Descriptions.Item>)
                }
                <Descriptions.Item label="Contract Due"> {selectedPlayer?.player_contract_until ? moment.unix(selectedPlayer?.player_contract_until).format('ll') : 'N/A'}</Descriptions.Item>
              </Descriptions >
            </div>
            <Statistic  title="Market Value" value={selectedPlayer?.player_market_value || ''} prefix={selectedPlayer?.player_market_value_currency} />

          </Box>
          {
            selectedPlayer?.player_characteristics && (selectedPlayer?.player_characteristics[0] || selectedPlayer?.player_characteristics[1]) && (
              <Box style={{ display: 'flex', flexDirection: 'column', background: '#fff' }}>
                {
                  selectedPlayer?.player_characteristics[0] && (
                    <Typography.Text type='success' >Strengths : {selectedPlayer?.player_characteristics[0]?.map((c) =>  c && Array.isArray(c) && tCharacteristics(c[0])).join(', ') }</Typography.Text>
                  )
                }
                {
                  selectedPlayer?.player_characteristics[1] && (
                    <Typography.Text type='danger' >Weaknesses : {selectedPlayer?.player_characteristics[1]?.map((c) => c && Array.isArray(c) && tCharacteristics(c[0])).join(', ') }</Typography.Text>
                  )
                }

              </Box>
            )
          }

          <Box style={{ background: '#fff' }}>
            <Typography.Title level={5}>Info</Typography.Title>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'space-evenly', alignContent: 'center' }}>
              {/* @ts-ignore */}
              <PlayerRadarChart abilities={selectedPlayer?.player_ability} />

              {
                selectedPlayer?.player_positions && selectedPlayer?.player_positions?.length > 0 &&
              <PositionPitchGraph
                direction='horizontal'
                // @ts-expect-error
                mainPosition={tPosition(selectedPlayer?.player_positions[0])}
                positions={selectedPlayer?.player_positions[1]}
              />
              }

            </div>
          </Box>
          <Box style={{ background: '#fff' }}>
            <Typography.Title level={5}>Statistics</Typography.Title>
            <PlayerStatisticsTable player={selectedPlayer} />
          </Box>
        </Col>
        <Col span={8}>
          <Box style={{ background: '#fff' }}>
            <Typography.Title level={5}>Market Value</Typography.Title>
            <MarketValueGraph />
          </Box>
          <Box style={{ background: '#fff' }}>
            <Typography.Title level={5}>Transfer History</Typography.Title>
            <PlayerTransferHistoryTable />
          </Box>
          <Box style={{ background: '#fff' }}>
            <Typography.Title level={5}>Details</Typography.Title>
            <Descriptions bordered  size='small' column={1}>
              <Descriptions.Item label="Number">{Math.floor(Math.random() * 100) + 1}</Descriptions.Item>{/* {TODO player.number} */}
              <Descriptions.Item label="Position">{selectedPlayer?.player_positions?.join(', ')}</Descriptions.Item>
              <Descriptions.Item label="Foot">{tFoot(selectedPlayer?.player_preferred_foot)}</Descriptions.Item>
              <Descriptions.Item label="Contract Due">{moment.unix(selectedPlayer?.player_contract_until || moment().unix()).format('ll')}</Descriptions.Item>
              <Descriptions.Item label="Height">{selectedPlayer?.player_height}</Descriptions.Item>
              <Descriptions.Item label="Weight">{selectedPlayer?.player_weight }</Descriptions.Item>
              <Descriptions.Item label="Date of Birth">{moment.unix(selectedPlayer?.player_birthday || moment().unix()).format('ll')}</Descriptions.Item>
            </Descriptions >
          </Box>
        </Col>
      </Row>
      {/* <PositionPitchGraph direction='horizontal' positions={[selectedPlayer?.position]} /> */}

      {/* first column  Charts, Last Matches, Statistics, Transfers */}

      {/* second column player Summary */}
    </Spin>
  )
})

export default PlayerProfileScreen
