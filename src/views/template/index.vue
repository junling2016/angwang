<template>
  <div>
    <h2 class="view-title">{{$route.meta.title}}</h2>
    <el-card>
      <el-row>
        <el-col :span="20">
          <el-form class="left" inline>
            <el-form-item label="常用短语内容">
              <el-input
                v-model="filter.content"
                clearable
                @keyup.enter.native="handleQuery"
                @clear="handleQuery"
                style="width: 120px"
              ></el-input>
            </el-form-item>
            <el-form-item label="常用短语类别">
              <el-select v-model="filter.plate_type" clearable>
                <el-option
                  v-for="item in templateGroups"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                ></el-option>
              </el-select>
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
          <el-button type="primary" icon="iconfont icon-add1" @click="handleAdd">新增</el-button>
          <el-button @click="groupModal.visible=true">类别管理</el-button>
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
          <el-button type="text" @click="handleModify(row)">修改</el-button>
          <el-button type="text" @click="handleRemove(row)">删除</el-button>
          <el-button type="text" @click="handleSend(row)">发送</el-button>
        </template>
      </aw-table>
    </el-card>

    <!-- 新增/编辑联系人弹框 -->
    <aw-dialog :visible.sync="templateModal.visible" v-bind="templateModal">
      <template-modal v-bind="templateModal" @submitted="handleSubmitted"></template-modal>
    </aw-dialog>

    <!-- 类型管理 -->
    <aw-dialog :visible.sync="groupModal.visible" v-bind="groupModal">
      <group-modal v-bind="groupModal" @submitted="fetchTemplateGroups"></group-modal>
    </aw-dialog>
  </div>
</template>

<script>
import AwTable from "@/components/AwTable";
import AwDialog from "@/components/AwDialog";
import TemplateModal from "./TemplateModal";
import GroupModal from "./GroupModal";
import {
  fetchTemplateGroups,
  fetchTemplateList,
  deleteTemplate
} from "@/api/api";

export default {
  name: "demand",

  components: {
    AwTable,
    AwDialog,
    TemplateModal,
    GroupModal
  },

  data() {
    return {
      templateGroups: [],
      filter: {
        content: "",
        plate_type: null
      },
      queryApi: fetchTemplateList,
      params: null,
      loading: false,
      columns: [
        {
          label: "序号",
          prop: "index",
          width: 60
        },
        {
          label: "常用短语内容",
          prop: "content",
          showOverflowTooltip: true
        },
        {
          label: "所属类别",
          prop: "groupName",
          width: 200
        },
        {
          label: "操作",
          prop: "operate",
          align: "center",
          width: 160
        }
      ],

      templateModal: {
        visible: false,
        props: null,
        groups: [],
        title: "",
        width: 600
      },

      groupModal: {
        visible: false,
        showFooter: false,
        data: [],
        title: "类别管理",
        width: 720
      }
    };
  },

  watch: {
    templateGroups(val) {
      this.templateModal.groups = val;
      this.groupModal.data = val;
    }
  },

  created() {
    this.fetchTemplateGroups();
  },

  mounted() {
    this.handleQuery();
  },

  methods: {
    handleQuery() {
      this.params = { ...this.filter };
    },

    async fetchTemplateGroups() {
      try {
        const { data } = await fetchTemplateGroups();
        this.templateGroups = data;
      } catch (err) {
        console.log(err);
      }
    },

    handleAdd() {
      this.templateModal.visible = true;
      this.templateModal.props = null;
      this.templateModal.title = "新增常用短语";
    },

    handleModify(row) {
      this.templateModal.visible = true;
      this.templateModal.props = row;
      this.templateModal.title = "修改常用短语";
    },

    async handleRemove({ id }) {
      try {
        await this.$confirm("确认删除？", "提示", { type: "warning" });

        const { message } = await deleteTemplate({ id });

        this.$message.success(message);
        this.$refs.table.refresh(false);
      } catch (err) {
        console.log(err);
      }
    },

    handleSubmitted() {
      this.templateModal.visible = false;
      this.$refs.table.refresh(false);
    },

    handleSend({ content }) {
      this.$router.push({
        name: "sms",
        query: {
          content
        }
      });
    }
  }
};
</script>

<style>
</style>
