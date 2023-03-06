
import React, { useEffect } from 'react'

import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { useStoreActions, useStoreState }           from '@monorepo/common/hooks'
import { Form, Input, Button,  message }            from 'antd'
import { useForm }                                  from 'antd/es/form/Form'
import { Link }                                     from 'react-router-dom'

type RegisterFormResult = {
  username: string
  email: string
  password: string
  passwordConfirm: string
}

const RegisterForm = () => {
  const auth         = useStoreState((state) => state.auth)
  const { register } = useStoreActions((state) => state.auth)
  const [form]       = useForm()

  useEffect(() => {
    if (auth.error) { handleErrorMessages(auth.error) }
  }, [auth.error])

  const handleErrorMessages = (err: any) => {
    if (err) {
      console.log(err)
      message.error(err)
    }
  }

  const onFinish = (values: RegisterFormResult) => {
    const { username, email, password, passwordConfirm } = values

    register({
      username,
      email,
      password,
      passwordConfirm
    })
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
          rules={[{
            required: true,
            message: 'Please input your Username'
          },
          {
            validator: (_, value) => {
              if (value && value.length < 3) {
                return Promise.reject(new Error('Min 3 characters'))
              }

              if (value && value.includes(' ')) {
                return Promise.reject(new Error('Username cannot contain spaces'))
              }

              return Promise.resolve()
            }
          }
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            size='large'
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            },
            {
              required: true,
              message: 'Please input your E-mail!'
            }
          ]}
        >
          <Input
            prefix={<MailOutlined  />}
            placeholder="E-Mail"
            size='large'
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            },
            {
              validator: (_, value) => {
                if (value && value.length < 8) {
                  return Promise.reject(new Error('Min 8 characters'))
                }
                // lowercase
                if (value && !value.match(/[a-z]/)) {
                  return Promise.reject(new Error('At least 1 lowercase character'))
                }

                // uppercase
                if (value && !value.match(/[A-Z]/)) {
                  return Promise.reject(new Error('At least 1 uppercase character'))
                }

                // symbol
                if (value && !value.match(/[!@#$%^&*]/)) {
                  return Promise.reject(new Error('At least 1 symbol character'))
                }

                // number
                if (value && !value.match(/[0-9]/)) {
                  return Promise.reject(new Error('At least 1 number character'))
                }

                return Promise.resolve()
              }
            }
          ]}
        >
          <Input.Password
            prefix={<LockOutlined  />}
            placeholder="Password"
            size='large'
          />
        </Form.Item>
        <Form.Item
          name="passwordConfirm"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please confirm your password!'
            },
            ({ getFieldValue }) => ({
              validator (_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'))
              }
            })
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm Password"
            size='large'
          />
        </Form.Item>

        <Button type="default" ghost  htmlType="submit" loading={auth.isLoading} style={{ width: '100%' }}>
          Register
        </Button>
      </Form>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'  }}>
        <Link to="/login" style={{ color: 'white' }}>Login</Link>
        <Link to="/resetpassword" style={{ color: 'white' }}>Reset Password</Link>
      </div>
    </div>
  )
}

export default RegisterForm
