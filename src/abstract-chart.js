import React, { Component } from 'react'
import { Text as ReactText, View } from "react-native";
import { moderateScale } from 'react-native-size-matters';

const fontSize = moderateScale(12);

class AbstractChart extends Component {
	calcScaler = data => {
		if (this.props.fromZero) {
			return Math.max(...data, 0) - Math.min(...data, 0) || 1
		} else {
			return Math.max(...data) - Math.min(...data) || 1
		}
	}

	calcBaseHeight = (data, height) => {
		const min = Math.min(...data)
		const max = Math.max(...data)
		if (min >= 0 && max >= 0) {
			return height
		} else if (min < 0 && max <= 0) {
			return 0
		} else if (min < 0 && max > 0) {
			return height * max / this.calcScaler(data)
		}
	}

	calcHeight = (val, data, height) => {
		const max = Math.max(...data)
		const min = Math.min(...data)
		if (min < 0 && max > 0) {
			return height * (val / this.calcScaler(data))
		} else if (min >= 0 && max >= 0) {
			return this.props.fromZero ?
				height * (val / this.calcScaler(data)) :
				height * ((val - min) / this.calcScaler(data))
		} else if (min < 0 && max <= 0) {
			return this.props.fromZero ?
				height * (val / this.calcScaler(data)) :
				height * ((val - max) / this.calcScaler(data))
		}
	}

	renderHorizontalLines = config => {
		const { count, height, paddingTop, paddingRight } = config
		// const height = config.height * 0.75;
		return [...new Array(count - 1)].map((_, i) => {
			return (
				<View
					key={Math.random()}
					style={{
						top: (height / count) * i + paddingTop,
						width: '90%',
						height: 1,
						right: 0,
						backgroundColor: this.props.chartConfig.color(0.2),
						// height: height / count,
						position: 'absolute',
						// borderBottomWidth: 1,
						// borderBottomColor: 'red'
					}}
				/>
			)
		})
	}

	renderHorizontalLabels = config => {
		const {
			count,
			data,
			height,
			paddingTop,
			paddingRight,
			yLabelsOffset = 12
		} = config
		const decimalPlaces = this.props.chartConfig.decimalPlaces === undefined ? 2 : this.props.chartConfig.decimalPlaces
		const yAxisLabel = this.props.yAxisLabel || '';
		const style = {
			right: paddingRight - yLabelsOffset,
			fontSize: fontSize,
			position: 'absolute',
			color: this.props.chartConfig.color(0.5)
		}

		return [...new Array(count - 1)].map((_, i) => {
			let yLabel

			if (count === 1) {
				yLabel = `${yAxisLabel}${data[0].toFixed(decimalPlaces)}`
			} else {
				const label = this.props.fromZero ?
					(this.calcScaler(data) / (count - 2)) * i + Math.min(...data, 0) :
					(this.calcScaler(data) / (count - 2)) * i + Math.min(...data)
				yLabel = `${yAxisLabel}${label.toFixed(decimalPlaces)}`
			}
			
			return (
				<ReactText
					key={Math.random()}
					style={[style, {
						top: (height * 3) / 4 - ((height - paddingTop) / count) * i
					}]}
				>
					{yLabel}
				</ReactText>
			)
		})
	}

	renderVerticalLabels = config => {
		const {
			labels = [],
			width,
			height,
			paddingRight,
			paddingTop,
			lengthToShow,
			horizontalOffset = 0,
			stackedBar = false,
			inverted = false
		} = config

		let fac = 1
		if (stackedBar) {
			fac = 0.71
		}
		const style = {
			width: lengthToShow,
			fontSize: fontSize,
			fontWeight: 'bold',
			position: 'absolute',
			color: 'gray',
			textAlign: 'center',
			top: (height * 3) / 4 + paddingTop,
		}

		return labels.map((label, i) => (
			Array.isArray(label) ?
				label.map((lebelVal, j) => {
					return (
						<ReactText
							key={Math.random()}
							style={[style, {
								left: (lengthToShow * i) * fac,
								top: (height * 3) / 4 + paddingTop * (j + 1),
							}]}
						>
							{lebelVal}
						</ReactText>
					)
				}) :
				<ReactText
					key={Math.random()}
					style={[style, {
						left: (lengthToShow * i) * fac,
					}]}
				>
					{label}
				</ReactText>
		))
	}

	renderVerticalLine = config => {
		const { height, paddingTop, paddingRight } = config
		return (
			<Line
				key={Math.random()}
				x1={Math.floor(paddingRight)}
				y1={0}
				x2={Math.floor(paddingRight)}
				y2={height - height / 4 + paddingTop}
				stroke={this.props.chartConfig.color(0.2)}
				strokeDasharray="5, 10"
				strokeWidth={1}
			/>
		)
	}
}

export default AbstractChart
