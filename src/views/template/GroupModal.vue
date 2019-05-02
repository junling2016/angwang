<template>
  <el-row>
    <el-alert title="温馨提示：新增主类型时，无需选择所属主类型" style="margin-bottom:20px"></el-alert>

    <el-button type="primary" icon="iconfont icon-add1" @click="handleAdd">新增类别</el-button>

    <aw-table :columns="columns" :data="currentData" style="margin-top:20px;">
      <template v-slot:name="{row}">
        <el-input ref="input" v-if="!row.id" v-model.trim="row.name" placeholder="请输入名称"></el-input>
        <template v-else>{{row.name}}</template>
      </template>

      <template v-slot:parent="{row}">
        <el-select v-if="!row.id" v-model="row.parentId">
          <el-option v-for="item in mainGroups" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <template v-else>{{getParentName(row.parentId)}}</template>
      </template>

      <template v-slot:operate="{row, $index}">
        <template v-if="!row.id">
          <el-button type="text" @click="handleSubmit(row)">保存</el-button>
          <el-button type="text" @click="handleCancel($index)">取消</el-button>
        </template>
        <template v-else>
          <el-button type="text" @click="handleRemove(row)">删除</el-button>
        </template>
      </template>
    </aw-table>
  </el-row>
</template>

<script>
import AwTable from "@/components/AwTable";
import { addTemplateGroup, deleteTemplateGroup } from "@/api/api";

export default {
  components: {
    AwTable
  },

  props: {
    data: Array
  },

  computed: {
    mainGroups() {
      return this.data.filter(item => item.isMain);
    }
  },

  data() {
    return {
      columns: [
        {
          label: "类别名称",
          prop: "name"
        },
        {
          label: "所属主类型",
          prop: "parent"
        },
        {
          label: "操作",
          prop: "operate",
          width: 120
        }
      ],

      currentData: []
    };
  },

  watch: {
    data(val) {
      this.currentData = [...val];
    }
  },

  created() {
    this.currentData = [...this.data];
  },

  methods: {
    getParentName(parentId) {
      if (!parentId) return "";

      const parent = this.data.find(item => item.id === parentId);
      return parent ? parent.name : "";
    },

    handleAdd() {
      if (this.$refs.input) {
        return this.$refs.input.focus();
      }

      this.currentData.unshift({
        name: "",
        isMain: false,
        parentId: null
      });

      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },

    handleCancel(index) {
      this.currentData.splice(index, 1);
    },

    async handleSubmit(row) {
      try {
        if (!row.name) {
          return this.$message.error("请输入类别名称");
        }

        const { message } = await addTemplateGroup(row);
        this.$message.success(message);
        this.$emit("submitted");
      } catch (err) {
        console.log(err);
      }
    },

    async handleRemove({ id }) {
      try {
        await this.$confirm("确认删除？", "提示", { type: "warning" });

        const { message } = await deleteTemplateGroup({ id });
        this.$message.success(message);
        this.$emit("submitted");
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>
</style>
