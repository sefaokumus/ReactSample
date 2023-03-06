import { StatEnum } from './../types'

export const defaultAnalysisCharts = [
  { id: '1', xField: StatEnum.avgGoals, yField: StatEnum.avgAssists, visible: true, isDefault: true },
  { id: '2', xField: StatEnum.avgShots, yField: StatEnum.avgShotsOnTarget, visible: true, isDefault: true  },
  { id: '3', xField: StatEnum.avgGoals, yField: StatEnum.avgDribbleSucc, visible: true, isDefault: true  },
  { id: '4', xField: StatEnum.avgRating, yField: StatEnum.avgPassesAccuracy, visible: true, isDefault: true  },
  { id: '5', xField: StatEnum.avgKeyPasses, yField: StatEnum.avgPasses, visible: true, isDefault: true  },
  { id: '6', xField: StatEnum.avgCrosses, yField: StatEnum.avgCrossesAccuracy, visible: true, isDefault: true  },
  { id: '7', xField: StatEnum.avgTackles, yField: StatEnum.avgInterceptions, visible: true, isDefault: true  }
]
