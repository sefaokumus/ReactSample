
import React from 'react'

import { MenuOutlined, SearchOutlined } from '@ant-design/icons'
import logo                             from '@monorepo/common/assets/images/logo_white.svg'
import { Layout,   Grid, Button  }      from 'antd'
import { createUseStyles }              from 'react-jss'
import { Outlet,  useNavigate }         from 'react-router-dom'

import SearchInput from 'src/components/SearchInput'

import NavMenu from './NavMenu'

const useStyles = createUseStyles({
  layout: {
    minHeight: '100vh'
  },
  wideHeader: {
    padding: [0, 8],
    justifyContent: 'space-between'
  },
  mobileHeader: {
    padding: [0, 8],
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mobileTriggerIcon: {
    color: '#fff'
  },
  mobileHeaderButton: {
    minWidth: 40
  },
  searchBox: {
    maxWidth: 400,
    padding: [0, 12]
  },
  content: {
    background: '#f0f0f0',
    padding: 8,
    minHeight: 360
  },
  logo: {
    float: 'left',
    width: 140,
    height: 45,
    margin: 8
  },

  fullscreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    borderRadius: 0,
    boxShadow: 'none'
  }
})

const { Header, Content, Sider  } = Layout
const { useBreakpoint }           = Grid

const MainPageLayout = React.memo(function Main ()  {
  const classes  = useStyles()
  const navigate = useNavigate()
  const screens  = useBreakpoint()

  const [collapsed, setCollapsed] = React.useState(false)

  const toggle = () => setCollapsed(prev => !prev)

  const WideHeader = () => (
    <Header className={classes.wideHeader}>
      <a href="/" onClick={(e) => {
        e.preventDefault()
        return navigate('/')
      }}
      >
        <img src={logo} alt="" className={classes.logo} />
      </a>
      <NavMenu />
    </Header>
  )

  const MobileHeader = ({ toggle }: { toggle: () => void }) => {
    const [showSearchBox, setShowSearchBox] = React.useState(false)
    return (
      <React.Fragment>
        <Header className={classes.mobileHeader} >
          <Button
            type='ghost'
            size='large'
            className={classes.mobileHeaderButton}
            icon={<MenuOutlined className={classes.mobileTriggerIcon} />}
            onClick={toggle}
          />

          {
            showSearchBox
              ? <SearchInput placeholder='Search' size='large' className={classes.searchBox} />
              : (
                <a className="logo"
                  href="/"
                  onClick={(e) => {
                    e.preventDefault()
                    return navigate('/')
                  }}
                >
                  <img src={logo} alt="" className={classes.logo} />
                </a>
              )
          }
          <Button
            type='ghost'
            size='large'
            className={classes.mobileHeaderButton}
            shape='circle'
            icon={<SearchOutlined className={classes.mobileTriggerIcon} />}
            onClick={() => setShowSearchBox(prev => !prev)}
          />

        </Header>

      </React.Fragment>
    )
  }
  return (
    <Layout className={classes.layout}>

      {
        screens.lg
          ? <WideHeader />
          : <MobileHeader toggle={toggle} />
      }

      <Layout hasSider={!screens.lg}>
        {
          !screens.lg && (
            <Sider
              collapsed={collapsed}
              defaultCollapsed={true}
              trigger={null}
              collapsedWidth={0}
              theme="dark">
              <NavMenu />
            </Sider>
          )
        }

        <Layout>

          <Content className={classes.content}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
})
export default MainPageLayout
