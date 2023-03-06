
import React, { useEffect } from 'react'

import { UserOutlined }         from '@ant-design/icons'
import { useStoreState }        from '@monorepo/common/hooks'
import { Form, Input, Button  } from 'antd'
import { useForm }              from 'antd/es/form/Form'
import { Link }                 from 'react-router-dom'

type ResetPasswordFormResult = {
  email: string
}

const ResetPasswordForm = () => {
  const auth = useStoreState((state) => state.auth)
  // const { reset } = useStoreActions((state) => state.auth)
  const [form] = useForm()

  useEffect(() => {
    if (auth.error) { handleErrorMessages(auth.error) }
  }, [auth.error])

  const handleErrorMessages = (err: any) => {
    console.log(err)
    // if (err && (err.code === 'auth/user-not-found' || err.code === 'auth/venue-not-found')) {
    //   message.error('Kullanıcı bulunamadı')
    // } else if (err && (err.code === 'auth/venue-deactivated' || err.code === 'auth/venue-permanently_closed')) {
    //   message.error('Hesabınız kapatılmış. support@kolayyolla.com.tr üzerinden irtibata geçebilirsiniz')
    // } else if (err && err.code === 'auth/too-many-requests') {
    //   message.error('Çok fazla sayıda hatalı giriş yaptınız. Lütfen daha sonra tekrar deneyin.')
    // } else if (err && err.code === 'auth/wrong-password') {
    //   message.error('Hatalı Şifre')
    // } else if (err && err.code === 'auth/access-denied') {
    //   message.error('Giriş yetkiniz bulunmuyor')
    // } else if (err) message.error('Bilinmeyen bir hata oluştu.')
  }

  const onFinish = (values: ResetPasswordFormResult) => {

    // login({ username, password })
  }
  return (
    <div>
      <Form
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email'
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

        <Button type="default" ghost  htmlType="submit" style={{ width: '100%' }}>
          Reset Password
        </Button>
      </Form>

      <div style={{ textAlign: 'end' }}>
        <Link to="/login" style={{ color: 'white' }}>Try Login</Link>
      </div>
    </div>
  )
}

export default ResetPasswordForm
