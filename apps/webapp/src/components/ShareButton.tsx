import React from 'react'

import { CheckOutlined, CopyOutlined, ShareAltOutlined }               from '@ant-design/icons'
import { urlShortener }                                                from '@monorepo/common/services'
import { Button, Input, InputRef, Popover, Spin, Tooltip, Typography } from 'antd'
import { useLocation }                                                 from 'react-router-dom'

const ShareLinkForm = ({ visible }: {visible : boolean}) => {
  const location                          = useLocation()
  const [shortenedLink, setShortenedLink] = React.useState('')
  const [isShortening, setIsShortening]   = React.useState(false)
  const [isCopied, setIsCopied]           = React.useState(false)
  const inputRef                          = React.useRef<InputRef>(null)

  const handleShortenLink = async () => {
    if (location.search !== '') {
      const link = location.pathname + location.search
      setIsShortening(true)
      const shortened = await urlShortener({ url: link })
      setIsShortening(false)
      setShortenedLink(`${window.location.origin}${window.location.pathname}/${shortened}`)
      inputRef.current!.focus({
        cursor: 'end'
      })
    }
  }
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shortenedLink)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }
    , 1500)
  }

  React.useLayoutEffect(() => {
    handleShortenLink()
  }, [visible])

  return <Spin spinning={isShortening} >
    <Typography.Text strong >Share link</Typography.Text>
    <Input.Group compact>
      <Input
        readOnly
        ref={inputRef}
        style={{ width: 'calc(100% - 35px)' }}
        value={shortenedLink}
      />
      <Tooltip title={isCopied ? 'Copied' : 'Copy'} placement="bottom" showArrow={false} >
        <Button icon={isCopied ? <CheckOutlined /> : <CopyOutlined />} onClick={handleCopyLink} />
      </Tooltip>
    </Input.Group>
  </Spin>
}
export default function ShareButton () {
  const [visible, setVisible] = React.useState(false)
  return (
    <Popover content={<ShareLinkForm visible={visible} />}  onOpenChange={e => setVisible(prev => !prev)} placement="bottom" trigger={['click']}>

      <Button shape="circle" type="default" icon={<ShareAltOutlined />} />
    </Popover>

  )
}
