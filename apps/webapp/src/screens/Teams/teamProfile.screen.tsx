import React, { memo,  useEffect } from 'react'

import { useStoreActions, useStoreState }                                                   from '@monorepo/common/hooks'
import { Avatar, Breadcrumb,  Col, Descriptions, Image, Row, Spin,  Statistic, Typography } from 'antd'
import { createUseStyles }                                                                  from 'react-jss'
import { Link, useParams, Navigate }                                                        from 'react-router-dom'
import Box                                                                                  from 'src/components/ui/Box'

import TeamPlayersTable from './components/TeamPlayersTable'

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
    padding: 8
  },
  miniImg: {
    marginRight: 2
  }
})

const TeamProfileScreen = memo(function TeamProfileScreen () {
  const { id }  = useParams()
  const classes = useStyles()

  const { teams: { selectedTeam, isLoading }, players: { data: teamPlayers } } = useStoreState((state) => state)
  const { teams: { getTeam }, players: { getPlayers } }                        = useStoreActions((state) => state)

  useEffect(() => {
    if (id) {
      getTeam({ team_id: id })
      getPlayers({ team_id: id })
    }
  }, [id])

  if (!id) return <Navigate to={'/'} />
  return (
    <Spin spinning={isLoading}  >
      {/* Breadcrumps */}
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to='/'>Home</Link>
        </Breadcrumb.Item>
        {
          selectedTeam?.country_name && (<Breadcrumb.Item>
            {
              selectedTeam?.country_logo && <Image
                height={15}
                src={selectedTeam?.country_logo }
                preview={false}
                rootClassName={classes.miniImg}
              />}
            <Link to={`/country/${selectedTeam?.country_id}`}>{selectedTeam?.country_name}</Link>
          </Breadcrumb.Item>
          )
        }
        {
          selectedTeam?.league_name && (<Breadcrumb.Item>
            {/* <Image
              height={15}
              src={selectedTeam?.country_logo || ''}
              preview={false}
              rootClassName={classes.miniImg}
            /> */}
            <Link to={`/league/${selectedTeam?.league_id}`}>{selectedTeam?.league_name}</Link>
          </Breadcrumb.Item>
          )
        }
        <Breadcrumb.Item>
          <Image
            height={15}
            src={selectedTeam?.logo || ''}
            preview={false}
            rootClassName={classes.miniImg}

          />
          {selectedTeam?.name}
        </Breadcrumb.Item>
      </Breadcrumb>

      {/* Two column layout */}
      <Row gutter={8}>
        <Col span={24}>
          <Box className={classes.header}>
            {
              selectedTeam?.logo
                ? <Image src={selectedTeam.logo} width={180} height={180} className={classes.imageAvatar} />
                : <Avatar  size={80} >TM</Avatar>
            }
            <div>
              <Typography.Title level={3}>{selectedTeam?.name} </Typography.Title>
              <Descriptions  size='small' column={1}>
                {
                  selectedTeam?.foundation_time && <Descriptions.Item label="Founded">{selectedTeam.foundation_time}</Descriptions.Item>
                }
                <Descriptions.Item label="Coach"><Link to={`/coach/${selectedTeam?.coach_id}`}>Coach Name TODO</Link> </Descriptions.Item>
                {
                  selectedTeam?.website && (
                    <Descriptions.Item label="URL"><a href={selectedTeam?.website} target="_blank" rel="noreferrer" >{selectedTeam?.website}</a></Descriptions.Item>
                  )
                }
                {
                  selectedTeam?.total_players && (
                    <Descriptions.Item label="Players">
                      {selectedTeam?.total_players}
                    </Descriptions.Item>
                  )
                }
                {
                  selectedTeam?.foreign_players && (
                    <Descriptions.Item label="Foreign Players">
                      {selectedTeam?.foreign_players}
                    </Descriptions.Item>

                  )
                }
                {
                  selectedTeam?.national_players && (
                    <Descriptions.Item label="National Players">
                      {selectedTeam?.national_players}
                    </Descriptions.Item>
                  )
                }
              </Descriptions >
            </div>
            <Statistic  title="Market Value" value={selectedTeam?.market_value || ''} prefix={selectedTeam?.market_value_currency} />

          </Box>

          <Box>
            <Typography.Title level={4}>Players</Typography.Title>
            { teamPlayers && <TeamPlayersTable data={teamPlayers} /> }
          </Box>

        </Col>
      </Row>
    </Spin>
  )
})

export default TeamProfileScreen
