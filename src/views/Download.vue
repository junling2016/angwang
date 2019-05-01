<template>
  <div>
    <h2 class="view-title">下载中心</h2>
    <el-card>
      <el-row>
        <el-form class="left" inline>
          <el-form-item label="导出名称">
            <el-input
              v-model="filter.name"
              clearable
              placeholder="输入关键字查询"
              @keyup.enter.native="handleQuery"
              @clear="handleQuery"
            ></el-input>
          </el-form-item>
          <el-form-item label="提交时间">
            <el-date-picker v-model="filter.timeRange" type="datetimerange" :clearable="false"></el-date-picker>
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
      >
        <template slot="operate" slot-scope="{row}">
          <el-button type="text" @click="handleRemove(row)">删除</el-button>
        </template>
      </aw-table>
    </el-card>
  </div>
</template>

<script>
import AwTable from "@/components/AwTable";
import moment from "moment";
import { timeFormat } from "@/utils/time";
import { fetchDownloadlist } from "@/api/api";

export default {
  name: "download",

  components: {
    AwTable
  },

  data() {
    return {
      filter: {
        name: "",
        timeRange: [moment().subtract(1, "day"), moment()]
      },

      queryApi: fetchDownloadlist,

      params: null,

      columns: [
        {
          label: "序号",
          prop: "index",
          width: 80
        },
        {
          label: "导出类型",
          prop: "type"
        },
        {
          label: "导出内容",
          prop: "content",
          showOverflowTooltip: true
        },
        {
          label: "提交任务时间",
          prop: "submitTime"
        },
        {
          label: "生成成功时间",
          prop: "buildTime"
        },
        {
          label: "处理状态",
          prop: "status"
        },
        {
          label: "操作",
          prop: "operate",
          width: 100,
          align: "center"
        }
      ],

      loading: false
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
    },

    /**
     * 删除
     */
    async handleRemove(row) {
      console.log(row);
    }
  }
};
</script>

<style>
</style>
