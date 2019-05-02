<template>
  <el-row class="editor-box">
    <div class="editor-box-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="editor-box-body">
      <el-input
        ref="textarea"
        v-model.trim="currentValue"
        type="textarea"
        :maxlength="realMaxLength"
        :autosize="{ minRows: 6, maxRows: 10 }"
        :placeholder="placeholder"
      ></el-input>
    </div>
    <div v-if="showFooter" class="editor-box-footer">
      已输入
      <strong>{{ contentLength }}</strong>
      /{{ maxLength }} 字符 (包含企业签名)
      <span style="margin-left: 20px;">企业签名：{{ signature || ''}}</span>
    </div>
  </el-row>
</template>

<script>
import { insertText } from "@/utils/util";

export default {
  props: {
    value: String,
    signature: String,
    maxLength: {
      type: Number,
      default: 1000
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: "请输入"
    }
  },

  data() {
    return {
      currentValue: ""
    };
  },

  computed: {
    contentLength() {
      const { currentValue, signature } = this;
      return currentValue.length + (signature ? signature.length : 0);
    },

    realMaxLength() {
      const { signature, maxLength } = this;
      return maxLength - (signature ? signature.length : 0);
    }
  },

  watch: {
    value(val) {
      this.currentValue = val;
    },

    currentValue(val) {
      this.$emit("input", val);
    }
  },

  mounted() {
    this.currentValue = this.value;
  },

  methods: {
    /**
     * 向文本框插入字符
     */
    insertText(val) {
      const textarea = this.$refs.textarea.$el.querySelector("textarea");
      insertText(textarea, val);
      this.currentValue = textarea.value.trim();
    }
  }
};
</script>

<style>
</style>
