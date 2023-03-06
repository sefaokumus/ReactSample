import React from 'react'

import { Select, Spin }     from 'antd'
import type { SelectProps } from 'antd'
import { debounce }         from 'lodash'

interface DebounceSelectProps extends SelectProps{
  fetchOptions: (value: string) => Promise<any>;
  debounceTimeout?: number;
}

const DebounceSelect = ({ fetchOptions, debounceTimeout = 800, ...props }: DebounceSelectProps) => {
  const [fetching, setFetching] = React.useState(false)
  const [options, setOptions]   = React.useState([])
  const fetchRef                = React.useRef(0)

  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value: any) => {
      fetchRef.current += 1
      const fetchId     = fetchRef.current
      setOptions([])
      setFetching(true)

      fetchOptions(value).then((newOptions) => {
        console.log(newOptions)
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return
        }

        setOptions(newOptions)
        setFetching(false)
      })
    }

    return debounce(loadOptions, debounceTimeout)
  }, [fetchOptions, debounceTimeout])
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  )
} // Usage of DebounceSelect

export default DebounceSelect
