import { Auth }          from 'aws-amplify'
import { action, thunk } from 'easy-peasy'

import { AuthModel } from '../types'

export const authModel: AuthModel = {
  data: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,

  setData: action((state, data) => {
    state.data = data
  }),

  setError: action((state, error) => {
    state.error = error
  }),
  setIsLoading: action((state, isLoading) => {
    state.isLoading = isLoading
  }),
  setIsLoggedIn: action((state, isLoggedIn) => {
    state.isLoggedIn = isLoggedIn
  }),

  login: thunk((actions, payload) => {
    actions.setIsLoading(true)

    Auth.signIn(payload.username, payload.password).then((user) => {
      actions.setIsLoading(false)
      if (user) {
        actions.setData(user)
        actions.setIsLoggedIn(true)
        actions.setError(null)
      } else {
        actions.setError('Unknown error')
      }
    }).catch(() => {
      actions.setIsLoading(false)
    })
  }),
  logout: thunk((actions) => {
    actions.setData(null)
    actions.setIsLoggedIn(false)
    actions.setError(null)

    Auth.signOut()
  }),
  register: thunk((actions, payload) => {
    actions.setIsLoading(true)

    Auth.signUp({
      username: payload.username,
      password: payload.password,
      attributes: {
        email: payload.email
      },
      autoSignIn: {
        enabled: true
      }
    }).then(res => {
      actions.setIsLoading(false)
      if (res.user) {
        console.log(res.user)

        // actions.setData({
        //   username: res.user.username,
        //   userDataKey: res.user.userDataKey,
        //   attributes: {
        //     email: payload.email,
        //     email_verified: false,
        //     sub: res.userSub
        //   },
        //   signInUserSession: {
        //     accessToken:
        //   }
        // })
        actions.setIsLoggedIn(true)
        actions.setError(null)
      }
    }).catch(() => {
      actions.setIsLoading(false)
    }).finally(() => { actions.setIsLoading(false) })
  }),
  forgotPassword: thunk((actions, payload) => {
    actions.setIsLoading(true)

    Auth.resendSignUp(payload.email).then(res => {
      actions.setIsLoading(false)
      if (res) {
        actions.setError(null)
      }
    }).catch(() => {
      actions.setIsLoading(false)
    }).finally(() => { actions.setIsLoading(false) })
  })
}
