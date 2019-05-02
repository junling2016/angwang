<template>
  <div>
    <h2 class="view-title">{{$route.meta.title}}</h2>
    <el-card>
      <el-row>
        <el-form class="left" inline>
          <el-form-item>
            <el-date-picker
              v-model="filter.date"
              type="month"
              placeholder="选择月份"
              :clearable="false"
              :picker-options="{'disabledDate':disabledDate}"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              :loading="loading"
              @click="handleQuery"
            >查询</el-button>
          </el-form-item>
        </el-form>

        <el-button class="right" icon="iconfont icon-export6" @click="handleExport">导出</el-button>
      </el-row>

      <aw-table
        ref="table"
        :columns="columns"
        :api="queryApi"
        :params="params"
        pagination
        :table-props="{
          'showSummary': true,
          'summaryMethod': getSummaries
        }"
        :auto-request="false"
        :loading.sync="loading"
      ></aw-table>
    </el-card>
  </div>
</template>
  
<script>
import AwTable from "@/components/AwTable";
import moment from "moment";
import { timeFormat } from "@/utils/time";
import { fetchMonthlyStatistics } from "@/api/api";
import { sendTypeMap } from "@/config/selectMap";
import qs from "qs";

// 需要合计的列
const summaryColumns = [
  "totalCount",
  "sendSuccessCount",
  "sendFailedCount",
  "receiveSuccessCount",
  "receiveFailedCount"
];

export default {
  name: "dailyStatistics",

  components: {
    AwTable
  },

  data() {
    return {
      sendTypeMap,
      filter: {
        date: moment()
      },
      queryApi: fetchMonthlyStatistics,
      params: null,
      loading: false,
      columns: [
        {
          type: "index",
          width: 80
        },
        {
          label: "发送总数",
          prop: "totalCount"
        },
        {
          label: "提交成功条数",
          prop: "sendSuccessCount"
        },
        {
          label: "提交失败条数",
          prop: "sendFailedCount"
        },
        {
          label: "到达成功条数",
          prop: "receiveSuccessCount"
        },
        {
          label: "到达失败条数",
          prop: "receiveFailedCount"
        },
        {
          label: "成功率",
          prop: "successRate",
          width: 140
        },
        {
          label: "日期",
          prop: "date",
          width: 140
        }
      ]
    };
  },

  mounted() {
    this.handleQuery();
  },

  methods: {
    handleQuery() {
      const { date } = this.filter;

      if (!date) {
        return this.$message.warning("请先选择月份");
      }

      this.params = {
        date: timeFormat(date, "YYYY-MM")
      };
    },

    /**
     * 日期组件日期禁用判断
     */
    disabledDate(date) {
      return date > moment();
    },

    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      const indexMap = {};

      columns.forEach(({ property }, index) => {
        if (index === 0) {
          sums[index] = "本页合计";
          return;
        }

        indexMap[property] = index;

        if (summaryColumns.includes(property)) {
          const values = data.map(item => Number(item[property]));

          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = "N/A";
          }
        }
      });

      const percent = (
        (sums[indexMap["receiveSuccessCount"]] /
          sums[indexMap["sendSuccessCount"]]) *
        100
      ).toFixed(2);

      sums[indexMap["successRate"]] = `${percent}%`;

      return sums;
    },

    handleExport() {
      const params = qs.stringify(this.params);
      window.open("/exportMonthlyStatustics?" + params);
    }
  }
};
</script>
