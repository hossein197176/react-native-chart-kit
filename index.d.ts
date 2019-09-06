import React from 'react'

// BarChart
export interface BarChartProps {
  data: object
  width: number
  height: number
  fromZero?: boolean
  yAxisLabel: string
  chartConfig: object
  style?: object
}

export class BarChart extends React.Component<BarChartProps> {}