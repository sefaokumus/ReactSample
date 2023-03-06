import React, { useEffect } from 'react'

import { useStoreActions, useStoreState }                      from '@monorepo/common/hooks'
import { Hub }                                                 from 'aws-amplify'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'

import MainPageLayout from './layouts/Main/MainLayout'

import {
  AnalysisScreen,
  AttributesScreen,
  ProfilingScreen,
  SearchResultsScreen,
  TeamProfileScreen,
  PlayerProfileScreen,
  LeagueProfileScreen,
  CountryProfileScreen,
  SettingsScreen
} from './screens'
import AuthScreen from './screens/Auth'

const AuthRouter = () => {
  const auth = useStoreState((state) => state.auth)
  const {
    auth: { setData: setUserData, setError },
    appData: { getRemoteSettings }
  } = useStoreActions((state) => state)

  useEffect(() => {
    Hub.listen('auth', ({ payload }) => {
      const { event } = payload

      if (payload?.data?.code?.includes('Exception')) {
        setError(payload.data.message)
      }

      console.log(payload)

      if (event === 'autoSignIn') {
        setUserData(payload.data)

        // assign user
      } else if (event === 'signUp') {
        // assign user
        setUserData(payload.data)
      } else if (event === 'autoSignIn_failure') {
        // redirect to sign in page
      }
    })
  }, [])

  useEffect(() => {
    if (auth.isLoggedIn) { getRemoteSettings(null) }
  }, [auth.isLoggedIn])

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <RequireAuth conditions={[{ condition: !auth.isLoggedIn, redirectUrl: '/login' }]}>
            <MainPageLayout />
          </RequireAuth>} >
          <Route path="/" element={<Navigate to="/attributes" />} />

          <Route path="/attributes" element={<AttributesScreen />} >
            <Route path="/attributes/:key" element={<AttributesScreen />} ></Route>
          </Route>

          <Route path="/analysis" element={<AnalysisScreen />} >
            <Route path="/analysis/:key" element={<AnalysisScreen />} ></Route>
          </Route>

          <Route path="/profiling" element={<ProfilingScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />

          <Route path="/player" element={<PlayerProfileScreen />} />
          <Route path="/player/:id" element={<PlayerProfileScreen />} />

          <Route path="/team" element={<TeamProfileScreen />} />
          <Route path="/team/:id" element={<TeamProfileScreen />} />

          <Route path="/league" element={<LeagueProfileScreen />} />
          <Route path="/league/:id" element={<LeagueProfileScreen />} />

          <Route path="/country" element={<CountryProfileScreen />} />
          <Route path="/country/:id" element={<CountryProfileScreen />} />

          <Route path="/search/" element={<SearchResultsScreen />} />
          <Route path="/search/:term" element={<SearchResultsScreen />} />

        </Route>

        <Route path="/login" element={<RequireAuth conditions={[{ condition: auth.isLoggedIn, redirectUrl: '/' }]} ><AuthScreen /></RequireAuth>} />
        <Route path="/register" element={<RequireAuth conditions={[{ condition: auth.isLoggedIn, redirectUrl: '/' }]} ><AuthScreen /></RequireAuth>} />
        <Route path="/resetpassword" element={<RequireAuth conditions={[{ condition: auth.isLoggedIn, redirectUrl: '/' }]} ><AuthScreen /></RequireAuth>} />

        {/* {!isAdminOnline || auth.userData?.uid === 'ml9KnswmbzUeNdONtNaAhlrmsS43' ? (
              <Route path="/" state element={<Orders />} />
            ) : (
              <Route  path="/" state element={<PastOrders />} />
            )}
            <Route path="/pastorders/user/:id" element={<PastUsersOrders />} />
            <Route path="/pastorders/user" element={<PastUsersOrders />} />

            <Route path="/order" element={<OrderDetails />} >
              <Route path="/order/:_id" element={<OrderDetails />} ></Route>
            </Route>

            <Route path="/tables/*" element={<Tables />} />
            <Route path="/billing/*" element={<Billing />} />
            <Route path="/settings/*" element={<Settings />} />
            <Route path="/menu/*" element={<MenuEditor />} />
            <Route path="/marketing/*" element={<Marketing />} />
            <Route path="/designer/*" element={<Designers />} />
            <Route path="/reports/*" element={<Reports />} />

          </Route> */}

        {/* <Route exact path="/resetpassword" element={<RequireAuth conditions={[{ condition: auth.isLoggedIn, redirectUrl: '/' }]}><ResetPasswordLayout /></RequireAuth>} /> */}

      </Routes>
    </BrowserRouter>
  )
}
const RequireAuth = ({ conditions, children } : { conditions : [{condition : boolean, redirectUrl : string}], children : JSX.Element }) => {
  const location = useLocation()

  let url = ''
  for (let i = 0; i < conditions.length; i++) {
    if (conditions[i].condition) { url = conditions[i].redirectUrl }
  }
  return (url ? <Navigate  to={url} state={{ from: location }} /> : children)
}

export default AuthRouter
