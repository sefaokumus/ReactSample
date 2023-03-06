import React, { memo,  useEffect } from 'react'

import { useStoreActions, useStoreState }                           from '@monorepo/common/hooks'
import { Avatar, Breadcrumb,  Col,  Image, Row,  Spin, Typography } from 'antd'
import { createUseStyles }                                          from 'react-jss'
import { Link, useParams, Navigate }                                from 'react-router-dom'
import Box                                                          from 'src/components/ui/Box'

import CountryLeaguesTable from './components/CountryLeaguesTable'

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

const CountryProfileScreen = memo(function CountryProfileScreen () {
  const { id }  = useParams()
  const classes = useStyles()

  const { countries: { selectedCountry, isLoading }, leagues: { data: countryLeagues } } = useStoreState((state) => state)
  const { countries: { getCountry }, leagues: { getLeagues } }                           = useStoreActions((state) => state)

  useEffect(() => {
    if (id) {
      getCountry({ country_id: id })
      getLeagues({ country_id: id })
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
        <Breadcrumb.Item>
          <Image
            height={15}
            src={selectedCountry?.logo || ''}
            preview={false}
            rootClassName={classes.miniImg}
          />
          {selectedCountry?.name}
        </Breadcrumb.Item>
      </Breadcrumb>

      {/* Two column layout */}
      <Row gutter={8}>
        <Col span={24}>
          <Box className={classes.header}>
            {
              selectedCountry?.logo
                ? <Image src={selectedCountry.logo} width={180} height={180} className={classes.imageAvatar} />
                : <Avatar  size={80} >TM</Avatar>
            }
            <div>
              <Typography.Title level={3}>{selectedCountry?.name} </Typography.Title>
            </div>

          </Box>

          <Box>
            <Typography.Title level={4}>Leagues</Typography.Title>
            { countryLeagues && <CountryLeaguesTable data={countryLeagues} /> }
          </Box>

        </Col>
      </Row>
    </Spin>
  )
})

export default CountryProfileScreen
