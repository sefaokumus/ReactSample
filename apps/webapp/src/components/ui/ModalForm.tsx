import React, { useState, useRef, ForwardRefExoticComponent } from 'react'

import { CustomFormProps }                      from '@monorepo/common/types'
import { Modal, Button, ModalProps, FormProps } from 'antd'

interface ModalFormProps extends ModalProps {
  hide : () => void
  submitBtnText?: string
  cancelBtnText?: string
  formElement: ForwardRefExoticComponent<any>
  formProps?: FormProps
}

const ModalForm = ({ open, hide, submitBtnText, cancelBtnText, formElement: FormElement, formProps, ...rest  } : ModalFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formRef = useRef<CustomFormProps>()

  const handleSubmit = () => {
    formRef.current?.submitForm()
    hide()
  }

  const handleClose = () => {
    formRef.current?.resetForm()
    hide()
  }

  return (
    <>
      <Modal
        onCancel={handleClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        footer={(
          <div style={{ textAlign: 'right' }}>
            <Button onClick={handleClose} style={{ marginRight: 8 }}>
              {cancelBtnText || 'Cancel'}
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting} type="primary">
              {submitBtnText || 'Submit'}
            </Button>
          </div>
        )}
        {...rest}
      >
        <FormElement ref={formRef} setIsSubmitting={setIsSubmitting} {...formProps} hide={hide} />
      </Modal>
    </>
  )
}

export default ModalForm
