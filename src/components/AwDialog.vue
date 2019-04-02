<template>
  <div>
    <el-dialog
      v-if="display"
      ref="dialog"
      :visible.sync="dialogVisible"
      :title="title"
      :width="dialogWidth"
      :close-on-click-modal="false"
      v-bind="elDialogProps"
      @closed="handleClosed"
    >
      <slot></slot>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <slot name="footer">
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </slot>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AwDialog",

  props: {
    visible: {
      type: Boolean,
      default: false
    },

    title: String,

    width: {
      type: [String, Number]
    },

    elDialogProps: Object
  },

  data() {
    return {
      display: false
    };
  },

  computed: {
    dialogWidth() {
      const { width } = this;
      return width && (typeof width === "string" ? width : width + "px");
    },

    dialogVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    }
  },

  watch: {
    dialogVisible(val) {
      if (val) {
        this.display = true;
      }
    }
  },

  mounted() {
    this.eventBubble();
  },

  methods: {
    /**
     * 事件透传
     */
    eventBubble() {
      const events = ["open", "opened", "close", "closed"];
      const dialog = this.$refs["dialog"];

      if (!dialog) return;

      events.forEach(event => {
        dialog.$on(event, (...args) => {
          this.$emit(event, ...args);
        });
      });
    },

    handleClosed() {
      this.display = false;
    },

    /**
     * 点击确定按钮后，判断弹出框默认插槽是否为另一个vue组件
     * 如果是，则判断组件是否存在一个submit方法，
     * 如果是，则调用submit方法
     */
    handleConfirm() {
      if (this.$slots.default) {
        const instance = this.$slots.default[0].componentInstance;

        if (instance && typeof instance.submit === "function") {
          instance.submit();
        }
      }

      this.$emit("confirm");
    },

    close() {
      this.dialogVisible = false;
    }
  }
};
</script>

<style>
</style>
