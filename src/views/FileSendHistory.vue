<template>
  <div>
    <h2 class="view-title">{{$route.meta.title}}</h2>
    <el-card>
      <el-form v-model="filter" inline>
        <el-form-item label="文件内容：">
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
      ></aw-table>
    </el-card>
  </div>
</template>

<script>
import moment from "moment";
import AwTable from "../components/AwTable";
import { fetchFileSendLog } from "../api/api";

export default {
  name: "fileSendHistory",

  components: { AwTable },

  data() {
    return {
      fetchApi: fetchFileSendLog,
      filter: {
        content: "",
        timeRange: [moment(), moment()]
      },
      params: null,
      columns: [
        {
          type: "index"
        },
        {
          label: "发送内容",
          prop: "content",
          showOverflowTooltip: true
        },
        {
          label: "文件名",
          prop: "fileName",
          showOverflowTooltip: true
        },
        {
          label: "号码信息",
          prop: "mdn",
          showOverflowTooltip: true
        },
        {
          label: "状态",
          prop: "status"
        },
        {
          label: "提交时间",
          prop: "create_time",
          showOverflowTooltip: true
        },
        {
          label: "处理完成时间",
          prop: "success_time",
          showOverflowTooltip: true
        },
        {
          label: "备注",
          prop: "remark",
          showOverflowTooltip: true
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
