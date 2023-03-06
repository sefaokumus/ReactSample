import React, { memo } from 'react'

import { useStoreActions, useStoreState } from '@monorepo/common/hooks'
import { Input }                          from 'antd'
import { SearchProps }                    from 'antd/lib/input'
import { useNavigate }                    from 'react-router-dom'

const SearchInput = memo(function searchInput (props: SearchProps) {
  const { isLoading } = useStoreState(store => store.search)
  const { search }    = useStoreActions(store => store.search)
  const navigate      = useNavigate()

  const handleSearch = (value: string) => {
    if (value) {
      search({
        term: value
      }).then(() => {
        navigate(`/search/${value}`)
      })
    }
  }

  return <Input.Search placeholder='Search' loading={isLoading} onSearch={handleSearch}  {...props} />
})

export default SearchInput
