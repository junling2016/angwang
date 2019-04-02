<template>
  <div class="context-menu" v-clickoutside="handleClickOutside">
    <slot></slot>
  </div>
</template>

<script>
import Clickoutside from "element-ui/lib/utils/clickoutside";

export default {
  directives: { Clickoutside },

  props: {
    position: Object
  },

  data() {
    return {
      closable: false
    };
  },

  mounted() {
    window.addEventListener("mouseup", this.handleMouseUp);
    window.addEventListener("contextmenu", this.handleContextMenu);
    document.body.appendChild(this.$el);
    this.setPosition();
  },

  beforeDestroy() {
    window.removeEventListener("mouseup", this.handleMouseUp);
    window.removeEventListener("contextmenu", this.handleContextMenu);
  },

  destroyed() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },

  methods: {
    /**
     * 设置菜单出现的位置
     */
    setPosition() {
      const { height } = this.$el.getBoundingClientRect();
      if (this.position) {
        this.$el.style.left = this.position.left + "px";
        this.$el.style.top =
          Math.min(window.innerHeight - height, this.position.top) + "px";
      }
    },

    /**
     * 点击菜单外部时，隐藏菜单
     */
    handleClickOutside() {
      if (this.closable) {
        this.$emit("clickoutside");
      }
    },

    handleMouseUp() {
      this.closable = true;
    },

    handleContextMenu() {
      this.$emit("clickoutside");
    }
  }
};
</script>

<style>
</style>
