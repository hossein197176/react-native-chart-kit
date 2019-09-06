import React from 'react'
import {View} from 'react-native'
import AbstractChart from './abstract-chart';
import { ScrollView, Platform, StyleSheet } from "react-native";
import { moderateScale } from 'react-native-size-matters';

const barWidth = moderateScale(6);
const lengthToShow = moderateScale(50);
const paddingTop = moderateScale(16);
const paddingRight = moderateScale(20);
const HLabelsWidth = moderateScale(40);

class BarChart extends AbstractChart {
	marginRight = ((this.props.width - paddingRight)) / lengthToShow - barWidth

	renderBars = config => {
		const {data, height, paddingTop, colors, style = {borderRadius: 3}} = config
		const baseHeight = this.calcBaseHeight(data, height)
		
		return (
			<View style = {[styles.MainBarsView, { 
				height: (baseHeight / 4) * 3 + paddingTop, 
			}]}>
				{data.map((x, i) => {
					const barHeight = (x == 0 ? barWidth : this.calcHeight(x, data, height))
					return (
						<View
							style = {[styles.BarView, {
								height: (Math.abs(barHeight) / 4) * 3,
								backgroundColor: colors[i % colors.length],
								...style
							}]}
							key = {i}
						/>
					)
				})}
			</View>
		)
	}

	render() {
		const { 
			width,
			height,
			data,
			colors,
			style = {},
			withHorizontalLabels = true,
			withVerticalLabels = true,
		} = this.props;

		const config = {
			paddingRight,
			paddingTop,
			width,
			marginRight: this.marginRight,
			height,
			colors: colors ? colors : ['black']
		}
		
		return (
			<View style = {{flexDirection: 'row', backgroundColor: 'transparent'}}>
				<View style = {{height: height, width: HLabelsWidth}}>
					{withHorizontalLabels
						? this.renderHorizontalLabels({
						...config,
						count: 8,
						data: data.datasets[0].data,
						paddingTop,
						paddingRight
					})
					: null}
				</View>
				<ScrollView style={[style, {backgroundColor: 'transparent'}]} horizontal>
					{this.renderHorizontalLines({
						...config,
						count: 8,
						paddingTop,
						paddingRight: 0,
						width: width * 5,
					})}
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
					{this.renderBars({
						...config,
						data: data.datasets[0].data,
						lengthToShow,
						paddingTop,
						paddingRight
					})}
				</ScrollView>
			</View>
		)
	}
}

export default BarChart


const styles = StyleSheet.create({
	MainBarsView: {
		paddingLeft: paddingRight + barWidth / 2,
		flexDirection: 'row',
		backgroundColor: 'transparent'
	},
	BarView: {
		width: barWidth,
		marginRight: lengthToShow,
		borderRadius: 3,
		alignSelf: 'flex-end',
		...Platform.select({
			android: {
				elevation: 2
			},
			ios: {
				shadowColor: 'black',
				shadowOffset: { width: 0, height: 1 },
				shadowOpacity: 0.3,
				shadowRadius: 1.6
			}
		})
	}
})