import React from 'react'

import { ScreenFilterObjType  }                  from '@monorepo/common/types'
import { isBase64 }                              from '@monorepo/common/utils/helper'
import { Button, Row, Space,  Tag,  Typography } from 'antd'
import { useSearchParams }                       from 'react-router-dom'

interface SelectedFiltersViewProps extends React.HtmlHTMLAttributes<HTMLDivElement>  {
  type : 'attributes' | 'analysis'
}

const SelectedFilters = ({ type, ...rest }: SelectedFiltersViewProps) => {
  const [searchParams, setSearchParams]     = useSearchParams()
  const [currentFilters, setCurrentFilters] = React.useState<ScreenFilterObjType>({})

  React.useEffect(() => {
    const _filters = isBase64(searchParams.get('q')) ? JSON.parse(atob(searchParams.get('q') || '')) : {}
    setCurrentFilters(_filters)
    return () => { }
  }, [searchParams])

  const handleRemoveFilter = (id: string) => {
    if (id === 'all') { setSearchParams({}) } else {
      const _filters = { ...currentFilters }
      delete _filters[id]
      setSearchParams({ q: btoa(JSON.stringify(_filters)) })
    }
  }

  return (
    <div {...rest}>
      <Row align='middle' style={{ marginTop: 8  }} >
        <Space>
          <Typography.Title level={5} >Selected Filters</Typography.Title>
          <Button size='small' type="default" onClick={() => handleRemoveFilter('all') } >Clear All</Button>
        </Space>
      </Row>
      <Row>
        <Space size={3} wrap>
          {
            Object.keys(currentFilters).map(id => {
              const filter = currentFilters[id]
              return (
                <Tag
                  key={id}
                  color={id.includes('comparison') ? 'gold' : 'green'}
                  closable
                  onClose={() => handleRemoveFilter(id)}
                >
                  {filter.name}
                  {filter.type === 'range' && `: ${(filter.value as [number, number])[0]} - ${(filter.value as [number, number])[1]}`}
                  {filter.type === 'select' && `: ${filter.value}`}
                  {filter.type === 'multiselect' && `: ${(filter.value as string[]).map((v: string) => v).join(', ')}`}
                  {filter.type === 'checkbox' && `: ${(filter.value as any[]).map((v: any) => v).join(', ')}`}
                  {(filter.type === 'text' || filter.type === 'number' || filter.type === 'date' || filter.type === 'radio') && `: ${filter.value}`}
                  {(filter.type === 'playerSelect' || filter.type === 'teamSelect' || filter.type === 'countrySelect' || filter.type === 'leagueSelect') && `: ${(filter.value as {value:string, label: string}[]).map((v: {value:string, label: string}) => v.label).join(', ')}`}
                  {(filter.type === 'footSelect' || filter.type === 'positionSelect') && `: ${filter.value}`}

                </Tag>
              )
            })
          }
        </Space>
      </Row>
    </div>

  )
}
export default React.memo(SelectedFilters)
