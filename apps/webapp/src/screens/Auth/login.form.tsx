
import React, { useEffect } from 'react'

import { UserOutlined, LockOutlined }             from '@ant-design/icons'
import { useStoreActions, useStoreState }         from '@monorepo/common/hooks'
import { Form, Input, Button, message, Checkbox } from 'antd'
import { useForm }                                from 'antd/es/form/Form'
import { Link }                                   from 'react-router-dom'

type LoginFormResult = {
  username: string
  password: string
  remember: boolean
}

const LoginForm = () => {
  const auth      = useStoreState((state) => state.auth)
  const { login } = useStoreActions((state) => state.auth)
  const [form]    = useForm()

  useEffect(() => {
    if (auth.error) { handleErrorMessages(auth.error) }
  }, [auth.error])

  const handleErrorMessages = (err: any) => {
    if (err && (err.code === 'auth/user-not-found' || err.code === 'auth/venue-not-found')) {
      message.error('Kullanıcı bulunamadı')
    } else if (err && err.code === 'auth/too-many-requests') {
      message.error('Çok fazla sayıda hatalı giriş yaptınız. Lütfen daha sonra tekrar deneyin.')
    } else if (err && err.code === 'auth/wrong-password') {
      message.error('Hatalı Şifre')
    } else if (err && err.code === 'auth/access-denied') {
      message.error('Giriş yetkiniz bulunmuyor')
    } else if (err) message.error('Bilinmeyen bir hata oluştu.')
  }

  const onFinish = (values: LoginFormResult) => {
    const { username, password } = values

    login({ username, password })
  }
  return (
    <div>
      <Form
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >

        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username'
            }
          ]}
        >
          <Input
            prefix={<UserOutlined  />}
            autoComplete="email"
            placeholder="Email"
            size='large'
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!'
            }
          ]}
        >
          <Input
            prefix={<LockOutlined  />}
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            size='large'
          />
        </Form.Item>

        <Form.Item name="rememmber" valuePropName="checked">
          <Checkbox style={{ color: 'white' }}>Rememmber Me</Checkbox>
        </Form.Item>

        <Button type="default" ghost htmlType="submit" style={{ width: '100%' }}>
          Login
        </Button>
      </Form>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'  }}>
        <Link to="/register" style={{ color: 'white' }}>Register</Link>
        <Link to="/resetpassword" style={{ color: 'white' }}>Reset Password</Link>
      </div>
    </div>
  )
}

export default LoginForm
