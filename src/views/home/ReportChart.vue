<template>
  <div class="chart-box"></div>
</template>

<script>
import echarts from "echarts";
import chartOptions from "./chartOptions";

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      chartOptions: JSON.parse(JSON.stringify(chartOptions)),
      chart: null
    };
  },

  watch: {
    data: "render"
  },

  mounted() {
    this.chart = echarts.init(this.$el);
    this.render();
  },

  methods: {
    render() {
      if (!this.chart) return;

      const data = this.data || [];
      const { chartOptions } = this;
      const dates = [];
      const successCounts = [];
      const failCounts = [];
      const totalCounts = [];

      data.forEach(item => {
        const { date, success, fail, total } = item;
        dates.push(date);
        successCounts.push(success);
        failCounts.push(fail);
        totalCounts.push(total);
      });

      const series = [
        this.getLineSeries("总发送数", totalCounts),
        this.getLineSeries("发送成功数", successCounts),
        this.getLineSeries("发送失败数", failCounts)
      ];

      chartOptions.legend.data = ["总发送数", "发送成功数", "发送失败数"];
      chartOptions.xAxis.data = dates;
      chartOptions.series = series;

      this.chart.setOption(chartOptions, true);
    },

    // // 图表折线区域形式配置项
    // getAreaSeries(name, data) {
    //   return {
    //     type: "line",
    //     name,
    //     data,
    //     areaStyle: {
    //       normal: {
    //         opacity: 0.8
    //       }
    //     },
    //     lineStyle: {
    //       normal: {
    //         opacity: 0
    //       }
    //     },
    //     itemStyle: {
    //       normal: {
    //         opacity: 0
    //       }
    //     },
    //     smooth: true
    //   };
    // },

    // 普通折线配置项
    getLineSeries(name, data) {
      return {
        type: "line",
        name,
        data,
        smooth: true
      };
    }
  }
};
</script>

<style>
</style>
