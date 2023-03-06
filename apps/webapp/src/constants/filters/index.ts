import { PlayerFilter } from '@monorepo/common/types'

import analysisFilters   from './analysisFilters'
import attributesFilters from './attributesFilters'

const getNamesFromOptions = (options: PlayerFilter[]) => {
  return options.map((option) => ({ id: option.id, name: option.name }))
}

// @ts-expect-error
const attributeFilterNames : PlayerFilter[] = attributesFilters.reduce((acc, cur) => {
  if (cur.type === 'filter' && cur.options && cur.options.length > 0) {
    // @ts-ignore
    return [...acc, ...getNamesFromOptions(cur.options)]
  }
  return [...acc, { id: cur.id, name: cur.name }]
}, [])

// @ts-expect-error
const analysisFilterNames : PlayerFilter[] = analysisFilters.reduce((acc, cur) => {
  if (cur.type === 'filter' && cur.options && cur.options.length > 0) {
    // @ts-ignore
    return [...acc, ...getNamesFromOptions(cur.options)]
  }
  return [...acc, { id: cur.id, name: cur.name }]
}, [])

export {
  attributesFilters,
  analysisFilters,
  attributeFilterNames,
  analysisFilterNames
}
