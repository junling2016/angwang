<template>
  <div>
    <h2 class="view-title">即时任务列表</h2>
    <el-card>
      <el-form v-model="filter" inline>
        <el-form-item label="任务编号：">
          <el-input v-model="filter.task_id"></el-input>
        </el-form-item>
        <el-form-item label="信息内容：">
          <el-input v-model="filter.content"></el-input>
        </el-form-item>
        <el-form-item label="创建时间：">
          <el-date-picker
            v-model="filter.timeRange"
            type="daterange"
            :picker-options="{disabledDate: disabledDate}"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <aw-table
        :columns="columns"
        :api="fetchApi"
        :params="params"
        pagination
        :auto-request="false"
      >
        <template v-slot:operate="{row}">
          <el-button type="text">删除</el-button>
        </template>
      </aw-table>
    </el-card>
  </div>
</template>

<script>
import moment from "moment";
import AwTable from "../components/AwTable";
import { fetchImmediateTasks } from "../api/api";

export default {
  name: "immediateTasks",

  components: { AwTable },

  data() {
    return {
      fetchApi: fetchImmediateTasks,
      filter: {
        task_id: "",
        content: "",
        timeRange: [moment(), moment()]
      },
      params: null,

      columns: [
        {
          label: "任务编号",
          prop: "taskId"
        },
        {
          label: "发送内容",
          prop: "content"
        },
        {
          label: "发送状态",
          prop: "status"
        },
        {
          label: "任务类型",
          prop: "type"
        },
        {
          label: "总条数/总人数",
          prop: "totalCount",
          formatter: (val, row) => {
            return val + "/" + row.totalPerson;
          }
        },
        {
          label: "成功/失败条数",
          prop: "successCount",
          formatter: (val, row) => {
            return val + "/" + row.failCount;
          }
        },
        {
          label: "移动/联通/电信条数",
          prop: "cmcc",
          formatter: (val, row) => {
            return val + "/" + row.cucc + "/" + row.ctcc;
          },
          width: 140
        },
        {
          label: "提交类型",
          prop: "submitType"
        },
        {
          label: "提交时间",
          prop: "submitTime",
          width: 140
        },
        {
          label: "操作",
          prop: "operate",
          width: 80
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
      this.params = Object.assign({}, this.filter, {
        startTime: moment(timeRange[0]).format("YYYY-MM-DD"),
        endTime: moment(timeRange[1]).format("YYYY-MM-DD"),
        timeRange: undefined
      });
    },

    disabledDate(date) {
      return moment(date) > moment();
    }
  }
};
</script>

<style>
</style>
