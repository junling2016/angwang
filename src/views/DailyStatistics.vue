<template>
  <div>
    <h2 class="view-title">日发送统计</h2>
    <el-card>
      <el-row>
        <el-form class="left" inline>
          <el-form-item label="任务编号">
            <el-input
              v-model="filter.task_id"
              clearable
              placeholder="输入编号查询"
              @keyup.enter.native="handleQuery"
              @clear="handleQuery"
              style="width: 120px"
            ></el-input>
          </el-form-item>
          <el-form-item label="提交时间">
            <el-date-picker v-model="filter.timeRange" type="datetimerange" :clearable="false"></el-date-picker>
          </el-form-item>
          <el-form-item label="发送类型">
            <el-select v-model="filter.send_type" style="width:100px">
              <el-option value="-1" label="不限"></el-option>
              <el-option v-for="(val,key) in sendTypeMap" :key="key" :value="key" :label="val"></el-option>
            </el-select>
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
      </el-row>

      <aw-table
        ref="table"
        :columns="columns"
        :api="queryApi"
        :params="params"
        pagination
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
import { fetchDailyStatistics } from "@/api/api";
import { sendTypeMap } from "@/config/selectMap";

export default {
  name: "dailyStatistics",

  components: {
    AwTable
  },

  data() {
    return {
      sendTypeMap,
      filter: {
        task_id: "",
        timeRange: [moment().subtract(1, "day"), moment()],
        send_type: "-1"
      },
      queryApi: fetchDailyStatistics,
      params: null,
      loading: false,
      columns: [
        {
          label: "任务编号",
          prop: "taskId",
          showOverflowTooltip: true
        },
        {
          label: "发送状态",
          prop: "sendStatus"
        },
        {
          label: "总条数",
          prop: "totalCount"
        },
        {
          label: "总人数",
          prop: "totalPerson"
        },
        {
          label: "提交成功条数",
          prop: "submitSuccessCount"
        },
        {
          label: "提交失败条数",
          prop: "submitFailedCount"
        },
        {
          label: "到达成功条数",
          prop: "sendSuccessCount"
        },
        {
          label: "到达失败条数",
          prop: "sendFailedCount"
        },
        {
          label: "提交时间",
          prop: "submitTime",
          width: 140
        },
        {
          label: "完成时间",
          prop: "completeTime",
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
      const { timeRange } = this.filter;

      if (!timeRange) {
        return this.$message.warning("请先选择时间范围");
      }

      this.params = {
        ...this.filter,
        startTime: timeFormat(timeRange[0]),
        endTime: timeFormat(timeRange[1]),
        timeRange: undefined
      };
    }
  }
};
</script>

<style>
</style>
