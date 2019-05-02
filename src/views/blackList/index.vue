<template>
  <div>
    <h2 class="view-title">{{$route.meta.title}}</h2>
    <el-card>
      <el-row>
        <el-form class="left" inline @submit.native.prevent>
          <el-form-item label="黑名单号码">
            <el-input
              v-model="filter.key"
              placeholder="请输入号码搜索"
              suffix-icon="el-icon-search"
              clearable
              style="width: 180px"
              @keyup.enter.native="handleQuery"
              @clear="handleQuery"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-dropdown class="right" @command="handleCommand">
          <el-button type="primary" plain>
            更多
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="remove" :disabled="!selection.length">批量删除</el-dropdown-item>
            <el-dropdown-item command="import">导入</el-dropdown-item>
            <el-dropdown-item command="export">导出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button
          class="btn-icon right"
          type="primary"
          icon="iconfont icon-add1"
          style="margin-right:10px;"
          @click="handleAdd"
        >新增</el-button>
      </el-row>

      <aw-table
        ref="table"
        :columns="columns"
        :api="queryApi"
        :params="params"
        pagination
        :auto-request="false"
        @selection-change="handleSelectionChange"
      >
        <template v-slot:operate="{row}">
          <el-button type="text" @click="handleModify(row)">编辑</el-button>
          <el-button type="text" @click="handleRemove([row])">删除</el-button>
        </template>
      </aw-table>
    </el-card>

    <!-- 新增/编辑黑名单弹框 -->
    <aw-dialog :visible.sync="modal.visible" v-bind="modal">
      <blacklist-modal v-bind="modal" @submitted="handleBlacklistSubmit"></blacklist-modal>
    </aw-dialog>

    <!-- 导入弹框 -->
    <aw-dialog :visible.sync="importModal.visible" v-bind="importModal">
      <import-modal @submitted="importModal.visible = false"></import-modal>
    </aw-dialog>

    <!-- 导出组件，action为导出接口，params为导出所需参数 -->
    <aw-export ref="export" action="/exportBlacklist" :params="params"></aw-export>
  </div>
</template>

<script>
import AwTable from "@/components/AwTable";
import AwDialog from "@/components/AwDialog";
import AwExport from "@/components/AwExport";
import BlacklistModal from "./BlacklistModal";
import ImportModal from "./ImportModal";

import { fetchBlacklist, removeBlacklist } from "@/api/api";

export default {
  name: "blacklist",

  components: {
    AwTable,
    AwDialog,
    AwExport,
    BlacklistModal,
    ImportModal
  },

  data() {
    return {
      filter: {
        key: ""
      },

      queryApi: fetchBlacklist,

      params: null,

      columns: [
        {
          type: "selection"
        },
        {
          label: "序号",
          prop: "index",
          minWidth: 100
        },
        {
          label: "手机号码",
          prop: "mdn",
          minWidth: 180
        },
        {
          label: "备注",
          prop: "remark",
          showOverflowTooltip: true,
          minWidth: 300
        },
        {
          label: "操作",
          prop: "operate",
          minWidth: 100,
          align: "center"
        }
      ],

      selection: [],

      modal: {
        visible: false,
        title: "",
        width: 640,
        props: null
      },

      importModal: {
        visible: false,
        title: "导入黑名单",
        width: 600
      }
    };
  },

  mounted() {
    this.handleQuery();
  },

  methods: {
    handleQuery() {
      this.params = Object.assign({}, this.filter);
    },

    handleSelectionChange(selection) {
      this.selection = selection;
    },

    handleCommand(command) {
      switch (command) {
        case "remove":
          this.handleRemove(this.selection);
          break;
        case "export":
          this.$refs.export.submit();
          break;
        case "import":
          this.importModal.visible = true;
          break;
      }
    },

    handleAdd() {
      this.modal.title = "添加黑名单";
      this.modal.visible = true;
      this.modal.props = null;
    },

    handleModify(row) {
      this.modal.title = "编辑黑名单";
      this.modal.visible = true;
      this.modal.props = row;
    },

    /**
     * 批量删除
     */
    async handleRemove(rows) {
      try {
        await this.$confirm("确认删除黑名单？", "提示", { type: "warning" });
        const ids = rows.map(row => row.id);
        const { message } = await removeBlacklist({ ids });
        this.$message.success(message);
        this.$refs.table.refresh(false);
      } catch (err) {
        console.log(err);
      }
    },

    handleBlacklistSubmit() {
      this.modal.visible = false;
      this.$refs.table.refresh(!this.modal.props);
    }
  }
};
</script>

<style>
</style>
