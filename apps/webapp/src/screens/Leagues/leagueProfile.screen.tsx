import React, { memo,  useEffect } from 'react'

import { useStoreActions, useStoreState }                                         from '@monorepo/common/hooks'
import { tLeagueType }                                                            from '@monorepo/common/utils/translator'
import { Avatar, Breadcrumb,  Col, Descriptions, Image, Row,  Spin,  Typography } from 'antd'
import { createUseStyles }                                                        from 'react-jss'
import { Link, useParams, Navigate }                                              from 'react-router-dom'
import Box                                                                        from 'src/components/ui/Box'

import LeagueTeamsTable from './components/LeagueTeamsTable'

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

const LeagueProfileScreen = memo(function LeagueProfileScreen () {
  const { id }  = useParams()
  const classes = useStyles()

  const { leagues: { selectedLeague, isLoading }, teams: { data: leagueTeams } } = useStoreState((state) => state)
  const { leagues: { getLeague }, teams: { getTeams } }                          = useStoreActions((state) => state)

  useEffect(() => {
    if (id) {
      getLeague({ league_id: id })
      getTeams({ league_id: id })
    }
  }, [id])

  if (!id) return <Navigate to={'/'} />
  return (
    <Spin spinning={isLoading}>
      {/* Breadcrumps */}
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to='/'>Home</Link>
        </Breadcrumb.Item>
        {
          selectedLeague?.country_name && (<Breadcrumb.Item>
            {/* {
              selectedLeague?.country_logo && <Image
                height={15}
                src={selectedLeague?.country_logo }
                preview={false}
                rootClassName={classes.miniImg}
              />} */}
            <Link to={`/country/${selectedLeague?.country_id}`}>{selectedLeague?.country_name}</Link>
          </Breadcrumb.Item>
          )
        }
        <Breadcrumb.Item>
          <Image
            height={15}
            src={selectedLeague?.logo || ''}
            preview={false}
            rootClassName={classes.miniImg}

          />
          {selectedLeague?.name}
        </Breadcrumb.Item>
      </Breadcrumb>

      {/* Two column layout */}
      <Row gutter={8}>
        <Col span={24}>
          <Box className={classes.header}>
            {
              selectedLeague?.logo
                ? <Image src={selectedLeague.logo} width={180} height={180} className={classes.imageAvatar} />
                : <Avatar  size={80} >TM</Avatar>
            }
            <div>
              <Typography.Title level={3}>{selectedLeague?.name} </Typography.Title>
              <Descriptions  size='small' column={1}>
                {
                  (selectedLeague?.primary_color || selectedLeague?.secondary_color) &&
                  <Descriptions.Item label="Colors">
                    <div style={{ height: 30, width: 60, display: 'flex', flexDirection: 'row' }}>
                      <div style={{ height: 30, width: 30, backgroundColor: selectedLeague?.primary_color || '#fff' }} />
                      <div style={{ height: 30, width: 30, backgroundColor: selectedLeague?.secondary_color || '#fff' }} />
                    </div>
                  </Descriptions.Item>
                }
                {
                  selectedLeague?.type && (
                    <Descriptions.Item label="Competition">{tLeagueType(selectedLeague.type)} </Descriptions.Item>
                  )
                }
                {
                  selectedLeague?.round_count && (
                    <Descriptions.Item label="Rounds">
                      {selectedLeague?.round_count}
                    </Descriptions.Item>

                  )
                }
                {
                  selectedLeague?.cur_round && (
                    <Descriptions.Item label="Current Round">
                      {selectedLeague?.cur_round}
                    </Descriptions.Item>
                  )
                }
              </Descriptions >
            </div>

          </Box>

          <Box>
            <Typography.Title level={4}>Teams</Typography.Title>
            { leagueTeams && <LeagueTeamsTable data={leagueTeams} /> }
          </Box>

        </Col>
      </Row>
    </Spin>
  )
})

export default LeagueProfileScreen
