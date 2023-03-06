import React from 'react'

import { UserOutlined  }                                       from '@ant-design/icons'
import worldCountries                                          from '@monorepo/common/constants/data/worldCountries.json'
import { PlayerStat }                                          from '@monorepo/common/types'
import { tFoot, tPosition }                                    from '@monorepo/common/utils/translator'
import { Avatar, Card, Divider, Space, Typography }            from 'antd'
import numeral                                                 from 'numeral'
import ReactCountryFlag                                        from 'react-country-flag'
import { IoFootstepsOutline, IoAnalytics, IoFootballOutline  } from 'react-icons/io5'
import { createUseStyles }                                     from 'react-jss'
interface PlayerCardProps {
  player :  PlayerStat
}
const useStyles = createUseStyles({
  infoRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },
  content: {
    marginTop: 8
  }
})

export default function PlayerCard ({ player }: PlayerCardProps) {
  const countryCode = worldCountries.features.find(country => country.properties.name === player.player_country_name)?.properties.id || 'unknown'
  const classes     = useStyles()

  const getActions = () => {
    const actions = []

    if (player.player_positions) {
      actions.push(
        <Typography.Text type='secondary' className={classes.infoRow} >
          <IoFootballOutline size={20}/>
          {` ${player?.player_positions?.length > 0 ? ` (${player.player_positions.filter(p => p !== '').map(p => tPosition(p || '')).join(', ')})` : ''}`}
        </Typography.Text>)
    }

    if (player.player_preferred_foot && player.player_preferred_foot !== 0) {
      actions.push(
        <Typography.Text type='secondary' className={classes.infoRow}>
          <IoFootstepsOutline size={20} />
          {` ${tFoot(player.player_preferred_foot)}`}
        </Typography.Text>
      )
    }

    if (player.player_market_value) {
      actions.push(
        <Typography.Text type='secondary' className={classes.infoRow}>
          <IoAnalytics size={20} />
          {`${player.player_market_value_currency} ${numeral(player.player_market_value).format('0,0')}`}
        </Typography.Text>)
    }

    return actions
  }

  return (
    <Card
      size='small'
      hoverable
      style={{ maxWidth: 400 }}
      actions={getActions()}
    >
      <Card.Meta
        avatar={player.player_logo ? <Avatar src={player.player_logo } size={60} /> : <Avatar icon={<UserOutlined />}  size={60} />}
        title={<Typography.Title level={5}>{player.player_name} ({player.player_age})</Typography.Title>}

        description={
          <Space>
            {
              player.player_country_name && (
                <React.Fragment>
                  <div style={{ gap: 8, display: 'flex', flexDirection: 'row' }}>
                    <ReactCountryFlag countryCode={countryCode} svg style={{ fontSize: '1.5em', lineHeight: '1.5em' }} />
                    {player.player_country_name}
                  </div>

                  <Divider type="vertical" />
                </React.Fragment>)
            }

            <div style={{ gap: 8, display: 'flex', flexDirection: 'row' }}>
              <Avatar src={player.team_logo} size="small"/>
              {player.team_name}
            </div>
          </Space>

        }
      />

    </Card>
  )
}
