import React from 'react'
import { View } from 'react-native'
import AbstractChart from './abstract-chart';
import { ScrollView, Platform, StyleSheet } from "react-native";
import { moderateScale } from 'react-native-size-matters';
import { FlatList } from 'react-native-gesture-handler';

const barWidth = moderateScale(6);
const lengthToShow = moderateScale(50);
const paddingTop = moderateScale(16);
const paddingRight = moderateScale(20);
const HLabelsWidth = moderateScale(40);

class BarChart extends AbstractChart {
	marginRight = ((this.props.width - paddingRight)) / lengthToShow - barWidth

	renderBars = config => {
		const { data, height, paddingTop, colors, style = { borderRadius: 3 } } = config
		const baseHeight = data.length == 0 ? 0 : this.calcBaseHeight(data, height)

		return (
			<View style={[styles.MainBarsView, {
				height: (baseHeight / 4) * 3 + paddingTop,
			}]}>
				{data.map((x, i) => {
					const barHeight = (x == 0 ? barWidth : this.calcHeight(x, data, height))
					return (
						<View
							style={[styles.BarView, {
								height: (Math.abs(barHeight) / 4) * 3,
								backgroundColor: colors[i % colors.length],
								...style
							}]}
							key={i}
						/>
					)
				})}
			</View>
		)
	}

	findMaxDiffrent = (data) => {
		let mySet = new Set();
		data.forEach(element => mySet.add(element));
		return mySet.size + 1;
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
			inverted = false
		} = this.props;

		const config = {
			paddingRight,
			paddingTop,
			width,
			marginRight: this.marginRight,
			height,
			colors: colors ? colors : ['black']
		}

		// inverted && data && data.labels.reverse();

		// inverted && data && data.datasets[0].data.reverse();
		
		return (
			<View style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
				<View style={{ height: height, width: HLabelsWidth }}>
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
				{/* <ScrollView style={[style, { backgroundColor: 'transparent' }, inverted && {  }]} horizontal inverted>
					{this.renderHorizontalLines({
						...config,
						count: 8,
						paddingTop,
						paddingRight: 0,
						width: width * 5,
					})}
					<View style={{ flexDirection: 'row' }}>
						{withVerticalLabels
							? this.renderVerticalLabels({
								...config,
								labels: data.labels,
								lengthToShow: lengthToShow + barWidth,
								paddingRight,
								paddingTop,
								horizontalOffset: barWidth,
								inverted
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
				</ScrollView> */}
				{this.renderHorizontalLines({
					...config,
					count: 8,//Math.min(this.findMaxDiffrent(data.datasets[0].data), 8),
					paddingTop,
					paddingRight: paddingRight,
					width: width * 5,
				})}
				<FlatList
					data = {[1]}
					horizontal
					inverted
					keyExtractor = {(item) => item.toString()}
					style = {{width: '90%'}}
					renderItem = {() => (
						<View>
							<View style={{ flexDirection: 'row' }}>
								{withVerticalLabels
									? this.renderVerticalLabels({
										...config,
										labels: data.labels,
										lengthToShow: lengthToShow + barWidth,
										paddingRight,
										paddingTop,
										horizontalOffset: barWidth,
										inverted
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
						</View>
					)}
				/>
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
