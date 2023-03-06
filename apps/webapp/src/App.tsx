import React from 'react'

import store from '@monorepo/common/store'

import { StoreProvider } from 'easy-peasy'

import AuthRouter from './AuthRouter'

function App () {
  return (
    <StoreProvider store={store}>
      <AuthRouter />
    </StoreProvider>
  )
}

export default App
