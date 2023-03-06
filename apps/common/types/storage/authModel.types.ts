import { Action, Thunk } from 'easy-peasy'

export type SignInFormData = {
  username: string
  password: string
}

export type SignUpFormData = {
  username: string
  email: string
  password: string
  passwordConfirm: string
}

export type ForgotPasswordFormData = {
  email: string
}

export type UserData = {
  username: string
  userDataKey: string
  signInUserSession: {
    accessToken: object
  }
  attributes: {
    email: string,
    email_verified: boolean,
    sub: string
  }
}

export interface AuthModel{
  data: UserData | null
  isLoggedIn: boolean
  isLoading: boolean
  error: any

  setData: Action<AuthModel, UserData | null>
  setError: Action<AuthModel, any>
  setIsLoading: Action<AuthModel, boolean>
  setIsLoggedIn: Action<AuthModel, boolean>

  login: Thunk<AuthModel, SignInFormData>
  register: Thunk<AuthModel, SignUpFormData>
  forgotPassword: Thunk<AuthModel, ForgotPasswordFormData>
  logout: Thunk<AuthModel>

}
