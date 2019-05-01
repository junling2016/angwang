<template>
  <div>
    <h2 class="view-title">状态查询</h2>
    <el-card>
      <el-row>
        <el-col :span="20">
          <el-form class="left" inline>
            <el-form-item label="手机号码">
              <el-input
                v-model="filter.mdn"
                clearable
                placeholder="输入手机号码查询"
                @keyup.enter.native="handleQuery"
                @clear="handleQuery"
                style="width: 120px"
              ></el-input>
            </el-form-item>
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
            <el-form-item label="签名">
              <el-input
                v-model="filter.sign"
                clearable
                placeholder="输入签名查询"
                @keyup.enter.native="handleQuery"
                @clear="handleQuery"
                style="width: 120px"
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
        </el-col>
        <el-col :span="4">
          <el-button class="right" icon="iconfont icon-export6" @click="handleExport">导出</el-button>
        </el-col>
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
        <template slot="operate" slot-scoped="{row}">
          <el-button type="text" @click="handleRemove(row)">删除</el-button>
        </template>
      </aw-table>
    </el-card>

    <!-- 详情弹框 -->
    <aw-dialog :visible.sync="modal.visible" v-bind="modal">
      <detail-modal :data="modal.props"></detail-modal>
    </aw-dialog>
  </div>
</template>

<script>
import AwTable from "@/components/AwTable";
import moment from "moment";
import { timeFormat } from "@/utils/time";
import { fetchReplyList, deleteReplys } from "@/api/api";
import qs from "qs";

export default {
  name: "reply",

  components: {
    AwTable
  },

  data() {
    return {
      filter: {
        mdn: "",
        timeRange: [moment().subtract(1, "day"), moment()]
      },
      queryApi: fetchReplyList,
      params: null,
      loading: false,
      columns: [
        {
          type: "selection"
        },
        {
          type: "index"
        },
        {
          label: "回复时间",
          prop: "replyTime"
        },
        {
          label: "通道号码",
          prop: "channelNumber"
        },
        {
          label: "手机号",
          prop: "mdn",
          showOverflowTooltip: true
        },
        {
          label: "是否被获取状态",
          prop: "status",
          formatter: val => (val ? "是" : "否")
        },
        {
          label: "上行内容",
          prop: "content",
          showOverflowTooltip: true
        },
        {
          label: "操作",
          prop: "operate",
          align: "center",
          width: 100
        }
      ],

      modal: {
        visible: false,
        title: "详情",
        width: "600px",
        showFooter: false,
        props: null
      }
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

    async handleRemove(rows) {
      try {
        const ids = rows.map(row => row.id);
        const { message } = await deleteReplys({ ids });

        this.$message.success(message);
        this.$refs.table.refresh(false);
      } catch (err) {
        console.log(err);
      }
    },

    handleExport() {
      const params = qs.stringify(this.params);
      window.open("/exportReplyList?" + params);
    }
  }
};
</script>

<style>
</style>
