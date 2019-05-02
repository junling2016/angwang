<template>
  <div>
    <h2 class="view-title">{{$route.meta.title}}</h2>
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
        <template v-slot:operate="{row}">
          <el-button type="text" @click="handleDetail(row)">查看详情</el-button>
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
import AwDialog from "@/components/AwDialog";
import DetailModal from "./DetailModal";
import moment from "moment";
import { timeFormat } from "@/utils/time";
import { fetchTaskLog } from "@/api/api";
import { sendTypeMap } from "@/config/selectMap";
import qs from "qs";

export default {
  name: "statusQuery",

  components: {
    AwTable,
    AwDialog,
    DetailModal
  },

  data() {
    return {
      sendTypeMap,
      filter: {
        mdn: "",
        task_id: "",
        sign: "",
        timeRange: [moment().subtract(1, "day"), moment()]
      },
      queryApi: fetchTaskLog,
      params: null,
      loading: false,
      columns: [
        {
          label: "任务编号",
          prop: "taskId",
          showOverflowTooltip: true
        },
        {
          label: "手机号",
          prop: "mdn",
          showOverflowTooltip: true
        },
        {
          label: "接入号",
          prop: "code",
          showOverflowTooltip: true
        },
        {
          label: "提交时间",
          prop: "sendTime",
          showOverflowTooltip: true
        },
        {
          label: "提交结果",
          prop: "sendResult",
          width: 90
        },
        {
          label: "到达状态",
          prop: "receiveResult",
          width: 90
        },
        {
          label: "网关回执",
          prop: "receipt"
        },
        {
          label: "到达时间",
          prop: "receiveTime",
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

    handleDetail(row) {
      this.modal.visible = true;
      this.modal.props = row;
    },

    handleExport() {
      const params = qs.stringify(this.params);
      window.open("/exportTaskLog?" + params);
    }
  }
};
</script>

<style>
</style>
