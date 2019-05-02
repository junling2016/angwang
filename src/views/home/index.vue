<template>
  <div>
    <h2 class="view-title" style="font-size: 14px;">
      欢迎回来，
      <router-link class="text-link" :to="{name: 'setting'}">{{userInfo.userName}}</router-link>
    </h2>

    <el-row :gutter="20" class="mb-20">
      <el-col :span="6" v-for="(item,index) in cols" :key="index">
        <col-block-card v-bind="item"></col-block-card>
      </el-col>
    </el-row>

    <el-card>
      <el-row slot="header">
        <h4 class="left">短信发送趋势</h4>
        <div class="right">
          <el-radio-group size="mini" v-model="timeActive">
            <el-radio-button :label="1">近一月</el-radio-button>
            <el-radio-button :label="3">近三月</el-radio-button>
          </el-radio-group>
        </div>
      </el-row>

      <report-chart :data="reportData"></report-chart>
    </el-card>

    <el-card header="常用功能">
      <el-row :gutter="20">
        <el-col v-for="(item,index) in commonLinks" :key="index" :span="8">
          <link-block v-bind="item"></link-block>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import ColBlockCard from "./ColBlockCard";
import ReportChart from "./ReportChart";
import LinkBlock from "./LinkBlock";
import { fetchSendReport } from "@/api/api";
import moment from "moment";

export default {
  name: "home",

  components: {
    ColBlockCard,
    ReportChart,
    LinkBlock
  },

  data() {
    return {
      timeActive: 1,
      reportData: null,
      commonLinks: [
        {
          title: "短信发送",
          icon: "iconfont icon-send-copy",
          to: { name: "sms" }
        },
        {
          title: "日发送统计",
          icon: "iconfont icon-et-sales-statistics",
          to: { name: "dailyStatistics" }
        },
        {
          title: "客户通讯录",
          icon: "iconfont icon-addressbook2",
          to: { name: "contacts" }
        },
        {
          title: "点播服务",
          icon: "iconfont icon-duanxin",
          to: { name: "demand" }
        }
      ]
    };
  },

  computed: {
    userInfo() {
      return this.$store.state.userInfo || {};
    },

    cols() {
      const {
        dailySendedCount,
        monthlySendedCount,
        sendedCount,
        surplusCount
      } = this.userInfo;

      return [
        {
          title: "今日发送",
          count: dailySendedCount,
          icon: "iconfont icon-send-copy",
          color: "primary"
        },
        {
          title: "本月发送",
          count: monthlySendedCount,
          icon: "iconfont icon-send2-copy-copy",
          color: "success"
        },
        {
          title: "共发送",
          count: sendedCount,
          icon: "iconfont icon-shengyuduanxin",
          color: "warning"
        },
        {
          title: "剩余可发送",
          count: surplusCount,
          icon: "iconfont icon-duanxin",
          color: "purple"
        }
      ];
    }
  },

  watch: {
    timeActive: {
      immediate: true,
      handler: "fetchSendReport"
    }
  },

  methods: {
    async fetchSendReport(timeActive) {
      try {
        const startTime = moment()
          .subtract(timeActive, "months")
          .format("YYYY-MM-DD hh:mm:ss");
        const endTime = moment().format("YYYY-MM-DD hh:mm:ss");
        const { data } = await fetchSendReport({ startTime, endTime });

        this.reportData = data;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
