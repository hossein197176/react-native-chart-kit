Fork Of [React Native Chart Kit](https://github.com/indiespirit/react-native-chart-kit) 

Added Colors for Bar Chart and made it scrollable for more data.

## Import components
1. `yarn add react-native-chart-kit`
2. Use with ES6 syntax to import components

```js
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'

```

## Quick Example
```jsx
<View>
  <Text>
    Bezier Line Chart
  </Text>
  <LineChart
    data={{
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [{
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100
        ]
      }]
    }}
    width={Dimensions.get('window').width} // from react-native
    height={220}
    yAxisLabel={'$'}
    chartConfig={{
      backgroundColor: '#e26a00',
      backgroundGradientFrom: '#fb8c00',
      backgroundGradientTo: '#ffa726',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>
```

## Chart style object
Define a chart style object with following properies as such:
```js
const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2 // optional, default 3
}
```

| Property        | Type           | Description  |
| ------------- |-------------| -----|
| backgroundGradientFrom | string | Defines the first color in the linear gradient of a chart's background  |
| backgroundGradientTo | string | Defines the second color in the linear gradient of a chart's background |
| color | function => string | Defines the base color function that is used to calculate colors of labels and sectors used in a chart |
| strokeWidth | Number | Defines the base stroke width in a chart |

## Responsive charts
To render a responsive chart, use `Dimensions` react-native library to get the width of the screen of your device like such
```js
import { Dimensions } from 'react-native'
const screenWidth = Dimensions.get('window').width
```

## Bar chart


```js
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [{
    data: [ 20, 45, 28, 80, 99, 43 ]
  }]
}
```
```html
<BarChart
  style={graphStyle}
  colors={['yellow', 'red', 'orange', 'blue', 'purple', 'black']}
  data={data}
  width={screenWidth}
  height={220}
  yAxisLabel={'$'}
  chartConfig={chartConfig}
/>
```

| Property        | Type           | Description  |
| ------------- |-------------| -----|
| data | Object | Data for the chart - see example above |
| colors | Array | Color of each column of chart - see example above |
| width | Number | Width of the chart, use 'Dimensions' library to get the width of your screen for responsive |
| height | Number | Height of the chart |
| withVerticalLabels | boolean | Show vertical labels - default: True |
| withHorizontalLabels | boolean | Show horizontal labels - default: True |
| fromZero | boolean | Render charts from 0 not from the minimum value. - default: False |
| yAxisLabel | string | Prepend text to horizontal labels -- default: '' |
| chartConfig | Object | Configuration object for the chart, see example config in the beginning of this file |

## More information
This library is built on top of the following open-source projects:
* react-native-svg (https://github.com/react-native-community/react-native-svg)
* paths-js  (https://github.com/andreaferretti/paths-js)
* react-native-calendar-heatmap (https://github.com/ayooby/react-native-calendar-heatmap)

## Contribute
See the [contribution guide](contributing.md) and join [the contributors](https://github.com/indiespirit/react-native-chart-kit/graphs/contributors)!
