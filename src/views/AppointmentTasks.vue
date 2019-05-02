<template>
  <div>
    <h2 class="view-title">{{$route.meta.title}}</h2>
    <el-card>
      <el-form v-model="filter" inline>
        <el-form-item label="任务编号：">
          <el-input v-model="filter.task_id" style="width: 120px;"></el-input>
        </el-form-item>
        <el-form-item label="信息内容：">
          <el-input v-model="filter.content" style="width: 120px;"></el-input>
        </el-form-item>
        <el-form-item label="创建时间：">
          <el-date-picker
            v-model="filter.timeRange"
            type="daterange"
            :picker-options="{disabledDate: disabledDate}"
            style="width:240px"
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
          <el-button type="text">未知操作</el-button>
        </template>
      </aw-table>
    </el-card>
  </div>
</template>

<script>
import moment from "moment";
import AwTable from "../components/AwTable";
import { fetchAppointmentTasks, resendImmediateTask } from "../api/api";

export default {
  name: "appointmentTasks",

  components: { AwTable },

  data() {
    return {
      fetchApi: fetchAppointmentTasks,
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
    },

    async handleResend(row) {
      try {
        await this.$confirm(`确认重发？共${row.failCount}个手机号码`, "提示", {
          type: "warning"
        });

        const { message } = await resendImmediateTask({ id: row.id });

        this.$message.success(message);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>
</style>
