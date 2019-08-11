import React from 'react'
import {View} from 'react-native'
import {Svg, Rect, G} from 'react-native-svg'
import AbstractChart from './abstract-chart';
import { ScrollView} from "react-native";
import { moderateScale } from 'react-native-size-matters';

const barWidth = moderateScale(6);
const lengthToShow = moderateScale(50);

class BarChart extends AbstractChart {
  renderBars = config => {
    const {data, width, height, paddingTop, paddingRight, colors} = config
    const baseHeight = this.calcBaseHeight(data, height)
    
    return (
      <View style = {{ 
        height: (baseHeight / 4) * 3 + paddingTop, 
        paddingLeft: paddingRight + barWidth / 2,
        flexDirection: 'row'
      }}>
        {data.map((x, i) => {
        const barHeight = this.calcHeight(x, data, height)
        return (
          <View
            style = {{
              width: barWidth,
              // marginRight: ((width - paddingRight)) / lengthToShow - barWidth,
              marginRight: lengthToShow,
              height: (Math.abs(barHeight) / 4) * 3,
              backgroundColor: colors[i % colors.length],
              borderRadius: 3,
              elevation: 2,
              alignSelf: 'flex-end',
              shadowColor: 'black',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.3,
              shadowRadius: 1.6
            }}
            key = {i}
          />
        )})}
      </View>
    )
  }

  renderBarTops = config => {
    const {data, width, height, paddingTop, paddingRight} = config
    const baseHeight = this.calcBaseHeight(data, height)
    return data.map((x, i) => {
      const barHeight = this.calcHeight(x, data, height)
      return (
        <Rect
          key={Math.random()}
          x={
            paddingRight +
            (i * (width - paddingRight)) / data.length +
            barWidth / 2
          }
          y={((baseHeight - barHeight) / 4) * 3 + paddingTop}
          width={barWidth}
          height={2}
          fill={this.props.chartConfig.color(0.6)}
        />
      )
    })
  }

  render() {
    const paddingTop = 16
    const paddingRight = moderateScale(20)
    const { 
      width,
      height,
      data,
      colors,
      style = {},
      marginRight = ((width - paddingRight)) / lengthToShow - barWidth,
      withHorizontalLabels = true,
      withVerticalLabels = true,
    } = this.props
    const {borderRadius = 0} = style
    const config = {
      paddingRight,
      paddingTop,
      width,
      marginRight,
      height,
      colors: colors ? colors : ['red']
    }
    
    return (
      <View style = {{flexDirection: 'row'}}>
        <Svg height={height} width={64}>
            <G>
            {withHorizontalLabels
              ? this.renderHorizontalLabels({
              ...config,
              count: 4,
              data: data.datasets[0].data,
              paddingTop,
              paddingRight: 64
            })
            : null}
            </G>
        </Svg>
        <ScrollView style={style} horizontal>
          <Svg height={height} style = {{zIndex: 1, overflow: 'scroll'}}>
            {this.renderDefs({
              ...config,
              ...this.props.chartConfig
            })}
            <Rect
              width="100%"
              height={height}
              rx={borderRadius}
              ry={borderRadius}
              fill="url(#backgroundGradient)"
            />
            <G>
              {this.renderHorizontalLines({
                ...config,
                count: 6,
                paddingTop,
                paddingRight: 0,
                width: width * 5,
              })}
            </G>
            <View style = {{flexDirection: 'row'}}>
              {withVerticalLabels
                ? this.renderVerticalLabels({
                ...config,
                labels: data.labels,
                lengthToShow: lengthToShow + barWidth,
                paddingRight,
                paddingTop,
                horizontalOffset: barWidth
              })
              : null}
            </View>
            <G>
              {this.renderBars({
                ...config,
                data: data.datasets[0].data,
                lengthToShow,
                paddingTop,
                paddingRight
              })}
            </G>
          </Svg>
        </ScrollView>
      </View>
    )
  }
}

export default BarChart
