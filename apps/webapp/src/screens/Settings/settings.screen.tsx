import React, { memo } from 'react'

import { Tabs, Typography } from 'antd'
import { createUseStyles }  from 'react-jss'

import { useLocation, useNavigate } from 'react-router-dom'

const useStyles      = createUseStyles({
  root: {
    display: 'flex',
    flex: 'auto',
    flexDirection: 'column',
    minHeight: 0,
    background: '#f0f2f5',
    margin: -8,
    height: 'calc(100vh - 64px)'
  },
  wrapper: {
    margin: 24,
    background: '#fff',
    minHeight: 300,
    height: '100%'
  },
  title: {
    margin: [12, 0, 0, 12]
  }
})
const items          = [
  {
    label: 'Accunt Settings',
    key: 'account-settings',
    children: 'Content of Tab AccuntSettings'
  }
]
const SettingsScreen = memo(function SettingsScreen () {
  const classes  = useStyles()
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Typography.Title level={3} className={classes.title}>Settings</Typography.Title>
        <Tabs
          tabPosition="left"
          items={items}
          activeKey={location.hash.replace('#', '')}
          onChange={(key) => navigate({
            pathname: location.pathname,
            hash: key
          })}
        />
      </div>
    </div>
  )
})

export default SettingsScreen
