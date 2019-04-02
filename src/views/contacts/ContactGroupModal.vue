<template>
  <el-dialog :visible.sync="modalVisible" :title="title" width="480px">
    <el-form ref="form" :model="model" :rules="rules" label-width="80px">
      <el-form-item label="群组名称" prop="name">
        <el-input v-model="model.name" placeholder="请输入群组名称"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import dialogMixin from "@/mixins/dialog";
import rules from "@/utils/rules";
import { addContactGroup, updateContactGroup } from "@/api/api";

export default {
  mixins: [dialogMixin],

  props: ["action", "props"],

  data() {
    return {
      model: {
        name: ""
      },
      rules: {
        name: rules.required
      }
    };
  },

  computed: {
    title() {
      return this.action === "add" ? "添加群组" : "修改群组名称";
    },

    /**
     * 提交接口
     */
    submitApi() {
      return this.action === "add" ? addContactGroup : updateContactGroup;
    },

    /**
     * 提交参数
     */
    params() {
      return this.action === "add"
        ? { pid: this.props.pid, name: this.model.name }
        : { id: this.props.id, name: this.model.name };
    }
  },

  methods: {
    handleOpen() {
      this.$nextTick(() => {
        if (this.action !== "add") {
          this.model.name = this.props.name;
        }
      });
    },

    handleClose() {
      this.$refs.form.resetFields();
    },

    handleSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          try {
            const { message } = await this.submitApi(this.params);
            this.$message.success(message);
            this.$emit("submitted");
            this.close();
          } catch (err) {
            console.log(err);
          }
        }
      });
    }
  }
};
</script>

<style>
</style>
