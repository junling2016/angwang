<template>
  <div>
    <el-row>
      <el-form class="left" inline>
        <el-form-item label="性别">
          <el-select v-model="filter.sex" style="width: 80px">
            <el-option label="全部" value="-1"></el-option>
            <el-option v-for="(val,key) in sexMap" :key="key" :label="val" :value="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属运营商">
          <el-select v-model="filter.mdnType" style="width: 80px">
            <el-option label="全部" value="-1"></el-option>
            <el-option v-for="(val,key) in mdnMap" :key="key" :label="val" :value="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键字">
          <el-input
            v-model="filter.key"
            placeholder="请输入姓名/手机号搜索"
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

    <!-- 新增/编辑联系人弹框 -->
    <aw-dialog :visible.sync="modal.visible" v-bind="modal">
      <contact-modal v-bind="modal" @submitted="handleContactSubmit"></contact-modal>
    </aw-dialog>

    <!-- 导出弹框 -->
    <aw-dialog :visible.sync="exportModal.visible" v-bind="exportModal">
      <export-modal @submitted="exportModal.visible = false"></export-modal>
    </aw-dialog>

    <!-- 导入弹框 -->
    <aw-dialog :visible.sync="importModal.visible" v-bind="importModal">
      <import-modal @submitted="importModal.visible = false"></import-modal>
    </aw-dialog>
  </div>
</template>

<script>
import { fetchContacts, removeContacts } from "@/api/api";
import AwTable from "@/components/AwTable";
import AwDialog from "@/components/AwDialog";
import ContactModal from "./ContactModal";
import ExportModal from "./ExportModal";
import ImportModal from "./ImportModal";
import { sexMap, mdnMap } from "@/config/selectMap";

export default {
  components: {
    AwTable,
    AwDialog,
    ContactModal,
    ExportModal,
    ImportModal
  },

  props: ["groupId"],

  data() {
    return {
      queryApi: fetchContacts,
      sexMap,
      mdnMap,

      filter: {
        sex: "-1",
        mdnType: "-1",
        key: ""
      },

      params: null,

      columns: [
        {
          type: "selection"
        },
        {
          label: "id",
          prop: "id",
          width: 60
        },
        {
          label: "手机号码",
          prop: "mdn",
          showOverflowTooltip: true
        },
        {
          label: "姓名",
          prop: "name",
          showOverflowTooltip: true
        },
        {
          label: "性别",
          prop: "sex",
          width: 60,
          formatter: val => sexMap[val]
        },
        {
          label: "年龄",
          prop: "age",
          width: 60
        },
        {
          label: "生日",
          prop: "birthday"
        },
        {
          label: "所属运营商",
          prop: "mdnType",
          width: 80,
          formatter: val => mdnMap[val]
        },
        {
          label: "部门",
          prop: "department",
          showOverflowTooltip: true
        },
        {
          label: "操作",
          prop: "operate",
          width: 100,
          align: "center"
        }
      ],

      selection: [],

      modal: {
        title: null,
        width: 640,
        visible: false,
        props: null
      },

      exportModal: {
        title: "导出联系人",
        visible: false,
        width: 600
      },

      importModal: {
        title: "导入联系人",
        visible: false,
        width: 600
      }
    };
  },

  watch: {
    // 选中群组发生变化时，重新请求联系人列表
    groupId: "handleQuery",
    "filter.sex": "handleQuery",
    "filter.mdnType": "handleQuery"
  },

  mounted() {
    this.handleQuery();
  },

  methods: {
    handleQuery() {
      if (!this.groupId) return;

      this.params = Object.assign(
        {
          groupId: this.groupId
        },
        this.filter
      );
    },

    handleAdd() {
      this.modal.title = "添加联系人";
      this.modal.visible = true;
      this.modal.props = null;
    },

    handleModify(row) {
      this.modal.title = "编辑联系人";
      this.modal.visible = true;
      this.modal.props = row;
    },

    handleCommand(command) {
      switch (command) {
        case "remove":
          this.handleRemove(this.selection);
          break;
        case "export":
          this.exportModal.visible = true;
          break;
        case "import":
          this.importModal.visible = true;
          break;
      }
    },

    handleSelectionChange(selection) {
      this.selection = selection;
    },

    /**
     * 批量删除
     */
    async handleRemove(rows) {
      try {
        await this.$confirm("确认删除联系人？", "提示", { type: "warning" });
        const ids = rows.map(row => row.id);
        const { message } = await removeContacts({ ids });
        this.$message.success(message);
        this.$refs.table.refresh(false);
      } catch (err) {
        console.log(err);
      }
    },

    /**
     * 关闭弹框
     */
    handleContactSubmit() {
      this.modal.visible = false;
      this.$refs.table.refresh(!this.modal.props);
    }
  }
};
</script>

<style>
</style>
