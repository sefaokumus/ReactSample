import React from 'react'

import { UserOutlined }                   from '@ant-design/icons'
import { useStoreActions, useStoreState } from '@monorepo/common/hooks'
import { Menu, Grid, MenuProps }          from 'antd'
import { createUseStyles }                from 'react-jss'
import { Link, useLocation }              from 'react-router-dom'
import SearchInput                        from 'src/components/SearchInput'

const useStyles = createUseStyles({
  menu: {
    justifyContent: 'flex-end'
    // minWidth: 950
  },
  menuItem: {
    padding: '0 10px!important'
  },
  searchBoxItem: {
    maxWidth: 240,

    '& .ant-input-search': {
      marginTop: 16
    },
    '&:hover': {
      backgroundColor: 'inherit!important',
      cursor: 'inherit'
    }
  }
})

const { useBreakpoint } = Grid

const NavMenu = React.memo(function NavMenu () {
  const classes     = useStyles()
  const location    = useLocation()
  const currentPath = location.pathname.replace('/', '')
  const screens     = useBreakpoint()

  const { auth: { data: userData } } = useStoreState((state) => state)
  const { auth: { logout } }         = useStoreActions(actions => actions)

  let isDesktop = true
  if (Object.keys(screens).length !== 0) {
    if (screens.lg) { isDesktop = true } else { isDesktop = false }
  }

  const menuItems : MenuProps['items'] = [
    // {
    //   key: 'players',
    //   label: <Link to={'/players'}>Player Profiles</Link>,
    //   className: classes.menuItem
    // },
    {
      key: 'attributes',
      label: <Link to={'/attributes'}>Player Attributes</Link>,
      className: classes.menuItem
    },
    {
      key: 'analysis',
      label: <Link to={'/analysis'}>Comparative Analysis</Link>,
      className: classes.menuItem
    },
    {
      key: 'profiling',
      label: <Link to={'/profiling'}>Profiling</Link>,
      className: classes.menuItem
    },
    {
      key: 'sub',
      label: userData?.username || 'Login',
      icon: <UserOutlined />,
      children: [
        {
          key: 'settings:1',
          label: <Link to={'/settings'}>Profile Settings</Link>
        },
        {
          key: 'settings:2',
          label: 'Logout',
          onClick: () => logout()
        }
      ]

    }
  ]

  if (isDesktop) {
    // push search box one before end of menu
    menuItems.splice(menuItems.length - 1, 0,
      {
        key: 'search-menu-item',
        label: <SearchInput placeholder="Search" />,
        className: classes.searchBoxItem
      })
  }

  return (
    <Menu className={classes.menu} selectedKeys={[currentPath]} items={menuItems} theme="dark" mode={isDesktop ? 'horizontal' : 'inline'}  />

  )
})
export default NavMenu
