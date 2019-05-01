<template>
  <div>
    <h2 class="view-title">点播服务</h2>
    <el-card>
      <el-row>
        <el-col :span="20">
          <el-form class="left" inline>
            <el-form-item label="关键字">
              <el-input
                v-model="filter.keyword"
                clearable
                placeholder="输入关键字查询"
                @keyup.enter.native="handleQuery"
                @clear="handleQuery"
                style="width: 120px"
              ></el-input>
            </el-form-item>
            <el-form-item label="回复内容">
              <el-input
                v-model="filter.content"
                clearable
                placeholder="输入内容查询"
                @keyup.enter.native="handleQuery"
                @clear="handleQuery"
                style="width: 120px"
              ></el-input>
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
        <el-col :span="4" class="text-right">
          <el-button type="primary" icon="iconfont icon-add1" @click="modalVisible=true">新增</el-button>
          <el-button
            icon="iconfont icon-069delete"
            :disabled="!selection.length"
            @click="handleRemove(selection)"
          >删除</el-button>
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
        @selection-change="handleSelectionChange"
      >
        <template slot="operate" slot-scope="{row}">
          <el-button type="text" @click="handleRemove([row])">删除</el-button>
        </template>
      </aw-table>
    </el-card>

    <!-- 新增/编辑联系人弹框 -->
    <aw-dialog :visible.sync="modalVisible" title="新增点播服务" :width="600">
      <demand-modal @submitted="handleSubmitted"></demand-modal>
    </aw-dialog>
  </div>
</template>

<script>
import AwTable from "@/components/AwTable";
import AwDialog from "@/components/AwDialog";
import DemandModal from "./DemandModal";
import { fetchDemandList, deleteDemand } from "@/api/api";

export default {
  name: "demand",

  components: {
    AwTable,
    AwDialog,
    DemandModal
  },

  data() {
    return {
      filter: {
        keyword: "",
        content: ""
      },
      queryApi: fetchDemandList,
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
          label: "关键字",
          prop: "keyword",
          showOverflowTooltip: true,
          width: 200
        },
        {
          label: "回复内容",
          prop: "content",
          showOverflowTooltip: true
        },
        {
          label: "生效时间",
          prop: "create_time",
          width: 140
        },
        {
          label: "失效时间",
          prop: "drop_time",
          width: 140
        },
        {
          label: "操作",
          prop: "operate",
          align: "center",
          width: 80
        }
      ],

      selection: [],

      modalVisible: false
    };
  },

  mounted() {
    this.handleQuery();
  },

  methods: {
    handleQuery() {
      this.params = { ...this.filter };
    },

    handleSelectionChange(selection) {
      this.selection = selection;
    },

    async handleRemove(rows) {
      try {
        await this.$confirm("确认删除？", "提示", { type: "warning" });

        const ids = rows.map(row => row.id);
        const { message } = await deleteDemand({ ids });

        this.$message.success(message);
        this.$refs.table.refresh(false);
      } catch (err) {
        console.log(err);
      }
    },

    handleSubmitted() {
      this.modalVisible = false;
      this.$refs.table.refresh();
    }
  }
};
</script>

<style>
</style>
