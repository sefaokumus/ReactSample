
import React from 'react'

import logo                from '@monorepo/common/assets/images/logo_white.svg'
import { Col   }           from 'antd'
import { createUseStyles } from 'react-jss'
import { useLocation }     from 'react-router-dom'

import bgImage from '../../assets/bg.jpg'

import LoginForm         from './login.form'
import RegisterForm      from './register.form'
import ResetPasswordForm from './resetpassword.form'

const useStyles = createUseStyles({
  loginBg: {
    backgroundImage: `url(${bgImage})`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    backgroundColor: '#464646',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  form: {
    minWidth: 300,
    maxWidth: 450,
    width: '100%',
    background: 'rgba(186, 186, 186, 0.08)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(7.3px)',
    WebkitBackdropFilter: 'blur(7.3px)',
    border: '1px solid rgba(186, 186, 186, 0.69)',
    padding: '2rem',
    borderRadius: 14,
    marginLeft: 12,
    marginRight: 12
  },
  logo: {
    width: '100%',
    padding: 15
  }

})

const AuthScreen = () => {
  const classes  = useStyles()
  const location = useLocation()

  return (
    <div className={classes.loginBg}>
      <Col className={classes.form} >
        <img alt="logo" src={logo} className={classes.logo} />

        {location.pathname === '/login' && (<LoginForm />)}
        {location.pathname === '/register' && (<RegisterForm />)}
        {location.pathname === '/resetpassword' && (<ResetPasswordForm />) }

      </Col>
    </div>
  )
}

export default AuthScreen
