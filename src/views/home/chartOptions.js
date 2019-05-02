export default {
  animation: false,
  color: ['#409eff', '#67c23a', '#f56c6c'],
  legend: {},
  tooltip: {
    trigger: 'axis'
  },
  axisPointer: {
    lineStyle: {
      color: '#aaa',
      type: 'dashed'
    }
  },
  grid: {
    left: 40,
    right: 40,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisLine: {
      lineStyle: {
        color: '#f0f0f0'
      }
    },
    axisTick: {
      show: false
    },

    axisLabel: {
      color: '#777'
    }
  },
  yAxis: {
    type: 'value',
    nameGap: 25,
    nameTextStyle: {
      color: '#777'
    },
    splitLine: {
      lineStyle: {
        color: ['#f0f0f0']
      }
    },
    axisLine: {
      lineStyle: {
        color: '#f0f0f0'
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#777'
    }
  },
  series: [
    {
      type: 'line',
      areaStyle: {
        normal: {
          opacity: 0.3
        }
      },
      smooth: true
    }
  ]
}
